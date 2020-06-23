import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Firestore } from '../services/firebase';
import { Select } from '../styles/form';

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CardItem = styled.div`
    flex: 1;
    padding: 0 10px 20px;
    display: flex;
`;

const CardButton = styled.div`
    flex: 1;
    width: 80px;
    height: 130px;
    background: linear-gradient(110deg, #6d37af 50%, #7741b9 50%);
    border-bottom: 3px solid #d4bd1b;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    strong {
        font-size: 26px;
        font-weight: 600;
        color: #f2f2f2;
    }
    :after {
        position: absolute;
        content: '';
        width: calc(100% - 15px);
        height: calc(100% - 15px);
        border: 1px solid #f2f2f2;
        border-radius: 4px;
    }
    :hover {
        opacity: 0.8;
    }
`;

const SelectBox = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    ${Select} {
        background: #f2f2f2;
    }
`;

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

const PokerCards = ({ updateCard, room, playerId }) => {
    const [cards, setCards] = useState([]);
    const [isAdmin] = useState(room.user_id === playerId.split('_')[0]);

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
            <CardList>
                {cards.map((card, index) => (
                    <CardItem key={index}>
                        <CardButton onClick={() => updateCard(card)}>
                            <strong>{card}</strong>
                        </CardButton>
                    </CardItem>
                ))}
            </CardList>
            {isAdmin && (
                <SelectBox>
                    <Select
                        value={room.technique || 'PLANNING_POKER'}
                        onChange={(event) => handleChange(event, room.id)}
                    >
                        <option value="PLANNING_POKER">Planning Poker</option>
                        <option value="FIBONACCI">Fibonacci</option>
                        <option value="SEQUENTIAL">Sequential</option>
                    </Select>
                </SelectBox>
            )}
        </>
    );
};

PokerCards.propTypes = {
    updateCard: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    playerId: PropTypes.string.isRequired,
};

export default PokerCards;
