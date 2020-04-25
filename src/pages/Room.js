import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Person from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import PokerCards from '../components/PokerCards';

import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Firestore } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';

import NotFound from './NotFound';

const getLocalStorageUserKey = (roomId) => {
    const localStorageUserId = localStorage.getItem('user_id');

    if (!localStorageUserId || roomId !== localStorageUserId.split('_')[1]) {
        return null;
    }

    return localStorageUserId;
};

const setLocalStorageUserKey = (userId, roomId) => {
    localStorage.setItem('user_id', `${userId}_${roomId}`);
};

const FormPlayer = ({ submit }) => {
    const classes = makeStyles((theme) => ({
        marginTop: {
            marginTop: theme.spacing(2),
        },
    }))();

    return (
        <Container maxWidth="xs">
            <Box marginTop={5} padding={3} borderRadius={5} border={1}>
                <Typography variant="h5" color="primary">
                    Your name
                </Typography>
                <form onSubmit={submit}>
                    <TextField
                        name="name"
                        label="Username"
                        variant="outlined"
                        className={classes.marginTop}
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        required
                        className={classes.marginTop}
                    >
                        Join
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

const ListPlayers = ({ room, userId }) => {
    return (
        <List component="nav">
            {Object.keys(room.players)
                .sort()
                .map((key) => (
                    <ListItem divider key={key}>
                        <ListItemAvatar>
                            <Avatar variant="rounded">
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={room.players[key].name} />
                        <ListItemSecondaryAction>
                            {(room.show_result || userId === key) &&
                            room.players[key].card !== 0 ? (
                                <Badge
                                    color="primary"
                                    badgeContent={
                                        room.show_result || userId === key
                                            ? room.players[key].card
                                            : '?'
                                    }
                                ></Badge>
                            ) : room.players[key].card === 0 ? (
                                <Badge color="secondary" variant="dot" showZero>
                                    {room.show_result || userId === key
                                        ? room.players[key].card
                                        : '?'}
                                </Badge>
                            ) : (
                                <Badge color="primary" variant="dot">
                                    {room.show_result || userId === key
                                        ? room.players[key].card
                                        : '?'}
                                </Badge>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
        </List>
    );
};

const Room = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [room, setRoom] = useState({ players: {} });
    const [average, setAverage] = useState(0);
    const [docExists, setDocExists] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    const [userId, setUserId] = useState(getLocalStorageUserKey(id));

    const updateCard = (val) => {
        const data = {};
        const docRef = Firestore().collection('rooms').doc(id);
        const currentPlayerCard = `players.${userId}.card`;

        data[currentPlayerCard] = val;
        docRef.update(data);
    };

    const updateActive = () => {
        const data = {};
        const status = !room.players[userId] ? true : false;
        const docRef = Firestore().collection('rooms').doc(id);
        const currentPlayerStatus = `players.${userId}.active`;

        data[currentPlayerStatus] = status;
        docRef.update(data);
    };

    const resetCards = () => {
        const docRef = Firestore().collection('rooms').doc(id);
        const playersToUpdate = room.players;

        Object.keys(playersToUpdate).forEach((key) => {
            playersToUpdate[key].card = 0;
        });

        docRef.update({
            show_result: false,
            players: playersToUpdate,
        });
    };

    const generatePlayer = (user, val) => {
        const data = {};
        const currentPlayer = `players.${user.id}`;

        data[currentPlayer] = {
            active: true,
        };

        if (user.name) {
            data[currentPlayer].name = user.name;
        }

        data[currentPlayer].card = val || 0;

        return data;
    };

    const handleEnter = (event) => {
        event.preventDefault();

        const { name } = event.target.elements;
        const docRef = Firestore().collection('rooms').doc(id);
        const newUserId = currentUser
            ? currentUser.uid
            : (Math.random() * 10).toString().replace('.', '');
        const userKey = `${newUserId}_${id}`;
        const player = generatePlayer({
            id: userKey,
            name: name.value,
        });

        docRef.update(player).then(() => {
            setUserId(userKey);
            setLocalStorageUserKey(newUserId, id);
        });
    };

    const showAllCards = (show) => {
        const docRef = Firestore().collection('rooms').doc(id);

        docRef.update({
            show_result: show,
        });
    };

    const calcAvarage = (currentRoom) => {
        if (!currentRoom.show_result) {
            return;
        }

        const players = Object.values(currentRoom.players);
        let sum = 0;
        let result = 0;

        players.forEach((player) => {
            sum += player.card;
        });

        if (players.length) {
            result = sum / players.length;
        }

        setAverage(result);
    };

    useEffect(() => {
        const docRef = Firestore().collection('rooms').doc(id);

        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const currentRoom = doc.data();
                const filteredPlayers = {};

                Object.keys(currentRoom.players).forEach((key) => {
                    if (currentRoom.players[key].active) {
                        filteredPlayers[key] = currentRoom.players[key];
                    }
                });

                currentRoom.players = filteredPlayers;

                if (currentRoom.show_result) {
                    calcAvarage(currentRoom);
                }

                setRoom(currentRoom);
                setPageLoading(false);
                return;
            }

            setDocExists(false);
        });
    }, [id]);

    if (!docExists) {
        return <NotFound />;
    }

    return (
        <>
            {!pageLoading && (
                <Container>
                    <Box
                        display={{ sm: 'flex' }}
                        marginTop={4}
                        marginBottom={2}
                        justifyContent="space-between"
                    >
                        <Typography variant="h4">{room.name}</Typography>
                        {currentUser && room.user_id === currentUser.uid && (
                            <Box display="flex" marginTop={{ xs: 1 }}>
                                <Box>
                                    <Button
                                        onClick={() =>
                                            showAllCards(!room.show_result)
                                        }
                                        color={
                                            room.show_result
                                                ? 'secondary'
                                                : 'primary'
                                        }
                                        variant="contained"
                                    >
                                        {!room.show_result
                                            ? 'Show result'
                                            : 'Hide result'}
                                    </Button>
                                </Box>
                                <Box marginLeft={1.5}>
                                    <Button
                                        onClick={resetCards}
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Divider />
                    {!userId ? (
                        <FormPlayer submit={handleEnter} />
                    ) : (
                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                <Box
                                    border={1}
                                    borderColor="grey.300"
                                    marginTop={3}
                                    borderRadius={5}
                                    paddingBottom={1}
                                >
                                    <PokerCards updateCard={updateCard} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Box
                                    padding={2}
                                    borderColor="grey.300"
                                    marginTop={3}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        marginBottom={2}
                                    >
                                        <Button
                                            onClick={updateActive}
                                            color="primary"
                                            variant="outlined"
                                        >
                                            {room.players[userId] &&
                                            room.players[userId].active
                                                ? 'Disable myself'
                                                : 'Active myself'}
                                        </Button>
                                        <Typography variant="h6">
                                            Average:{' '}
                                            {room.show_result
                                                ? average.toFixed(2)
                                                : '?'}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <ListPlayers room={room} userId={userId} />
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            )}
        </>
    );
};

FormPlayer.propTypes = {
    submit: PropTypes.func.isRequired,
};

ListPlayers.propTypes = {
    room: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
};

export default Room;
