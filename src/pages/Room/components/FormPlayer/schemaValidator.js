import * as Yup from 'yup';

export default {
    player: {
        initialValues: {
            name: '',
        },
        validator: Yup.object({
            name: Yup.string().required().label('Name'),
        }),
    },
};
