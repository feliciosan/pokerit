import React, { useContext, useState } from 'react';
import { Auth } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';
import { withRouter, Redirect, Link } from 'react-router-dom';

import {
    Input,
    Button,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
} from '../styles/forms';
import { Loading } from '../styles/components';

const SignIn = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRecoverPassword = (event) => {
        const { email } = event.target.elements;

        event.preventDefault();
        setIsLoading(true);

        Auth.sendPasswordResetEmail(email.value)
            .then(() => {
                setIsLoading(false);
                setSuccess({
                    message: 'Recover link sent to your e-mail.',
                });
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    };

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <FormSignInUp onSubmit={handleRecoverPassword}>
            {error && <FormAlert type="danger">{error.message}</FormAlert>}

            {success && <FormAlert>{success.message}</FormAlert>}

            {isLoading ? <Loading /> : <FormTitle>Recover Password</FormTitle>}
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    placeholder="Your e-mail"
                    autoComplete="off"
                    disabled={isLoading}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Button type="submit" disabled={isLoading}>
                    Send
                </Button>
            </FormGroup>
            <Link to="/signin">
                <Button type="button" color="purple">
                    Sign In
                </Button>
            </Link>
        </FormSignInUp>
    );
};

export default withRouter(SignIn);
