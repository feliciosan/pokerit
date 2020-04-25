import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DashboardRounded from '@material-ui/icons/DashboardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Firestore } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';

const useStyles = makeStyles((theme) => ({
    formCreate: {
        marginRight: theme.spacing(1.5),
    },
}));

const Home = () => {
    const history = useHistory();
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        let unmounted = false;

        Firestore()
            .collection('rooms')
            .where('user_id', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .onSnapshot((docs) => {
                const data = [];

                docs.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                if (!unmounted) {
                    setRooms(data);
                }
            });

        return () => (unmounted = true);
    }, [currentUser.uid]);

    const createRoom = (event) => {
        const { name } = event.target.elements;

        event.preventDefault();

        Firestore()
            .collection('rooms')
            .add({
                name: name.value,
                user_id: currentUser.uid,
                timestamp: Firestore.FieldValue.serverTimestamp(),
                players: {},
            })
            .then(() => {
                name.value = null;
            });
    };

    const deleteRoom = (id) => {
        Firestore().collection('rooms').doc(id).delete();
    };

    const goTo = (path) => {
        history.push(path);
    };

    return (
        <Container>
            <Box
                display={{ sm: 'flex' }}
                marginTop={4}
                marginBottom={2}
                justifyContent="space-between"
            >
                <Typography variant="h4">Rooms</Typography>
                <Box marginTop={{ xs: 1, md: 0 }}>
                    <form onSubmit={createRoom}>
                        <FormGroup row>
                            <TextField
                                name="name"
                                label="New room"
                                variant="outlined"
                                required
                                size="small"
                                className={classes.formCreate}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                required
                            >
                                Create
                            </Button>
                        </FormGroup>
                    </form>
                </Box>
            </Box>
            <Divider />
            <Box marginTop={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <List component="nav">
                            {rooms.map((room) => (
                                <ListItem
                                    divider
                                    key={room.id}
                                    onClick={() => goTo(`room/${room.id}`)}
                                    button
                                >
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <DashboardRounded />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={room.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => deleteRoom(room.id)}
                                            edge="end"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
