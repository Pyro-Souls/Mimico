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

import { createUser, getUserById } from "./User.service";
import { userData } from "../common/types/User";

export const signUp = async (username: string , name:string, lastName: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            email,
            password
            );
        sendEmailVerification(userCredential.user);

        //Create user
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
        //Maybe check getUserbyid
        console.log("User logged in", auth.currentUser?.uid);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};

// export const checkEmailAndPass = async (email, password) => {
//     const r = await fetchSignInMethodsForEmail(auth, email);
//     if (r.includes("google.com")) {
//         return "google.com";
//     }
//     try {
//         const result = await signInWithEmailAndPassword(auth, email, password);
//         return result.user.uid;
//     } catch (err) {
//         return err.message;
//     }
// };

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
    }
    return user.uid;
};

// export const EditProfile = async (uid, name, email,date) => {
//     await updateDoc(doc(db, "users", uid), {
//         id: uid,
//         email: email,
//         name: name,
//         date: date,
//     });
// };

export const logout = async () => {
    await signOut(auth);
    console.log("User logged out");
};

//recover password
// export const sendPass = (email) => {
//     sendPasswordResetEmail(auth, email)
//         .then(() => {
//             return "Email sent";
//             // Password reset email sent!
//             // ..
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });
// };
