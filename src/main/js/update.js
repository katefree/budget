const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Expense extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state = {expense: {}};
    }


    render() {

        return (
            <div>
                {/*<a href="#create" onClick={this.handleSubmit.bind(this)}>Create</a>*/}
                <div id="update">

                    <form>
                        <label>Title<input type="text" className="field"
                                           name="title" ref="title" value={this.props.expense.title}
                                           onChange={this.onChange.bind(this)}/></label>
                        <label>Amount<input type="number" min={1} name='amount' ref='amount' className="field"
                                            value={this.props.expense.amount}
                                            onChange={this.onChange.bind(this)}/></label>
                        <label>Discription<input type="text" name='description' ref="description"  className="field"
                                                 value={this.props.expense.description}
                                                 onChange={this.onChange.bind(this)}/></label>
                        <button onClick={this.handleSubmit}>Update</button>
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
                window.location = "http://localhost:8080";
            }
        )
    }


}

class UpdateForm extends React.Component {

    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
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
            <div><Expense expense={this.state.expense} id={this.props.match.params.ref}/>
            </div>
        )


    }
}

export default UpdateForm