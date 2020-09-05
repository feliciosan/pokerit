import { Auth } from '../firebase/firebase';

const signInWithEmailAndPassword = (email, password) => {
    return Auth.signInWithEmailAndPassword(email, password);
};

const signOut = () => {
    return Auth.signOut();
};

const createUserWithEmailAndPassword = (email, password) => {
    return Auth.createUserWithEmailAndPassword(email, password);
};

const sendPasswordResetEmail = (email) => {
    return Auth.sendPasswordResetEmail(email);
};

const onAuthStateChanged = (observerCallback) => {
    Auth.onAuthStateChanged(observerCallback);
};

export default {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut,
};
