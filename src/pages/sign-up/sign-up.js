import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth';
import schema from './sign-up-schema-validator';

import { useFormik } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';
import {
    Input,
    Button,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
    Container,
    Loading,
} from '../../styles/default/default.style';
import { FormInputError } from '../../components/input-form-error/input-form-error';

const SignUp = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formikSignUp = useFormik({
        initialValues: schema.signUp.initialValues,
        validationSchema: schema.signUp.validator,
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                const { email, password } = values;

                setIsLoading(true);
                await AuthService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        },
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
                    <Button
                        type="submit"
                        disabled={!formikSignUp.isValid || isLoading}
                    >
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

export default SignUp;
