const React = require('react');
import {BrowserRouter, Route} from 'react-router-dom'

import CreateForm from './create';
import App from './app';

class BudgetRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/add" component={CreateForm}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default BudgetRoutes;