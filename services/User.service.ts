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
    onSnapshot,
    DocumentSnapshot,
    QueryDocumentSnapshot,
    DocumentData,
    QuerySnapshot
} from "../services/firebase";

const collectionName = 'users';

// CREATE
export const createUser = async (obj: userData) => {
    const docRef = await doc(db, collectionName, obj.uid as string);
    const res = await setDoc(docRef, obj);
    return docRef.id;
}

// UPDATE
export const updateUser = async (id: string, obj: Partial<userData>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
}

// READ
export const getUsers = async () => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
export const getUsersByCondition = async (value: any) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
}

export const getUserById = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data() as userData;
}

// DELETE
export const deleteUser = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection: QuerySnapshot<DocumentData>) => {
    return collection.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        return { ...doc.data(), id: doc.id };
    });
}