'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expenses: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/expenses'}).done(response => {
            this.setState({expenses: response.entity._embedded.expenses});
    });
    }

    render() {
        return (
            <ExpensesList expenses={this.state.expenses}/>
    )
    }
}


class ExpensesList extends React.Component{
    render() {
        var expenses = this.props.expenses.map(expense =>
            <Expense key={expense._links.self.href} expense={expense}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
                {expenses}
                </tbody>
            </table>
        )
    }
}

class Expense extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.expense.title}</td>
                <td>{this.props.expense.amount}</td>
                <td>{this.props.expense.description}</td>
            </tr>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react')
)