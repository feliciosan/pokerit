import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        let unmounted = false;

        Auth.onAuthStateChanged((user) => {
            if (!unmounted) {
                setCurrentUser(user);
                setPending(false);
            }
        });

        return () => (unmounted = true);
    }, []);

    if (isPending) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    return (
        <AuthContext.Provider value={{ currentUser, isPending }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
