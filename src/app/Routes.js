import React from 'react';
import SignIn from '../pages/SignIn/';
import SignUp from '../pages/SignUp/';
import RecoverPassword from '../pages/RecoverPassword/';
import Home from '../pages/Home/';
import Room from '../pages/Room/';
import NotFound from '../pages/NotFound/';
import PrivateRoute from './PrivateRoute';
import { Route, Switch } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exat path="/room/:id" component={Room} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default AppRoutes;
