import { Firestore } from '../firebase/firebase';

const collection = Firestore().collection('rooms');

const listAll = async (loggedUserId) => {
    const refRooms = await collection
        .where('user_id', '==', loggedUserId)
        .orderBy('timestamp', 'desc')
        .get();

    return refRooms.docs.map((item) => {
        return {
            id: item.id,
            ...item.data(),
        };
    });
};

const onSnapshot = (id, observerCallback) => {
    collection.doc(id).onSnapshot(observerCallback);
};

const create = (newRoom) => {
    return collection.add(newRoom);
};

const remove = (id) => {
    return collection.doc(id).delete();
};

const update = (id, data) => {
    return collection.doc(id).update(data);
};

export default {
    listAll,
    create,
    remove,
    update,
    onSnapshot,
};
