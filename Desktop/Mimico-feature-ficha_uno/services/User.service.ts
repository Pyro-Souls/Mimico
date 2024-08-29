import { CharacterData } from "../common/types/CharacterData";
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
} from "./firebase";

const collectionName = "users";

export const createUser = async (obj: userData) => {
  const docRef = doc(db, collectionName, obj.uid as string);
  await setDoc(docRef, obj);
  return docRef.id;
};

export const updateUser = async (id: string, obj: Partial<userData>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, obj);
};

export const getUsers = async () => {
  const colRef = collection(db, collectionName);
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

export const getUsersByCondition = async (value: string) => {
  const colRef = collection(db, collectionName);
  const result = await getDocs(query(colRef, where("age", "==", value)));
  return getArrayFromCollection(result);
};

export const getUserById = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const result = await getDoc(docRef);
  return result.data() as userData;
};

export const deleteUser = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

const getArrayFromCollection = (collection: any) => {
  return collection.docs.map((doc: any) => {
    return { ...doc.data(), id: doc.id };
  });
};

const getUserCharactersCollection = (userId: string) =>
  collection(doc(db, "users", userId), "characters");

// CREATE
export const addCharacter = async (
  userId: string,
  characterData: CharacterData
) => {
  try {
    const colRef = getUserCharactersCollection(userId);
    const docRef = await addDoc(colRef, characterData);
    console.log("Character added successfully with ID: ", docRef.id);
    await updateDoc(docRef, { id: docRef.id });
    return docRef.id;
  } catch (error) {
    console.error("Error adding character: ", error);
  }
};

// READ
export const getUserCharacters = async (
  userId: string
): Promise<CharacterData[]> => {
  const colRef = getUserCharactersCollection(userId);
  const q = query(colRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const characters: CharacterData[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    characters.push({
      id: doc.id,
      userId: data.userId,
      title: data.title,
      nombre: data.nombre,
      competencias: data.competencias,
      imageUri: data.imageUri, // Обработка imageUri
    } as CharacterData);
  });

  return characters;
};

// UPDATE
export const updateCharacter = async (
  userId: string,
  characterId: string,
  updatedCharacter: Partial<CharacterData>
) => {
  try {
    const docRef = doc(db, "users", userId, "characters", characterId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Document with ID ${characterId} does not exist.`);
    }

    // Ensure that only fields that are being updated are sent
    const updateData: { [key: string]: any } = { ...updatedCharacter };

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating character:", error);
    throw error;
  }
};

// DELETE
export const removeCharacter = async (userId: string, id: string) => {
  try {
    const docRef = doc(getUserCharactersCollection(userId), id);
    await deleteDoc(docRef);
    console.log("Character removed successfully");
  } catch (error) {
    console.error("Error removing character: ", error);
  }
};
