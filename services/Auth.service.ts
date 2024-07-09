import { doc, updateDoc } from "firebase/firestore";
import {
    auth,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut, GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail,
    sendEmailVerification,
    firebaseApp
} from "./firebase";

import { createUser, getUserById } from "../services/User.service";
import { userData } from "../common/types/User";

export const signUp = async (username: string, name: string, lastName: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        sendEmailVerification(userCredential.user);

        // Create user
        const user = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            name: name,
            lastName: lastName,
            username: username,
            date: new Date(),
        } as userData;
        console.log(user);

        const userCreatedId = await createUser(user);
        console.log(userCreatedId);

        return userCreatedId;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        } else {
            return "An unexpected error occurred";
        }
    }
}

export const logIn = async (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
    try {
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Maybe check getUserbyid
        console.log("User logged in", auth.currentUser?.uid);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};

export const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User logged in with google", user);

    const u = await getUserById(user.uid) as userData;
    if (!u) {
        const newUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            date: new Date(),
        } as userData;
        await createUser(newUser); // Добавлено создание нового пользователя
    }
    return user.uid;
};

export const logout = async () => {
    await signOut(auth);
    console.log("User logged out");
};
