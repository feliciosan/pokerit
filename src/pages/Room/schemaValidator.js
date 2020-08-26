import * as Yup from 'yup';

export default {
    createRoom: {
        initialValues: {
            name: '',
        },
        validator: Yup.object({
            name: Yup.string().required().label('Name'),
        }),
    },
};
