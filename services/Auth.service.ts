import * as Google from 'expo-auth-session/providers/google';
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
import { Alert } from 'react-native';
import { createUser, getUserById } from "./User.service";
import { userData } from "../common/types/User";
import { signInWithCredential } from "firebase/auth";

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
        console.log("User logged in (logIn function)", auth.currentUser?.uid);
        const user = await getUserById(auth.currentUser?.uid ?? '') as userData;
        return user;
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
  try {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });

    if (response?.type === 'success') {
      const { idToken } = response.params;
      const credential = GoogleAuthProvider.credential(idToken);
      const auth = getAuth();
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log("User logged in with Google:", user);

      const u = await getUserById(user.uid) as userData;
      if (!u) {
        const newUser: userData = {
          uid: user.uid,
          username: null,
          email: user.email,
          name: user.displayName,
          lastName: null,
          date: new Date(),
          profileImage:"../assets/profile_default.png",
        };
        console.log(newUser);

        const userCreatedId = await createUser(newUser);
        console.log("Google user created:", userCreatedId);
      }
      return user.uid;
    } else {
      console.log("Google login cancelled or failed");
      return null;
    }
  } catch (error) {
    console.error("Failed to log in with Google:", error);
    return null;
  }
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
