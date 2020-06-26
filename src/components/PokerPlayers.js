import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoMdInfinite } from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { BsQuestion } from 'react-icons/bs';

import { Button } from '../styles/forms';

const DisableUserButton = styled.div`
    width: 115px;
    margin-right: 15px;
    display: none;
`;

const List = styled.ul`
    margin: 20px 0;
    padding: 20px 0;
`;

const ListItem = styled.li`
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    padding: 10px 0 8px;
    align-items: flex-end;
`;

const InfoItem = styled.div`
    display: flex;
    :hover {
        ${DisableUserButton} {
            display: block;
        }
    }
`;

const ItemName = styled.p`
    flex: 1;
    font-size: 20px;
    margin-bottom: -10px;
    color: ${(props) => props.me && '#68b968'};
`;

const ItemResult = styled.div`
    width: 32px;
    height: 32px;
    background: ${(props) =>
        props.disabled ? '#bdbdbd' : props.showResult ? '#68b968' : '#d4bd1b'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #fefefe;
    svg {
        font-size: 20px;
    }
`;

const getParsedContent = (card) => {
    if (card === 'INFINITY') {
        return <IoMdInfinite />;
    }

    if (card === 'QUESTION') {
        return <BsQuestion />;
    }

    if (card === 'COFFEE_CUP') {
        return <GiCoffeeCup />;
    }

    return card;
};

const PokerPlayers = ({ room, playerId, updateActive }) => {
    const [isAdmin] = useState(room.user_id === playerId.split('_')[0]);

    const getResult = (_room, _playerId, key) => {
        return _room.show_result || _playerId === key
            ? getParsedContent(_room.players[key].card)
            : '-';
    };

    return (
        <List>
            {Object.keys(room.players)
                .sort()
                .filter((key) => room.players[key].active)
                .map((key) => (
                    <ListItem key={key}>
                        <ItemName me={playerId === key}>
                            {room.players[key].name}
                        </ItemName>
                        <InfoItem>
                            {isAdmin && (
                                <DisableUserButton>
                                    <Button
                                        onClick={() => updateActive(key)}
                                        color="purple"
                                        small
                                    >
                                        Hide player
                                    </Button>
                                </DisableUserButton>
                            )}
                            {room.players[key].card === null ? (
                                <ItemResult disabled>-</ItemResult>
                            ) : (
                                <ItemResult showResult={room.show_result}>
                                    {getResult(room, playerId, key)}
                                </ItemResult>
                            )}
                        </InfoItem>
                    </ListItem>
                ))}
        </List>
    );
};

PokerPlayers.propTypes = {
    room: PropTypes.object.isRequired,
    playerId: PropTypes.string.isRequired,
    updateActive: PropTypes.func.isRequired,
};

export default PokerPlayers;
