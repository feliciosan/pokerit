import * as Yup from 'yup';

export default {
    signIn: {
        initialValues: {
            email: '',
            password: '',
        },
        validator: Yup.object({
            email: Yup.string().email().required().label('Email'),
            password: Yup.string().required().min(8).label('Password'),
        }),
    },
};
