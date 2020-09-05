import React, { useState, useContext, useEffect } from 'react';
import RoomService from '../../services/room';
import schema from './home-schema-validator';

import { useFormik } from 'formik';
import { AuthContext } from '../../contexts/auth/auth';
import { Firestore } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import {
    Input,
    Button,
    Container,
    PageHeader,
    PageTitle,
    Loading,
} from '../../styles/default/default';
import {
    PageHeaderForm,
    PageContent,
    RoomList,
    NoResults,
    RoomItem,
    RoomItemAvatar,
    RoomItemContent,
    RoomItemText,
    RemoveItem,
} from './home-styles';

const Home = () => {
    const { loggedUser } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;

        (async () => {
            setIsLoading(true);
            const data = await RoomService.listAll(loggedUser.uid);

            if (!unmounted) {
                setRooms(data);
                setIsLoading(false);
            }
        })();

        return () => (unmounted = true);
    }, [loggedUser.uid]);

    const deleteRoom = async (event, id) => {
        event.preventDefault();
        setIsLoading(true);

        await RoomService.remove(id);
        const data = await RoomService.listAll(loggedUser.uid);

        setRooms(data);
        setIsLoading(false);
    };

    const createRoom = useFormik({
        initialValues: schema.createRoom.initialValues,
        validationSchema: schema.createRoom.validator,
        validateOnMount: true,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);

                const { name } = values;
                const newRoom = {
                    name: name,
                    user_id: loggedUser.uid,
                    timestamp: Firestore.FieldValue.serverTimestamp(),
                    players: {},
                };

                await RoomService.create(newRoom);
                const data = await RoomService.listAll(loggedUser.uid);

                setRooms(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        },
    });

    // Fazer o tratamento de erro nas chamadas com try catch
    // implementar o roomContext para deletar/add a partir de actions no contexto para evitar passar funcoes nos components
    // implementar useReducer com as actions e dispacth

    return (
        <Container>
            <PageHeader>
                <div>
                    <PageTitle>Rooms</PageTitle>
                </div>
                <PageHeaderForm onSubmit={createRoom.handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        onChange={createRoom.handleChange}
                        onBlur={createRoom.handleBlur}
                        value={createRoom.values.name}
                        placeholder="New room"
                    />
                    <Button
                        type="submit"
                        color="yellow"
                        disabled={!createRoom.isValid || isLoading}
                    >
                        Add
                    </Button>
                </PageHeaderForm>
            </PageHeader>
            <PageContent>
                {isLoading ? (
                    <Loading />
                ) : (
                    <RoomList>
                        {!rooms.length && (
                            <NoResults>
                                <label>No results, create a new room!</label>
                            </NoResults>
                        )}

                        {rooms.map((room) => (
                            <RoomItem key={room.id}>
                                <Link to={`room/${room.id}`}>
                                    <RoomItemContent>
                                        <RoomItemAvatar title={room.name}>
                                            <span>
                                                {room.name[0].toUpperCase()}
                                            </span>
                                        </RoomItemAvatar>
                                        <RoomItemText title={room.name}>
                                            {room.name}
                                        </RoomItemText>
                                        <RemoveItem
                                            onClick={(event) =>
                                                deleteRoom(event, room.id)
                                            }
                                        >
                                            <AiTwotoneDelete />
                                        </RemoveItem>
                                    </RoomItemContent>
                                </Link>
                            </RoomItem>
                        ))}
                    </RoomList>
                )}
            </PageContent>
        </Container>
    );
};

export default Home;
