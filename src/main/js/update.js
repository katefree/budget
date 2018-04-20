const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Expense extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {

        return (
            <div>
                <div id="update">

                    <form>
                        <fieldset>

                            <div className="form-group">
                                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                <div>

                                    <input type="text" className="form-control" ref='title'
                                           name="title" id='title'  value={this.props.expense.title} onChange={this.onChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
                                <input type="number" min={1} className="form-control" name='amount' ref='amount'
                                       id='amount' value={this.props.expense.amount}
                                       onChange={this.onChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="col-sm-2 col-form-label">Shop</label>
                                <input type="text" name='description' className="form-control" ref='description'
                                       id='description' value={this.props.expense.description}
                                       onChange={this.onChange.bind(this)}/>
                            </div>
                            <button onClick={this.handleSubmit} className="form-control btn btn-primary">Create</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )


    }

    onChange(e) {
        this.props.expense[e.target.name] = e.target.value;
        this.setState({"expense": this.props.expense})
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedExpense = {};
        updatedExpense.title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        updatedExpense.amount = ReactDOM.findDOMNode(this.refs.amount).value.trim();
        updatedExpense.description = ReactDOM.findDOMNode(this.refs.description).value.trim();

        fetch(`/api/expenses/${this.props.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExpense),
            headers: {'content-type': 'application/json'}
        }).then(() => {
                this.props.history.push('/');
            }
        )
    }


}

class UpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expense: {}};
    }

    componentDidMount() {
        fetch(`/api/expenses/${this.props.match.params.ref}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        }).then((response) => {
                response.json()
                    .then((data) => {
                            this.setState({expense: data});
                        }
                    )
            }
        );
    }


    render() {
        console.log("render update");

        return (
            <div><Expense expense={this.state.expense} id={this.props.match.params.ref} history={this.props.history}/>
            </div>
        )


    }
}

export default UpdateForm