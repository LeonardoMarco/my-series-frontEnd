import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {ResetPassword} from './components/auth/Reset';

import Group from './components/Home';
import NotFound from './NotFound';


class Routers extends Component {
    componentDidMount() {
        // var token = localStorage.getItem('token');
        // if (token === null && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        //     window.location.href = 'http://localhost:3000'
        // }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/reset/:token/:email' component={ResetPassword} />
                    <Route path='/home' component={Group} />
                    <Route path ='*' component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default Routers;
