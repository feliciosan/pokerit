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
import { Container, Loading } from '../styles/components';

const SignUp = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();

        const { email, password, confirmPassword } = event.target.elements;

        if (password !== confirmPassword) {
            setError({
                message: "The passwords you entered don't match",
            });
            return;
        }

        setIsLoading(true);

        Auth.createUserWithEmailAndPassword(email.value, password.value).catch(
            (error) => {
                setError(error);
                setIsLoading(false);
            }
        );
    };

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <FormSignInUp onSubmit={handleSignUp}>
                {error && <FormAlert type="danger">{error.message}</FormAlert>}
                {isLoading ? <Loading /> : <FormTitle>Sign Up</FormTitle>}

                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Your e-mail"
                        disabled={isLoading}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        name="password"
                        autocomplete="off"
                        placeholder="Password"
                        disabled={isLoading}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        name="confirmPassword"
                        autocomplete="off"
                        placeholder="Confirm password"
                        disabled={isLoading}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" disabled={isLoading}>
                        Go
                    </Button>
                </FormGroup>
                <Link to="/signin">
                    <Button type="button" color="purple">
                        Sign In
                    </Button>
                </Link>
            </FormSignInUp>
        </Container>
    );
};

export default withRouter(SignUp);
