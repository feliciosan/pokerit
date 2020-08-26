import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../../services/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isAuthRequestPeding, setIsAuthRequestPeding] = useState(true);

    useEffect(() => {
        let unmounted = false;

        useAuth.onAuthStateChanged((user) => {
            if (!unmounted) {
                setLoggedUser(user);
                setIsAuthRequestPeding(false);
            }
        });

        return () => (unmounted = true);
    }, []);

    return (
        <AuthContext.Provider value={{ loggedUser, isAuthRequestPeding }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
