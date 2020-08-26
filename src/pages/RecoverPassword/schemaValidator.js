import * as Yup from 'yup';

export default {
    recoverPassword: {
        initialValues: {
            email: '',
        },
        validator: Yup.object({
            email: Yup.string().email().required().label('Email'),
        }),
    },
};
