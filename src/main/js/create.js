const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class CreateForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        const newExpense = {};
        newExpense.title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        newExpense.amount = ReactDOM.findDOMNode(this.refs.amount).value.trim();
        newExpense.description = ReactDOM.findDOMNode(this.refs.description).value.trim();

        fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(newExpense),
            headers: {'content-type': 'application/json'}
        }).then(() => {
                this.props.history.push('/');
            }
        )
    }


    render() {
        console.log("render add");
        return (
            <div id="create">
                <form>
                    <fieldset>

                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div>

                                <input type="text" className="form-control" ref='title'
                                       id='title'/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
                            <input type="number" min={1} className="form-control" ref='amount'
                                   id='amount'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Shop</label>
                            <input type="text" className="form-control" ref='description'
                                   id='description'/>
                        </div>
                        <button onClick={this.handleSubmit} className="form-control btn btn-primary">Create</button>
                    </fieldset>
                </form>
            </div>
        )

    }
}

export default CreateForm