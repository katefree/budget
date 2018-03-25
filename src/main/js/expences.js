const React = require('react');
import { Link } from 'react-router-dom';

class Expense extends React.Component {
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

export class ExpensesList extends React.Component {
    render() {
        var expenses = this.props.expenses.map(expense =>
            <Expense key={expense._links.self.href} expense={expense}/>
        );
        return (
            <div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Description!</th>
                        </tr>
                        {expenses}
                        </tbody>
                    </table>
                </div>
                <div>
                    <nav>
                        <Link to="/add">Add</Link>
                    </nav>
                </div>
            </div>
        )
    }
}


