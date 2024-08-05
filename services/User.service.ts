import { Characters } from "../common/types/Characters";
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
    where
} from "./firebase";


const collectionName = 'users';

// Функции для работы с пользователями
export const createUser = async (obj: userData) => {
    const docRef = doc(db, collectionName, obj.uid as string);
    await setDoc(docRef, obj);
    return docRef.id;
}

export const updateUser = async (id: string, obj: Partial<userData>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
}

export const getUsers = async (): Promise<userData[]> => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

export const getUsersByCondition = async (value: any): Promise<userData[]> => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
}

export const getUserById = async (id: string): Promise<userData> => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data() as userData;
}

export const deleteUser = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection: any) => {
    return collection.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
    });
}


const getUserCharactersCollection = (userId: string) => collection(doc(db, 'users', userId), 'characters');

// CREATE
export const addCharacter = async (userId: string, characterData: Characters) => {
    try {
        const colRef = getUserCharactersCollection(userId);
        const docRef = await addDoc(colRef, characterData);
        console.log('Character added successfully with ID: ', docRef.id);
        await updateDoc(docRef, { id: docRef.id });
        return docRef.id;
    } catch (error) {
        console.error('Error adding character: ', error);
    }
};

// READ
export const getUserCharacters = async (userId: string): Promise<Characters[]> => {
    const colRef = getUserCharactersCollection(userId);
    const q = query(colRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const characters: Characters[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        characters.push({
            id: doc.id,
            userId: data.userId,
            title: data.title,
            subtitle: data.subtitle,
            stats: data.stats,
        } as Characters);
    });

    return characters;
};

// UPDATE
export const updateCharacter = async (userId: string, id: string, character: Characters) => {
    const characterRef = doc(getUserCharactersCollection(userId), id);

    try {
        await updateDoc(characterRef, character as any);
    } catch (error) {
        throw new Error('Error updating character: ' + (error as Error).message);
    }
};

// DELETE
export const removeCharacter = async (userId: string, id: string) => {
    try {
        const docRef = doc(getUserCharactersCollection(userId), id);
        await deleteDoc(docRef);
        console.log('Character removed successfully');
    } catch (error) {
        console.error('Error removing character: ', error);
    }
};



