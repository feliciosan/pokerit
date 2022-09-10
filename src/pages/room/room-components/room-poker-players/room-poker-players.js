import React, { useContext } from 'react';
import RoomService from '../../../../services/room';

import { IoMdInfinite } from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { BsQuestion } from 'react-icons/bs';
import { Button } from '../../../../styles/default/default.style';
import { RoomContext } from '../../../../contexts/room/room';
import {
    List,
    ListItem,
    ItemName,
    InfoItem,
    DisableUserButton,
    ItemResult,
} from './room-poker-players.styles';

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
    const { id, playerId, room, isOwner } = useContext(RoomContext);

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
            await RoomService.update(id, data);
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
