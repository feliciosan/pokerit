import React, { useContext, useState } from 'react';
import { Auth } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';
import { withRouter, Redirect, Link } from 'react-router-dom';

import {
    Input,
    Button,
    FeaturedText,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
} from '../styles/forms';
import { Container, Loading } from '../styles/components';

const SignIn = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = (event) => {
        const { email, password } = event.target.elements;

        event.preventDefault();
        setIsLoading(true);

        Auth.signInWithEmailAndPassword(email.value, password.value).catch(
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
            <FormSignInUp onSubmit={handleSignIn}>
                {error && <FormAlert type="danger">{error.message}</FormAlert>}
                {isLoading ? <Loading /> : <FormTitle>Sign In</FormTitle>}

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
                    <Link to="/recover-password">
                        <FeaturedText>Forgot password?</FeaturedText>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" disabled={isLoading}>
                        Go
                    </Button>
                </FormGroup>
                <Link to="/signup">
                    <Button type="button" color="purple">
                        Sign Up
                    </Button>
                </Link>
            </FormSignInUp>
        </Container>
    );
};

export default withRouter(SignIn);
