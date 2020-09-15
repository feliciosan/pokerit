import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RoomService from '../../services/room';

import { useParams } from 'react-router-dom';

export const RoomContext = createContext();

const getLocalStorageUserKey = (roomId) => {
    const localStoragePlayerId = localStorage.getItem('user_id');

    if (!localStoragePlayerId) return null;

    const isAnotherRoom = roomId !== localStoragePlayerId.split('_')[1];

    if (isAnotherRoom) return null;

    return localStoragePlayerId;
};

const setLocalStoragePlayerKey = (playerId, roomId) => {
    localStorage.setItem('user_id', `${playerId}_${roomId}`);
};

export const RoomProvider = ({ children }) => {
    const { id } = useParams();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [playerId, setPlayerId] = useState(getLocalStorageUserKey(id));
    const [room, setRoom] = useState({ players: {} });
    const [roomExists, setRoomExists] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        let unmounted = false;

        RoomService.onSnapshot(id, (doc) => {
            if (!unmounted) {
                if (doc.exists) {
                    setRoom({ id: doc.id, ...doc.data() });
                    setIsPageLoading(false);

                    if (playerId) {
                        const currentPlayerId = playerId.split('_')[0];
                        const currentRoomCreatorId = doc.data().user_id;

                        setIsOwner(currentPlayerId === currentRoomCreatorId);
                    }

                    return;
                }

                setRoomExists(false);
                setIsPageLoading(false);
            }
        });

        return () => (unmounted = true);
    }, [id, playerId]);

    return (
        <RoomContext.Provider
            value={{
                id,
                room,
                playerId,
                isPageLoading,
                roomExists,
                isOwner,
                setPlayerId,
                setLocalStoragePlayerKey,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

RoomProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
