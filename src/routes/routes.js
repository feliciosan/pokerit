import React from 'react';
import SignIn from '../pages/sign-in/sign-in';
import SignUp from '../pages/sign-up/sign-up';
import RecoverPassword from '../pages/recover-password/recover-password';
import Home from '../pages/home/home';
import Room from '../pages/room/room';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './routes-components/private-route/private-route';

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
