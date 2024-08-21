import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, getDocs, query, where
} from 'firebase/firestore';
import {
  getAuth, initializeAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, signOut, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export { collection, doc, getDoc, setDoc, getDocs, query, updateDoc, deleteDoc, addDoc, where, onSnapshot } from "firebase/firestore";
export { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInWithCredential, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
export {getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: `${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: `${process.env.EXPO_PUBLIC_PROJECT_ID}.appspot.com`,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Initialize Auth based on platform
const isWeb = Platform.OS === 'web';
export const auth = isWeb
  ? getAuth(firebaseApp)
  : initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

// For web, set persistence
if (isWeb) {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error("Failed to set persistence:", error);
    });
}
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
