import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/Auth';
import { Link, Redirect } from 'react-router-dom';
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

const formikRecoverInitialValues = {
    email: '',
};

const formikRecoverValidateSchema = Yup.object({
    email: Yup.string().email().required().label('Email'),
});

const handleRecoverPassword = async ({
    values,
    setIsLoading,
    setSuccess,
    setError,
    sendPasswordResetEmail,
}) => {
    try {
        const { email } = values;

        setIsLoading(true);
        await sendPasswordResetEmail(email);

        setIsLoading(false);
        setSuccess({
            message: 'Recover link sent to your e-mail.',
        });
    } catch (error) {
        setIsLoading(false);
        setError(error);
    }
};

const SignIn = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { sendPasswordResetEmail } = useAuth();

    const formikRecover = useFormik({
        initialValues: formikRecoverInitialValues,
        validationSchema: formikRecoverValidateSchema,
        onSubmit: (values) =>
            handleRecoverPassword({
                values,
                setIsLoading,
                setSuccess,
                setError,
                sendPasswordResetEmail,
            }),
    });

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <FormSignInUp onSubmit={formikRecover.handleSubmit}>
                {error && <FormAlert type="danger">{error.message}</FormAlert>}
                {success && <FormAlert>{success.message}</FormAlert>}
                {isLoading ? (
                    <Loading />
                ) : (
                    <FormTitle>Recover Password</FormTitle>
                )}

                <FormGroup>
                    <Input
                        name="email"
                        type="email"
                        onChange={formikRecover.handleChange}
                        onBlur={formikRecover.handleBlur}
                        value={formikRecover.values.email}
                        placeholder="Your e-mail"
                        disabled={isLoading}
                    />
                    <FormInputError
                        touched={formikRecover.touched.email}
                        error={formikRecover.errors.email}
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
        </Container>
    );
};

export default SignIn;
