import React from "react";
import { connect } from 'react-redux';
import * as Actions from '../redux/middleware/ledger';
import { Button, Modal, Form, Table, Container, Spinner } from "react-bootstrap";
//import authentication from '../service/authentication/authentication';
import './ledger.css';

class ledgers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editableId: "",
            loading: false,
            showAddTransaction: false,
            selectedTransactionType: "I",
            budget_id: props.selectedItem.id,
            transactions: [
            ]
        };
    }
    componentDidMount() {

        const { getTransactions } = this.props;
        getTransactions(this.state.budget_id);
    }

    onFormSubmit(event) {
        const { addNewTransaction } = this.props;
        event.preventDefault();
        event.stopPropagation();
        const { title, note, amount, type } = event.target.elements;
        addNewTransaction({ title: title.value, type: type.value, note: note.value, amount: parseFloat(amount.value ? amount.value : 0).toFixed(2), "budget_id": this.state.budget_id })
        this.handleClose();

    }
    handleClose() {
        this.setState({ showAddTransaction: false });
    }
    render() {
        const { transactions,
            loading } = this.props.ledger;
        const { updateTransaction, removeTransaction } = this.props;
        const selectedItem = this.props.selectedItem;
        return (<div>
            <Modal show={this.state.showAddTransaction} >
                <Modal.Header>
                    <Modal.Title>Add New Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body><div>
                    <Form onSubmit={this.onFormSubmit.bind(this)}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" />

                        </Form.Group>

                        <Form.Group controlId="note">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" step=".01" placeholder="Enter Amount" />

                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" onChange={(event) => { this.setState({ selectedTransactionType: event.target.value }); }} value={this.state.selectedTransactionType}>
                                <option value="E">Expense</option>
                                <option value="I">Income</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="modal-footer" style={{ borderTop: "none" }}>
                            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                Close
          </Button>
                            <Button variant="primary" type="submit">
                                Add
          </Button>
                        </div>
                    </Form>
                </div></Modal.Body>
            </Modal>
            {loading ?
                <div class="d-flex justify-content-center spinnerCenter">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div> : <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th><Button variant="outline-primary" style={{ margin: "0px 10px",float:"left" }} onClick={() => { this.props.setSelection(null); }}>Back</Button>
                                <Button variant="outline-primary" style={{float:"right"}} onClick={() => { this.setState({ showAddTransaction: true }) }}>Add New Transaction</Button></th>
                            </tr>
                        </thead>
                    </Table>

                    <h3>Budget Plan</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title </th>
                                <th>Income</th>
                                <th>Expense</th>
                                <th>Total</th>
                                <th>Note </th>
                            </tr>
                        </thead>
                            <tbody>
                            <tr>
                                <td>{selectedItem.title}</td>
                                <td>{selectedItem.income}  AED</td>
                                <td>{selectedItem.expense} AED</td>
                                <td>{selectedItem.total} AED</td>
                                <td>{selectedItem.budget_description}</td>
                            </tr>
                            </tbody>
                            </Table>

                    <h3>Transactions</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Note</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.length ? transactions.map(item => {
                                    return this.state.editableId == item.id ?
                                        <TableRowEditable item={item} onUpdate={(item) => { updateTransaction(item); this.setState({ editableId: '' }) /*this.updateTransaction(item);*/ }} onCancel={() => { this.setState({ editableId: '' }) }}></TableRowEditable> :
                                        <TableRowView item={item} onClickEdit={(id) => { this.setState({ editableId: id }) }} onClickRemove={(item) => { /*this.removeTransaction(item);*/ removeTransaction(item); }} ></TableRowView>
                                }
                                ) : <tr>
                                        <td colspan="5">No Transaction Available.</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            }
        </div>);
    }
}


const mapStateToProps = (state) => ({
    ledger: state.ledger
});

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (budget_id) => (dispatch(Actions.getTransactions(budget_id))),
    addNewTransaction: (item) => (dispatch(Actions.addTransaction(item))),
    updateTransaction: (item) => (dispatch(Actions.updateTransaction(item))),
    removeTransaction: (item) => (dispatch(Actions.removeTransaction(item)))
});

export default connect(mapStateToProps, mapDispatchToProps)(ledgers);

const TableRowView = (props) => {
    const { item, onClickEdit, onClickRemove } = props;
    return (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.note}</td>
            <td>{item.amount} AED</td>
            <td>{item.type == "I" ? "Income" : "Expense"}</td>
            <td>
                <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onClickEdit(item.id) }}>Edit</Button>
                <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onClickRemove(item) }}>Remove</Button></td>
        </tr>
    )
}
class TableRowEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { ...props.item }
        }
    }
    render() {
        const { onUpdate, onCancel } = this.props;
        const { item } = this.state;
        return (
            <tr key={item.id}>
                <td><input type="text" name="title" onChange={(event) => { this.setState({ item: { ...item, title: event.target.value } }); }} value={item.title} /></td>
                <td><textarea type="text" name="note" onChange={(event) => { this.setState({ item: { ...item, note: event.target.value } }); }} value={item.note} /></td>
                <td><input type="number" step=".01" name="amount" onChange={(event) => { this.setState({ item: { ...item, amount: event.target.value } }); }} value={item.amount} /></td>
                <td><Form.Control as="select" onChange={(event) => { this.setState({ item: { ...item, type: event.target.value } }); }} value={item.type}>
                    <option value="E">Expense</option>
                    <option value="I">Income</option>
                </Form.Control></td>
                <td>
                    <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onUpdate(item) }}>Update</Button>
                    <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onCancel() }}>cancel</Button></td>
            </tr>
        )
    }
}
