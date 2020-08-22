// import { Auth } from './firebase';
import { Auth } from '../firebase';

const useAuth = () => {
    const signInWithEmailAndPassword = (email, password) => {
        return Auth.signInWithEmailAndPassword(email, password);
    };

    const createUserWithEmailAndPassword = (email, password) => {
        return Auth.createUserWithEmailAndPassword(email, password);
    };

    const sendPasswordResetEmail = (email) => {
        return Auth.sendPasswordResetEmail(email);
    };

    return {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
    };
};

export default useAuth;
