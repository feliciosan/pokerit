import * as Yup from 'yup';

export default {
    signUp: {
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validator: Yup.object({
            email: Yup.string().email().required().label('Email'),
            password: Yup.string().required().min(8).label('Password'),
            confirmPassword: Yup.string()
                .required()
                .min(8)
                .label('Confirm password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
        }),
    },
};
