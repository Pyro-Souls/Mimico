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
    onSnapshot, 
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "./firebase";
import { type QuerySnapshot } from "firebase/firestore";

const collectionName = 'users';

// CREATE
export const createUser = async(obj:userData) => {
    const docRef = await doc(db, collectionName, obj.uid as string);
    const res = await setDoc(docRef, obj);
    return docRef.id;
}

// UPDATE
export const updateUser = async (id:string, obj:userData) => {
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
export const getUsersByCondition = async (value:string) => {
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
export const deleteUser = async (id:string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection:QuerySnapshot) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

// UPLOAD IMAGE Pol's Version, Jean tiene otra versión maybe mejor idk
//export const uploadProfileImage = async (file, uid:string) => {
  //  const storageRef = ref(storage, `/files/${uid}/${file.name}`);
  //  const data = await uploadBytes(storageRef, file);
  //  const url = await getDownloadURL(data.ref);
 //   const colRef = collection(db, collectionName);
//    await setDoc(doc(colRef, uid), { profileImage: url });
//    return url;
//};



 // UPLOAD PROFILE IMAGE
export const uploadProfileImage = async (userId: string, uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profileImages/${userId}/${new Date().getTime()}`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
};
// FETCH USER PROFILE DATA
export const fetchProfileData = async (userId: string): Promise<userData> => {
    const docRef = doc(db, collectionName, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as userData;
    } else {
        throw new Error('No such document!');
    }
};

