import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Auth } from '../services/firebase';
import { Loading } from '../styles/components';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        let unmounted = false;

        Auth.onAuthStateChanged((user) => {
            if (!unmounted) {
                setLoggedUser(user);
                setPending(false);
            }
        });

        return () => (unmounted = true);
    }, []);

    if (isPending) {
        return <Loading isPageLoading />;
    }

    return (
        <AuthContext.Provider value={{ loggedUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
