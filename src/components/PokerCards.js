import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const generateCardNumbers = (card = 0.5, limit = 19) => {
    const cards = [];
    let interval = 0.5;

    while (card <= limit) {
        if (card >= 5) {
            interval = 1;
        }

        cards.push(card);
        card = card + interval;
    }

    return cards;
};

const PokerCards = ({ updateCard }) => {
    const [cards] = useState(generateCardNumbers());
    const classes = makeStyles(() => ({
        button: {
            padding: '25px 0',
        },
    }))();

    return (
        <Box display="flex" flexWrap="wrap">
            {cards.map((card) => (
                <Box
                    key={card}
                    flexGrow={1}
                    padding={{ xs: 1, sm: 2 }}
                    paddingBottom={1}
                >
                    <Button
                        onClick={() => updateCard(card)}
                        size="small"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        fullWidth
                    >
                        <Typography variant="h5">{card}</Typography>
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

PokerCards.propTypes = {
    updateCard: PropTypes.func.isRequired,
};

export default PokerCards;
