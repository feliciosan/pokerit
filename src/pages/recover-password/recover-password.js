import React, { useContext, useState } from 'react';
import schema from './recover-password-schema-validator';
import AuthService from '../../services/auth';

import { useFormik } from 'formik';
import { AuthContext } from '../../contexts/auth/auth';
import { Link, Redirect } from 'react-router-dom';
import {
    Input,
    Button,
    FormSignInUp,
    FormTitle,
    FormGroup,
    FormAlert,
    Container,
    Loading,
} from '../../styles/default/default';
import { FormInputError } from '../../components/input-form-error/input-form-error';

const RecoverPassword = () => {
    const { loggedUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const formikRecover = useFormik({
        initialValues: schema.recoverPassword.initialValues,
        validationSchema: schema.recoverPassword.validator,
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                const { email } = values;

                setIsLoading(true);
                await AuthService.sendPasswordResetEmail(email);

                setIsLoading(false);
                setSuccess({
                    message: 'Recover link sent to your e-mail.',
                });
            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        },
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
                    <Button
                        type="submit"
                        disabled={!formikRecover.isValid || isLoading}
                    >
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

export default RecoverPassword;
