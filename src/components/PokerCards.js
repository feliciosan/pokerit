import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Firestore } from '../services/firebase';

import { makeStyles } from '@material-ui/core/styles';

const getTechnique = (action) => {
    const technique = {
        PLANNING_POKER: [0, 0.5, 1, 2, 3, 4, 8, 13, 20, 40, 100],
        FIBONACCI: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
        SEQUENTIAL: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    };

    return technique[action] || technique['PLANNING_POKER'];
};

const PokerCards = ({ updateCard, room, userId }) => {
    const [cards, setCards] = useState([]);
    const [isAdmin] = useState(room.user_id === userId.split('_')[0]);
    const classes = makeStyles(() => ({
        button: {
            padding: '25px 0',
        },
    }))();

    const handleChange = (event, roomId) => {
        const technique = event.target.value;
        const docRef = Firestore().collection('rooms').doc(roomId);

        docRef.update({
            technique: technique,
        });
    };

    useEffect(() => {
        setCards(getTechnique(room.technique));
    }, [room.technique]);

    return (
        <>
            {isAdmin && (
                <Box paddingLeft={2} paddingRight={2} paddingTop={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="poker-select-outlined-label">
                            Choose your plan
                        </InputLabel>
                        <Select
                            labelId="poker-select-outlined-label"
                            id="poker-select-outlined"
                            onChange={(event) => handleChange(event, room.id)}
                            label="Choose your plan"
                            value={room.technique || 'PLANNING_POKER'}
                        >
                            <MenuItem value="PLANNING_POKER">
                                Planning Poker
                            </MenuItem>
                            <MenuItem value="FIBONACCI">Fibonacci</MenuItem>
                            <MenuItem value="SEQUENTIAL">Sequential</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
            <Box display="flex" flexWrap="wrap">
                {cards.map((card) => (
                    <Box
                        key={card}
                        flexGrow={1}
                        padding={{ xs: 1, sm: 2 }}
                        paddingBottom={1}
                    >
                        {room.technique === 'SEQUENTIAL' ? (
                            <ButtonGroup orientation="vertical" fullWidth>
                                <Button
                                    onClick={() => updateCard(card - 0.5)}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    <Typography variant="h6">
                                        {card - 0.5}
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={() => updateCard(card)}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    <Typography variant="h6">{card}</Typography>
                                </Button>
                            </ButtonGroup>
                        ) : (
                            <Button
                                onClick={() => updateCard(card)}
                                size="small"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                fullWidth
                            >
                                <Typography variant="h6">{card}</Typography>
                            </Button>
                        )}
                    </Box>
                ))}
            </Box>
        </>
    );
};

PokerCards.propTypes = {
    updateCard: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
};

export default PokerCards;
