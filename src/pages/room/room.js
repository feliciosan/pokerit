import React, { useState, useContext } from 'react';
import PokerCards from './room-components/room-poker-cards/room-poker-cards';
import PokerPlayers from './room-components/room-poker-players/room-poker-players';
import FormPlayer from './room-components/room-form-player/room-form-player';
import NotFound from '../not-found/not-found';
import RoomService from '../../services/room';

import { RoomProvider, RoomContext } from '../../contexts/room/room';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCheck } from 'react-icons/ai';
import { AiFillCopy } from 'react-icons/ai';
import {
    Button,
    Container,
    PageHeader,
    PageTitle,
    Loading,
} from '../../styles/default/default';
import {
    PageHeaderActions,
    IconButton,
    PokerBox,
    PokerPanel,
    PokerList,
    ActiveButton,
    ActiveButtonIcon,
} from './room-styles';

const RoomContexted = () => {
    const [copied, setCopied] = useState(false);
    const { playerId, room, roomExists, isPageLoading, isOwner } = useContext(
        RoomContext
    );

    const toggleActivePlayer = async () => {
        try {
            const currentPlayerStatus = `players.${playerId}.active`;
            const status = !room.players[playerId].active;
            const data = {};

            data[currentPlayerStatus] = status;

            await RoomService.update(room.id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    const resetCards = async () => {
        try {
            const playersToUpdate = { ...room.players };
            const data = { show_result: false };

            Object.keys(playersToUpdate).forEach((key) => {
                playersToUpdate[key].card = null;
            });

            data.players = playersToUpdate;

            await RoomService.update(room.id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    const showAllCards = async (show) => {
        try {
            const data = { show_result: show };

            await RoomService.update(room.id, data);
        } catch (error) {
            //Error handler popup msg
        }
    };

    if (!roomExists) {
        return <NotFound />;
    }

    return (
        <Container>
            {isPageLoading ? (
                <Loading marginTop="30px" />
            ) : (
                <>
                    <PageHeader>
                        <div>
                            <PageTitle>{room.name}</PageTitle>
                        </div>
                        {isOwner && (
                            <PageHeaderActions>
                                <CopyToClipboard
                                    text={window.location.href}
                                    onCopy={() => setCopied(true)}
                                >
                                    <IconButton
                                        title="Copy room link!"
                                        copied={copied}
                                    >
                                        <AiFillCopy />
                                    </IconButton>
                                </CopyToClipboard>
                                <Button
                                    onClick={() =>
                                        showAllCards(!room.show_result)
                                    }
                                    color={
                                        room.show_result ? 'yellow' : 'purple'
                                    }
                                >
                                    {!room.show_result ? 'Show All' : 'Hide'}
                                </Button>
                                <Button onClick={resetCards} color="purple">
                                    Reset
                                </Button>
                            </PageHeaderActions>
                        )}
                    </PageHeader>
                    {!playerId ? (
                        <FormPlayer />
                    ) : (
                        <PokerBox>
                            <PokerPanel>
                                <PokerCards />
                            </PokerPanel>
                            <PokerList>
                                <ActiveButton
                                    active={room.players[playerId].active}
                                    onClick={toggleActivePlayer}
                                    small
                                >
                                    <ActiveButtonIcon
                                        active={room.players[playerId].active}
                                    >
                                        {room.players[playerId].active && (
                                            <AiOutlineCheck />
                                        )}
                                    </ActiveButtonIcon>
                                    Active
                                </ActiveButton>
                                <PokerPlayers />
                            </PokerList>
                        </PokerBox>
                    )}
                </>
            )}
        </Container>
    );
};

const Room = () => (
    <RoomProvider>
        <RoomContexted />
    </RoomProvider>
);

export default Room;
