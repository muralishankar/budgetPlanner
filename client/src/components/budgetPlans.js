import React from "react";
import { connect } from 'react-redux';
import * as Actions from '../redux/middleware/budgetPlans';
import { Button, Modal, Form, Table, Container, Spinner } from "react-bootstrap";
//import authentication from '../service/authentication/authentication';
import './budgetPlans.css';
class BudgetPlans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPlan: false,
            selectedMonth: '',
            note: '',
            title: '',
            loading: false,
            editableId: ''
        }
    }
    handleClose() {
        this.setState({ showAddPlan: false });
    }
    resetForm() {
        this.setState({ title: '', selectedMonth: 'January', note: '' });
    }
    onFormSubmit(event) {
        this.handleClose();
        const {
            addNewPlan } = this.props;
        event.preventDefault();
        event.stopPropagation();
        const { title, note, month } = event.target.elements;
        addNewPlan({ title: title.value, month: month.value, note: note.value });
        this.resetForm();

    }
    componentDidMount() {
        const { refreshPlans } = this.props;
        refreshPlans();
    }
    render() {
        const { budgetPlans, updatePlan,
            removeItem } = this.props;
        const dataSource = budgetPlans && budgetPlans.budgetPlans ? budgetPlans.budgetPlans : [];
        const { loading } = budgetPlans;

        return (
            <div>
                {
                    loading ?
                        <div class="d-flex justify-content-center spinnerCenter">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">loading...</span>
                            </Spinner>
                        </div>

                        :
                        <div>
                            <Modal show={this.state.showAddPlan} >
                                <Modal.Header>
                                    <Modal.Title>Add New Budget</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><div>
                                    <Form onSubmit={this.onFormSubmit.bind(this)}>
                                        <Form.Group controlId="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name="title" type="text" onChange={(event) => { this.setState({ title: event.target.value }); }} value={this.state.title} placeholder="Enter Title" />
                                            {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
                                            <Form.Control.Feedback type="invalid">
                                                Please fill the title.
          </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="note">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control as="textarea" rows="3" onChange={(event) => { this.setState({ note: event.target.value }); }} value={this.state.note} />

                                            <Form.Control.Feedback type="invalid">
                                                Please fill the note.
          </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="month">
                                            <Form.Label>Month</Form.Label>
                                            <Form.Control as="select" onChange={(event) => { this.setState({ selectedMonth: event.target.value }); }} value={this.state.selectedMonth}>
                                                <option value="January">January</option>
                                                <option value="Febuary">Febuary</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Budget Planner</th>
                                        <th><Button variant="outline-primary" onClick={() => { this.setState({ showAddPlan: true }) }}>Add New Plan</Button></th>
                                    </tr>
                                </thead>
                            </Table>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Month</th>
                                        <th>Income</th>
                                        <th>Expense</th>
                                        <th>Total</th>
                                        <th>Note</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataSource.length ? dataSource.map(item => (
                                            this.state.editableId == item.id ?
                                                <TableRowEditable item={item} onUpdate={(item) => { /*this.updatePlan(item);*/ updatePlan(item);
                                                    this.setState({ editableId: '' });
                                                }} onCancel={() => { this.setState({ editableId: '' }) }} ></TableRowEditable> :
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.budget_year}</td>
                                                    <td>{item.income}  AED</td>
                                                    <td>{item.expense}  AED</td>
                                                    <td>{item.total}  AED</td>
                                                    <td>{item.budget_description}</td>
                                                    <td style={{ display: "flex" }}>

                                                        <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { this.setState({ editableId: item.id }) }}>Edit</Button>
                                                        <Button variant="outline-primary" onClick={() => (this.props.setSelection(item))}>Transactions</Button>
                                                        <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { /*this.removeItem(item)*/removeItem(item) }}>Remove</Button>
                                                    </td>
                                                </tr>
                                        )) : <tr>
                                                <td colspan="7">No Budget Plans Available.</td>
                                            </tr>
                                    }
                                </tbody>
                            </Table></div>}</div>);

    }
}

const mapStateToProps = (state) => ({
    budgetPlans: state.budgetPlans
});

const mapDispatchToProps = (dispatch) => ({
    //refreshPlans,addNewPlan,updatePlan,removeItem
    refreshPlans: () => (dispatch(Actions.getBudgetPlans())),
    addNewPlan: (item) => (dispatch(Actions.addBudgetPlan(item))),
    updatePlan: (item) => (dispatch(Actions.updateBudgetPlan(item))),
    removeItem: (item) => (dispatch(Actions.removeBudgetPlan(item.id)))
});


export default connect(mapStateToProps, mapDispatchToProps)(BudgetPlans);

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
                <td>
                    <Form.Control as="select" onChange={(event) => { this.setState({ item: { ...item, budget_year: item.budget_year.split(' ')[0] + " " + event.target.value } }); }} value={item.budget_year.split(' ')[1]}>
                        <option value="January">January</option>
                        <option value="Febuary">Febuary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </Form.Control>
                </td>

                <td>{item.income}  AED</td>
                <td>{item.expense}  AED</td>
                <td>{item.total}  AED</td>
                <td><textarea type="text" onChange={(event) => { this.setState({ item: { ...item, budget_description: event.target.value } }); }} value={item.budget_description} /></td>

                <td>
                    <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onUpdate(item) }}>Update</Button>
                    <Button variant="outline-primary" style={{ margin: "0px 10px" }} onClick={() => { onCancel() }}>cancel</Button></td>
            </tr>
        )
    }
}