import React, { useState, useContext } from 'react';
import schema from './room-form-player-schema-validator';
import RoomService from '../../../../services/room';

import { useFormik } from 'formik';
import { AuthContext } from '../../../../contexts/auth/auth';
import {
    Button,
    Input,
    FormTitle,
    FormGroup,
    Loading,
} from '../../../../styles/default/default.style';
import { FormJoinRoom } from './room-form-player.styles';
import { RoomContext } from '../../../../contexts/room/room';
import { FormInputError } from '../../../../components/input-form-error/input-form-error';

const generatePlayer = (player) => {
    const data = {};
    const currentPlayer = `players.${player.id}`;

    data[currentPlayer] = {
        active: true,
        name: player.name,
        card: null,
    };

    return data;
};

const FormPlayer = () => {
    const { loggedUser } = useContext(AuthContext);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const { id, setPlayerId, setLocalStoragePlayerKey } = useContext(
        RoomContext
    );

    const formikPlayer = useFormik({
        initialValues: schema.player.initialValues,
        validationSchema: schema.player.validator,
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                const { name } = values;
                const guestPlayerId = Math.random().toString(36).substr(2);
                const newPlayerId = loggedUser ? loggedUser.uid : guestPlayerId;
                const playerKey = `${newPlayerId}_${id}`;
                const player = generatePlayer({
                    id: playerKey,
                    name: name,
                });

                setFormIsLoading(true);
                await RoomService.update(id, player);

                setLocalStoragePlayerKey(newPlayerId, id);
                setFormIsLoading(false);
                setPlayerId(playerKey);
            } catch (error) {
                setFormIsLoading(false);
            }
        },
    });

    return (
        <FormJoinRoom onSubmit={formikPlayer.handleSubmit}>
            {formIsLoading ? <Loading /> : <FormTitle>Player name</FormTitle>}
            <FormGroup>
                <Input
                    name="name"
                    type="text"
                    onChange={formikPlayer.handleChange}
                    onBlur={formikPlayer.handleBlur}
                    value={formikPlayer.values.name}
                    placeholder="Name"
                    disabled={formIsLoading}
                />
                <FormInputError
                    touched={formikPlayer.touched.name}
                    error={formikPlayer.errors.name}
                />
            </FormGroup>
            <Button
                type="submit"
                disabled={!formikPlayer.isValid || formIsLoading}
                color="purple"
            >
                Join
            </Button>
        </FormJoinRoom>
    );
};

export default FormPlayer;
