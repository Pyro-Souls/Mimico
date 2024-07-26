import { userData } from "../common/types/User";
import {firestore } from "./firebase"
import {
    db, 
    doc, 
    getDoc, 
    getDocs, 
    collection, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    addDoc, 
    query, 
    where, 
    onSnapshot 
} from "./firebase";

const collectionName = 'users';

// CREATE
export const createUser = async(obj:userData) => {
    const docRef = await doc(db, collectionName, obj.uid as string);
    const res = await setDoc(docRef, obj);
    return docRef.id;
}

// UPDATE
export const updateUser = async (id, obj) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj)
}

// READ
export const getUsers= async ()  => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getUsersByCondition = async (value) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
}

export const getUserById = async (id:string) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data() as userData;
}

// DELETE
export const deleteUser = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}
//esto es otro tipo de cambio de username borrar luego si no hace falta//
export const fetchProfileData = async (userId: string) => {
    const userDocRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error('User data not found');
  };
  
  export const updateUsername = async (userId: string, newUsername: string) => {
    const userDocRef = doc(firestore, 'users', userId);
    await setDoc(userDocRef, { username: newUsername }, { merge: true });
  };