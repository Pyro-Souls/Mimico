import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { createUser, getUserById } from "./User.service";
import { userData } from "../common/types/User";
import { firebaseApp } from "./firebase";

// Sign up function
export const signUp = async (
  username: string,
  name: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(firebaseApp),
      email,
      password
    );
    await sendEmailVerification(userCredential.user);

    // Create user data
    const user: userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: name,
      lastName: lastName,
      username: username,
      date: new Date(),
      profileImage: null,
    };
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
};

// Log in function
export const logIn = async (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in (logIn function)", auth.currentUser?.uid);
    const user = (await getUserById(auth.currentUser?.uid ?? "")) as userData;
    console.log("User logged in (handleLogin)", user);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Log in with Google function
export const logInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });

    if (response?.type === "success") {
      const { idToken } = response.params;
      const credential = GoogleAuthProvider.credential(idToken);
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log("User logged in with Google:", user);

      const u = (await getUserById(user.uid)) as userData;
      if (!u) {
        const newUser: userData = {
          uid: user.uid,
          username: null,
          email: user.email,
          name: user.displayName,
          lastName: null,
          date: new Date(),
          profileImage: null,
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

// Log out function
export const logout = async () => {
  await signOut(getAuth(firebaseApp));
  console.log("User logged out");
};
