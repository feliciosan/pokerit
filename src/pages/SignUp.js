import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';
import useAuth from '../services/useAuth';

import {
    Input,
    Button,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
} from '../styles/forms';
import { Container, Loading } from '../styles/components';
import { FormInputError } from '../components/utils/forms';

const formikSignUpInitialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const formikSignUpValidateSchema = Yup.object({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().min(8).label('Password'),
    confirmPassword: Yup.string()
        .required()
        .min(8)
        .label('Confirm password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const handleSignUp = async ({
    values,
    setIsLoading,
    setError,
    createUserWithEmailAndPassword,
}) => {
    try {
        const { email, password } = values;

        setIsLoading(true);
        await createUserWithEmailAndPassword(email, password);
    } catch (error) {
        setError(error);
        setIsLoading(false);
    }
};

const SignUp = () => {
    const { loggedUser } = useContext(AuthContext);
    const { createUserWithEmailAndPassword } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formikSignUp = useFormik({
        initialValues: formikSignUpInitialValues,
        validationSchema: formikSignUpValidateSchema,
        onSubmit: (values) =>
            handleSignUp({
                values,
                setIsLoading,
                setError,
                createUserWithEmailAndPassword,
            }),
    });

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <FormSignInUp onSubmit={formikSignUp.handleSubmit}>
                {error && <FormAlert type="danger">{error.message}</FormAlert>}
                {isLoading ? <Loading /> : <FormTitle>Sign Up</FormTitle>}

                <FormGroup>
                    <Input
                        name="email"
                        type="email"
                        onChange={formikSignUp.handleChange}
                        onBlur={formikSignUp.handleBlur}
                        value={formikSignUp.values.email}
                        placeholder="Your e-mail"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikSignUp.touched.email}
                        error={formikSignUp.errors.email}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="password"
                        type="password"
                        onChange={formikSignUp.handleChange}
                        onBlur={formikSignUp.handleBlur}
                        value={formikSignUp.values.password}
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikSignUp.touched.password}
                        error={formikSignUp.errors.password}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="confirmPassword"
                        type="password"
                        onChange={formikSignUp.handleChange}
                        onBlur={formikSignUp.handleBlur}
                        value={formikSignUp.values.confirmPassword}
                        placeholder="Confirm password"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikSignUp.touched.confirmPassword}
                        error={formikSignUp.errors.confirmPassword}
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" disabled={isLoading}>
                        Sign Up
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
