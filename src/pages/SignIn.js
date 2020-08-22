import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../contexts/Auth';
import { withRouter, Redirect, Link } from 'react-router-dom';
import useAuth from '../services/useAuth';

import {
    Input,
    Button,
    SmallText,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
} from '../styles/forms';
import { Container, Loading } from '../styles/components';
import { FormInputError } from '../components/utils/forms';

const formikSignInInitialValues = {
    email: '',
    password: '',
};

const formikSignInValidateSchema = Yup.object({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().min(8).label('Password'),
});

const handleSignIn = async ({
    values,
    setIsLoading,
    setError,
    signInWithEmailAndPassword,
}) => {
    try {
        const { email, password } = values;

        setIsLoading(true);
        await signInWithEmailAndPassword(email, password);
    } catch (error) {
        setError(error);
        setIsLoading(false);
    }
};

const SignIn = () => {
    const { loggedUser } = useContext(AuthContext);
    const { signInWithEmailAndPassword } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formikSignIn = useFormik({
        initialValues: formikSignInInitialValues,
        validationSchema: formikSignInValidateSchema,
        onSubmit: (values) =>
            handleSignIn({
                values,
                setIsLoading,
                setError,
                signInWithEmailAndPassword,
            }),
    });

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <FormSignInUp onSubmit={formikSignIn.handleSubmit}>
                {error && <FormAlert type="danger">{error.message}</FormAlert>}
                {isLoading ? <Loading /> : <FormTitle>Sign In</FormTitle>}

                <FormGroup>
                    <Input
                        name="email"
                        type="email"
                        onChange={formikSignIn.handleChange}
                        onBlur={formikSignIn.handleBlur}
                        value={formikSignIn.values.email}
                        placeholder="Your e-mail"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikSignIn.touched.email}
                        error={formikSignIn.errors.email}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="password"
                        type="password"
                        onChange={formikSignIn.handleChange}
                        onBlur={formikSignIn.handleBlur}
                        value={formikSignIn.values.password}
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikSignIn.touched.password}
                        error={formikSignIn.errors.password}
                    />
                </FormGroup>
                <FormGroup>
                    <Link to="/recover-password">
                        <SmallText>Forgot password?</SmallText>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" disabled={isLoading}>
                        Sign In
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
