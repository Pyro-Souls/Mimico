import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'expo-router';
import { db, storage, auth } from '../../services/firebase'; // Изменено на правильный путь к firebase.ts
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface UserData {
    name: string;
    surname: string;
    age: string;
    interests: string;
    raza: string;
    clase: string;
    residence?: string;
    photoURL?: string;
}

const Profile = () => {
    const [usuario, setUsuario] = useState<any>(null); // Хранит текущего пользователя
    const [userData, setUserData] = useState<UserData>({ name: '', surname: '', age: '', interests: '', raza: '', clase: '' });
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [residence, setResidence] = useState<string>('');
    const router = useRouter();

    useEffect(() => {

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (usuario) {
                const docRef = doc(db, 'users', usuario.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data() as UserData);
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchUserData();
    }, [usuario]);

    const handleUpdate = async () => {
        try {
            const docRef = doc(db, 'users', usuario.uid);
            await updateDoc(docRef, { ...userData });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
        }
    };

    const handleResidenceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setResidence(e.target.value);
    };

    const handleSaveProfile = async () => {
        try {
            const updates: Partial<UserData> = {};
            if (profilePhoto) {
                const storageRef = ref(storage, `profilePhotos/${usuario.uid}`);
                await uploadBytes(storageRef, profilePhoto);
                const photoURL = await getDownloadURL(storageRef);
                updates.photoURL = photoURL;
            }

            if (residence) {
                updates.residence = residence;
            }

            if (Object.keys(updates).length > 0) {
                const docRef = doc(db, 'users', usuario.uid);
                await updateDoc(docRef, updates);
            }

            router.push('/');
        } catch (error) {
            console.error("Error saving profile: ", error);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <h3>User Profile</h3>
            <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Surname"
                value={userData.surname}
                onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
            />
            <input
                type="number"
                placeholder="Age"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            />
            <textarea
                placeholder="Interests"
                value={userData.interests}
                onChange={(e) => setUserData({ ...userData, interests: e.target.value })}
            ></textarea>
            <textarea
                placeholder="raza"
                value={userData.interests}
                onChange={(e) => setUserData({ ...userData, raza: e.target.value })}
            ></textarea>
            <textarea
                placeholder="clase"
                value={userData.interests}
                onChange={(e) => setUserData({ ...userData, clase: e.target.value })}
            ></textarea>
            <button onClick={handleUpdate}>Update Profile</button>

            <h3>Profile Photo and Residence</h3>
            <input type="file" onChange={handlePhotoChange} />
            <input
                type="text"
                placeholder="Residence"
                value={residence}
                onChange={handleResidenceChange}
            />
            <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
    );
};

export default Profile;
