import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Firestore } from '../services/firebase';

import { makeStyles } from '@material-ui/core/styles';

const getTechnique = (action) => {
    const technique = {
        PLANNING_POKER: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
        FIBONACCI: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
        SEQUENTIAL: getSequentialRange(),
    };

    return technique[action] || technique['PLANNING_POKER'];
};

const getSequentialRange = (min = 1, max = 20, interval = 1) => {
    const items = [];

    while (min <= max) {
        items.push(min);
        min += interval;
    }

    return items;
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
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={room.technique || 'PLANNING_POKER'}
                            onChange={(event) => handleChange(event, room.id)}
                        >
                            <FormControlLabel
                                value="PLANNING_POKER"
                                control={<Radio color="primary" />}
                                label="Planning Poker"
                            />
                            <FormControlLabel
                                value="FIBONACCI"
                                control={<Radio color="primary" />}
                                label="Fibonacci"
                            />
                            <FormControlLabel
                                value="SEQUENTIAL"
                                control={<Radio color="primary" />}
                                label="Sequential"
                            />
                        </RadioGroup>
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
