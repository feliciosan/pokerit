import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '../../global/contexts/Auth';
import { Redirect, Link } from 'react-router-dom';
import useAuth from '../../services/useAuth';
import {
    Input,
    Button,
    SmallText,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
    Container,
    Loading,
} from '../../global/styles/components';
import { FormInputError } from '../../utils/FormInputError/';
import schema from './schemaValidator';

const SignIn = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formikSignIn = useFormik({
        initialValues: schema.signIn.initialValues,
        validationSchema: schema.signIn.validator,
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                const { email, password } = values;

                setIsLoading(true);
                await useAuth.signInWithEmailAndPassword(email, password);
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
                    <Button
                        type="submit"
                        disabled={!formikSignIn.isValid || isLoading}
                    >
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

export default SignIn;
