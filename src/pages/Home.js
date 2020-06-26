import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Firestore } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';

import { AiTwotoneDelete } from 'react-icons/ai';
import {
    Container,
    PageHeader,
    PageTitle,
    Loading,
} from '../styles/components';
import { Input, Button } from '../styles/forms';

const PageHeaderForm = styled.form`
    display: flex;
    width: 330px;
    input {
        flex: 2.5;
    }
    button {
        flex: 0.5;
        margin-left: 15px;
    }

    @media (max-width: 600px) {
        width: 100%;
        margin-top: 5px;
    }
`;

const PageContent = styled.div`
    padding: 15px;
    background: #ececec;
    border-radius: 4px;
    margin-top: 25px;
    @media (max-width: 600px) {
        padding: 7.5px;
    }
`;

const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RoomItem = styled.div`
    width: 20%;
    padding: 15px;
    float: left;

    @media (max-width: 600px) {
        width: 50%;
        padding: 7.5px;
    }
`;

const RoomItemContent = styled.div`
    padding: 30px 25px;
    background: linear-gradient(110deg, #6d37af 50%, #7741b9 50%);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-bottom: 4px solid #d4bd1b;
    :hover {
        opacity: 0.9;
    }
`;

const RoomItemAvatar = styled.div`
    height: 25px;
    padding: 20px 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    span {
        font-weight: 600;
        font-size: 38px;
        color: #f2f2f2;
    }
`;

const RoomItemText = styled.p`
    color: #f2f2f2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
`;

const RemoveItem = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #f2f2f2;
    font-size: 22px;
    display: flex;
    :hover {
        color: #d4bd1b;
    }
`;

const Home = () => {
    const { loggedUser } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;

        setIsLoading(true);

        Firestore()
            .collection('rooms')
            .where('user_id', '==', loggedUser.uid)
            .orderBy('timestamp', 'desc')
            .onSnapshot((docs) => {
                const data = [];

                docs.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                if (!unmounted) {
                    setRooms(data);
                    setIsLoading(false);
                }
            });

        return () => (unmounted = true);
    }, [loggedUser.uid]);

    const createRoom = (event) => {
        event.preventDefault();

        const { name } = event.target.elements;
        const newRoom = {
            name: name.value,
            user_id: loggedUser.uid,
            timestamp: Firestore.FieldValue.serverTimestamp(),
            players: {},
        };

        Firestore()
            .collection('rooms')
            .add(newRoom)
            .then(() => {
                name.value = null;
            });
    };

    const deleteRoom = (event, id) => {
        event.preventDefault();

        Firestore().collection('rooms').doc(id).delete();
    };

    return (
        <Container>
            <PageHeader>
                <div>
                    <PageTitle>Rooms</PageTitle>
                </div>
                <PageHeaderForm onSubmit={createRoom}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="New room"
                        required
                    />
                    <Button color="yellow" type="submit">
                        Add
                    </Button>
                </PageHeaderForm>
            </PageHeader>
            <PageContent>
                {isLoading ? (
                    <Loading />
                ) : (
                    <RoomList>
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
