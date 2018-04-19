const React = require('react');
const client = require('./client');
import {ExpensesList} from './expences';

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
            <ExpensesList expenses={this.state.expenses} history={this.props.history}/>
        )
    }
}

export default App