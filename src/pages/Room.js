import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PokerCards from '../components/PokerCards';
import PokerPlayers from '../components/PokerPlayers';
import FormPlayer from '../components/FormPlayer';
import NotFound from './NotFound';

import { useParams } from 'react-router-dom';
import { Firestore } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AiOutlineCheck } from 'react-icons/ai';
import { AiFillCopy } from 'react-icons/ai';
import { Container, PageHeader, PageTitle } from '../styles/components';
import { Button } from '../styles/form';

const PageHeaderActions = styled.div`
    display: flex;
    width: 330px;
    ${Button} {
        flex: 1;
        margin-left: 15px;
    }
`;

const IconButton = styled.div`
    height: 50px;
    width: 50px;
    font-size: 30px;
    color: ${(props) => (props.copied ? '#68b968' : '#bdbdbd')};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: #ececec;
    }
`;

const PokerBox = styled.div`
    display: flex;
    margin-top: 25px;
`;

const PokerPanel = styled.div`
    flex: 0.8;
    padding-left: 10px;
    padding-right: 10px;
    background: #ececec;
    border-radius: 4px;
    padding-top: 20px;
`;

const PokerList = styled(PokerPanel)`
    margin-left: 25px;
    background: #ececec;
    border-radius: 4px;
    padding: 20px;
    flex: 1.2;
`;

const ActiveButton = styled(Button)`
    background: ${(props) => (props.active ? '#68b968' : '#bdbdbd')};
    width: 85px;
    position: relative;
    margin-left: 10px;
`;

const ActiveButtonIcon = styled.span`
    height: 22px;
    width: 22px;
    background: #f2f2f2;
    position: absolute;
    left: -10px;
    border-radius: 3px;
    border: 2px solid ${(props) => (props.active ? '#68b968' : '#bdbdbd')};
    top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #68b968;
`;

const getLocalStorageUserKey = (roomId) => {
    const localStoragePlayerId = localStorage.getItem('user_id');

    if (
        !localStoragePlayerId ||
        roomId !== localStoragePlayerId.split('_')[1]
    ) {
        return null;
    }

    return localStoragePlayerId;
};

const setLocalStoragePlayerKey = (playerId, roomId) => {
    localStorage.setItem('user_id', `${playerId}_${roomId}`);
};

const Room = () => {
    const { id } = useParams();
    const { loggedUser } = useContext(AuthContext);
    const [room, setRoom] = useState({ players: {} });
    const [docExists, setDocExists] = useState(true);
    const [copied, setCopied] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [playerId, setPlayerId] = useState(getLocalStorageUserKey(id));

    const updateCard = (val) => {
        const data = {};
        const docRef = Firestore().collection('rooms').doc(id);
        const currentPlayerCard = `players.${playerId}.card`;

        data[currentPlayerCard] = val;
        docRef.update(data);
    };

    const updateActive = (_playerId) => {
        const docRef = Firestore().collection('rooms').doc(id);
        const currentPlayerStatus = `players.${_playerId}.active`;
        const status = !room.players[_playerId].active;
        const data = {};

        data[currentPlayerStatus] = status;
        docRef.update(data);
    };

    const resetCards = () => {
        const docRef = Firestore().collection('rooms').doc(id);
        const playersToUpdate = room.players;
        const data = {
            show_result: false,
        };

        Object.keys(room.players).forEach((key) => {
            playersToUpdate[key].card = null;
        });

        if (Object.keys(playersToUpdate).length) {
            data.players = playersToUpdate;
        }

        docRef.update(data);
    };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormIsLoading(true);

        const { name } = event.target.elements;
        const docRef = Firestore().collection('rooms').doc(id);
        const guestPlayerId = Math.random().toString(36).substr(2);
        const newPlayerId = loggedUser ? loggedUser.uid : guestPlayerId;
        const playerKey = `${newPlayerId}_${id}`;
        const player = generatePlayer({
            id: playerKey,
            name: name.value,
        });

        docRef.update(player).then(() => {
            setLocalStoragePlayerKey(newPlayerId, id);
            setFormIsLoading(false);
            setPlayerId(playerKey);
        });
    };

    const showAllCards = (show) => {
        const docRef = Firestore().collection('rooms').doc(id);

        docRef.update({
            show_result: show,
        });
    };

    useEffect(() => {
        const docRef = Firestore().collection('rooms').doc(id);
        let unmounted = false;

        docRef.onSnapshot((doc) => {
            if (!unmounted) {
                if (doc.exists) {
                    const currentRoom = { id: doc.id, ...doc.data() };

                    setRoom(currentRoom);
                    setPageLoading(false);
                    return;
                }

                setDocExists(false);
                setPageLoading(false);
            }
        });

        return () => (unmounted = true);
    }, [id]);

    if (!docExists) {
        return <NotFound />;
    }

    return (
        <Container>
            {!pageLoading && (
                <>
                    <PageHeader>
                        <div>
                            <PageTitle>{room.name}</PageTitle>
                        </div>
                        {loggedUser && loggedUser.uid === room.user_id && (
                            <PageHeaderActions>
                                <CopyToClipboard
                                    text={window.location.href}
                                    onCopy={() => setCopied(true)}
                                >
                                    <IconButton
                                        title="Copy room link!"
                                        copied={copied}
                                    >
                                        <AiFillCopy />
                                    </IconButton>
                                </CopyToClipboard>
                                <Button
                                    onClick={() =>
                                        showAllCards(!room.show_result)
                                    }
                                    color={room.show_result ? 'purple' : ''}
                                >
                                    {!room.show_result ? 'Show All' : 'Hide'}
                                </Button>
                                <Button onClick={resetCards}>Reset</Button>
                            </PageHeaderActions>
                        )}
                    </PageHeader>
                    {!playerId ? (
                        <FormPlayer
                            submit={handleSubmit}
                            formIsLoading={formIsLoading}
                        />
                    ) : (
                        <PokerBox>
                            <PokerPanel>
                                <PokerCards
                                    updateCard={updateCard}
                                    playerId={playerId}
                                    room={room}
                                />
                            </PokerPanel>
                            <PokerList>
                                <ActiveButton
                                    active={room.players[playerId].active}
                                    onClick={() => updateActive(playerId)}
                                    small
                                >
                                    <ActiveButtonIcon
                                        active={room.players[playerId].active}
                                    >
                                        {room.players[playerId].active && (
                                            <AiOutlineCheck />
                                        )}
                                    </ActiveButtonIcon>
                                    Active
                                </ActiveButton>
                                <PokerPlayers
                                    room={room}
                                    playerId={playerId}
                                    updateActive={updateActive}
                                />
                            </PokerList>
                        </PokerBox>
                    )}
                </>
            )}
        </Container>
    );
};

FormPlayer.propTypes = {
    submit: PropTypes.func.isRequired,
    formIsLoading: PropTypes.bool.isRequired,
};

export default Room;
