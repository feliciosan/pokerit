import React, { useState, useContext } from 'react';
import { IoMdInfinite } from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { BsQuestion } from 'react-icons/bs';
import { Button } from '../../../../global/styles/components';
import { RoomContext } from './../../context';
import useRoom from '../../../../services/useRoom';
import {
    List,
    ListItem,
    ItemName,
    InfoItem,
    DisableUserButton,
    ItemResult,
} from './styles';

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

const PokerPlayers = () => {
    const { id, playerId, room } = useContext(RoomContext);
    const [isOwner] = useState(room.user_id === playerId.split('_')[0]);

    const getResult = (listPlayerId) => {
        return room.show_result || playerId === listPlayerId
            ? getParsedContent(room.players[listPlayerId].card)
            : '-';
    };

    const hideActivePlayer = async (listPlayerId) => {
        try {
            const currentPlayerStatus = `players.${listPlayerId}.active`;
            const status = false;
            const data = {};

            data[currentPlayerStatus] = status;
            await useRoom.update(id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    return (
        <List>
            {Object.keys(room.players)
                .filter((listPlayerId) => room.players[listPlayerId].active)
                .sort()
                .map((listPlayerId) => (
                    <ListItem key={listPlayerId}>
                        <ItemName me={playerId === listPlayerId}>
                            {room.players[listPlayerId].name}
                        </ItemName>
                        <InfoItem>
                            {isOwner && (
                                <DisableUserButton>
                                    <Button
                                        onClick={() =>
                                            hideActivePlayer(listPlayerId)
                                        }
                                        color="purple"
                                        small
                                    >
                                        Hide player
                                    </Button>
                                </DisableUserButton>
                            )}

                            {room.players[listPlayerId].card === null ? (
                                <ItemResult disabled>-</ItemResult>
                            ) : (
                                <ItemResult showResult={room.show_result}>
                                    {getResult(listPlayerId)}
                                </ItemResult>
                            )}
                        </InfoItem>
                    </ListItem>
                ))}
        </List>
    );
};

export default PokerPlayers;
