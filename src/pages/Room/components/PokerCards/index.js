import React, { useState, useEffect, useContext } from 'react';
import useRoom from '../../../../services/useRoom';
import { Select } from '../../../../global/styles/components';
import { IoMdInfinite } from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { BsQuestion } from 'react-icons/bs';
import { CardList, CardItem, CardButton, SelectBox } from './styles';
import { RoomContext } from '../../context';

const getTechnique = (action) => {
    const technique = {
        PLANNING_POKER: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
        FIBONACCI: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
        SEQUENTIAL: getSequentialRange(),
    };

    return technique[action];
};

const getSequentialRange = (start = 1, end = 20, interval = 1) => {
    const items = [];

    while (start <= end) {
        items.push(start);
        start += interval;
    }

    return items;
};

const PokerCards = () => {
    const { room, playerId } = useContext(RoomContext);
    const [cards, setCards] = useState([]);
    const [isAdmin] = useState(room.user_id === playerId.split('_')[0]);
    const [currentTechnique, setCurrentTechnique] = useState('');
    const defaultTechnique = 'PLANNING_POKER';

    const handleChange = async (event) => {
        try {
            const data = {
                technique: event.target.value,
            };

            await useRoom.update(room.id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    const updateCard = async (value) => {
        try {
            const data = {};
            const currentPlayerCard = `players.${playerId}.card`;

            data[currentPlayerCard] = value;
            await useRoom.update(room.id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    useEffect(() => {
        setCurrentTechnique(room.technique || defaultTechnique);
        setCards(getTechnique(room.technique || defaultTechnique));
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

                {currentTechnique === 'PLANNING_POKER' && (
                    <>
                        <CardItem key="INFINITY">
                            <CardButton onClick={() => updateCard('INFINITY')}>
                                <IoMdInfinite />
                            </CardButton>
                        </CardItem>
                        <CardItem key="QUESTION">
                            <CardButton onClick={() => updateCard('QUESTION')}>
                                <BsQuestion />
                            </CardButton>
                        </CardItem>
                        <CardItem key="COFFEE_CUP">
                            <CardButton
                                onClick={() => updateCard('COFFEE_CUP')}
                            >
                                <GiCoffeeCup />
                            </CardButton>
                        </CardItem>
                    </>
                )}
            </CardList>

            {isAdmin && (
                <SelectBox>
                    <Select
                        value={currentTechnique}
                        onChange={(event) => handleChange(event)}
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

export default PokerCards;
