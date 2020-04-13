import React from "react";
import { connect } from 'react-redux';
import { Button, Modal, Form, Table, Container } from "react-bootstrap";
import Actions from '../redux/middleware/budgetPlans';
import Picker from 'react-month-picker';
import BudgetPlans from '../components/budgetPlans';
import Ledger from '../components/ledger';

class BudgetPlanDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null,
            showAddPlan: false,
            selectedMonth: '',
            transactions: [
            ]
        }
    }
    setSelection(item) {
        this.setState({ selectedItem: item });
    }
    async refresh(action) {
        var requestOptions = {
            method: 'GET',
            headers: { "Access-Control-Allow-Origin": "*" },
            redirect: 'follow'
        };
        try {
            debugger;
            let response = await fetch("/plans", requestOptions);
            let result = await response.json();
            this.setState({ dataSource: result.response });
            if (this.state.selectedItem) {
                result.response.map((item) => {
                    if (item.id == this.state.selectedItem.id) {
                        this.setState({ selectedItem: item });
                    }
                });
            }
            action && action();
        } catch (error) {
            console.log('error', error);
            action && action();
        }
    }
    render() {
        let { selectedItem } = this.state;
        const { budgetPlans } = this.props;
        const dataSource = budgetPlans && budgetPlans.budgetPlans ? budgetPlans.budgetPlans : [];
        if (selectedItem) {
            dataSource.map((item) => {
                if (item.id == selectedItem.id) {
                    selectedItem = item;
                }
            });
        }
        return (
            <Container>

                {
                    selectedItem ? <Ledger selectedItem={selectedItem} refreshPlans={this.refresh.bind(this)} setSelection={this.setSelection.bind(this)}></Ledger>
                        : <BudgetPlans dataSource={this.state.dataSource} refreshPlans={this.refresh.bind(this)} setSelection={this.setSelection.bind(this)}></BudgetPlans>

                }

            </Container>
        );

    }
}


const mapStateToProps = (state) => ({
    budgetPlans:state.budgetPlans
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(BudgetPlanDashboard);