const React = require('react');
import {Link} from 'react-router-dom';

class Expense extends React.Component {
    constructor() {
        super();
        this.deleteExpense.bind(this)
    }

    render() {
        return (
            <tr>
                <td>{this.props.expense.title}</td>
                <td>{this.props.expense.amount}</td>
                <td>{this.props.expense.description}</td>
                <th>
                    <nav>
                        <Link to={`/update/${this.props.id}`}>Update</Link>
                    </nav>
                </th>
                <th>
                    <nav>
                        <Link to={`/delete/${this.props.id}`} onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm('Are you sure you wish to delete this item?')) this.deleteExpense()
                        }}>Delete</Link>
                    </nav>
                </th>
            </tr>
        )
    }

    deleteExpense() {
        fetch(`/api/expenses/${this.props.id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        }).then(() => {
                alert("Deleted");
                this.props.history.push('/');
            }
        )

    }
}

export class ExpensesList extends React.Component {
    render() {
        var expenses = this.props.expenses.map(expense => {
                let id = /[^/]*$/.exec(expense._links.self.href)[0];
                return <Expense id={id} expense={expense} history={this.props.history}/>
            }
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


