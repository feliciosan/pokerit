import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import PrivateRoute from './PrivateRoute';

import { GlobalStyle } from './styles/global';

const App = ({ location }) => {
    const [currentRoute, setCurrentRoute] = useState('');

    useEffect(() => {
        setCurrentRoute(location.pathname.substr(1));
    }, [location.pathname]);

    return (
        <>
            <GlobalStyle currentRoute={currentRoute} />
            <AuthProvider>
                <>
                    <Header currentRoute={currentRoute} />
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exat path="/room/:id" component={Room} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route component={NotFound} />
                    </Switch>
                </>
            </AuthProvider>
        </>
    );
};

App.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(App);
