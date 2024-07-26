import { userData } from "../common/types/User";
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
<<<<<<< Updated upstream
    onSnapshot 
=======
    onSnapshot, 
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    getStorage,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

// UPLOAD IMAGE generic
export const uploadImage = async (file, filePath) => {
  const storage = getStorage();
  const storageRef = ref(storage, filePath);
  const data = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(data.ref);
  return url;
};

// UPLOAD PROFILE IMAGE
export const uploadProfileImage = async (file, uid:string) => {
  const filePath = `/files/${uid}/${file.name}`;
  const url = await uploadImage(file, filePath);
  const colRef = collection(db, collectionName);
  await setDoc(doc(colRef, uid), { profileImage: url });
  return url;
};

// UPLOAD PROFILE IMAGE Jean's Version
// export const uploadProfileImage = async (userId: string, uri: string) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     const storageRef = ref(storage, `images/${new Date().getTime()}`);
//     await uploadBytes(storageRef, blob);

//     const downloadURL = await getDownloadURL(storageRef);

//     const userDocRef = doc(db, collectionName, userId);
//     await setDoc(userDocRef, { profileImageUrl: downloadURL }, { merge: true });

//     return downloadURL;
// }
>>>>>>> Stashed changes
