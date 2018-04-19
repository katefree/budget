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
            <div>
                <div id="create">

                    <form>
                        <label>Title<input type="text" ref='title' className="field"/></label>
                        <label>Amount<input type="number" min={1} ref='amount' className="field"/></label>
                        <label>Discription<input type="text" ref='description' className="field"/></label>
                        <button onClick={this.handleSubmit}>Create</button>
                    </form>
                </div>
            </div>
        )

    }
}

export default CreateForm