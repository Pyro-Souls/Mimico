import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Modal,
  TextInput,
  Button as RNButton,
} from 'react-native';
import { useFonts, CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
//Todo lo de abajo no puede estar aqui, ya esta en services/firebase,
//Hay que importar las funciones que se necesiten de ahi (creando nuevas si es necesario)
//Intuyo que lo usas en el image picker
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore, storage, auth } from '../../../services/firebase';
import { logout } from '../../../services/Auth.service';
import { onAuthStateChanged, User } from 'firebase/auth';
import { fetchProfileData, updateUsername } from '../../../services/User.service';
import { ContainerStyles, ButtonStyles, TextStyles, ImageStyles, ModalStyles } from '../styles';

const ProfileScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({ CarterOne_400Regular });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
        fetchProfileData(user.uid).then(data => {
          setUsername(data.username || '');
          setProfileImage(data.profileImageUrl || '');
        }).catch(console.error);
      }
    });
    return () => unsubscribe();
  }, []);

  //Esta funcion pickIimage deberia ser un componente aparte, ya que se puede reutilizar en otros lugares
  //Igualmente, la logica de subir la imagen a firebase deberia estar en un servicio (services/Image.service.ts por ejemplo o el mismo User.service.ts)
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${new Date().getTime()}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        if (userId) {
          const userDocRef = doc(firestore, 'users', userId);
          await setDoc(userDocRef, { profileImageUrl: downloadURL }, { merge: true });
        }
      } catch (error) {
        console.error('Error uploading image to Firebase Storage:', error);
        Alert.alert('Error', 'There was an error uploading the image. Please try again.');
      }
    }
  };

  const handleChangeUsername = () => setShowModal(true);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() && userId) {
      try {
        await updateUsername(userId, newUsername);
        setUsername(newUsername);
        setNewUsername('');
        setShowModal(false);
      } catch (error) {
        console.error('Error updating username in Firestore:', error);
        Alert.alert('Error', 'There was an error updating the username. Please try again.');
      }
    } else {
      Alert.alert('Invalid Input', 'Username cannot be empty.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logout exitoso", "Has cerrado sesión exitosamente");
      if (router.canDismiss()) router.dismissAll();
    } catch (error) {
      Alert.alert("Error de Logout", "Hubo un problema al cerrar sesión. Inténtalo de nuevo.");
    }
  };
  if (!fontsLoaded) return null;

  return (
    <ImageBackground source={require('../../../assets/fondomimico.png')} style={ContainerStyles.container}>
      <View style={ContainerStyles.container}>
        <TouchableOpacity style={ImageStyles.backButton} onPress={() => router.back()}>
          <Image source={require('../../../assets/Iconback.png')} style={ImageStyles.backIcon} />
        </TouchableOpacity>
        <View style={ContainerStyles.topRightButtons}>
          <TouchableOpacity style={ButtonStyles.settingsButton} onPress={() => router.push('/settings')}>
            <Image source={require('../../../assets/Iconoajustes.png')} style={ImageStyles.settingsIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={ButtonStyles.customButton} onPress={() => Alert.alert('Botón Prime presionado')}>
            <Text style={ButtonStyles.buttonText}>Prime</Text>
          </TouchableOpacity>
        </View>
        <View style={ContainerStyles.content}>
          <TouchableOpacity onPress={pickImage} style={ImageStyles.imageContainer}>
            <Image source={profileImage ? { uri: profileImage } : require('../../../assets/Ellipse 22.png')} style={ImageStyles.userImage} />
          </TouchableOpacity>
          <View style={ContainerStyles.usernameContainer}>
            <Text style={TextStyles.username}>{username}</Text>
            <TouchableOpacity style={ButtonStyles.changeUsernameButton} onPress={handleChangeUsername}>
              <Image source={require('../../../assets/Iconeditname.png')} style={ImageStyles.usernameIcon} />
            </TouchableOpacity>
          </View>
          <View style={ContainerStyles.buttonsContainer}>
            <TouchableOpacity style={ButtonStyles.customButton3} onPress={handleLogout}>
              <Image source={require('../../../assets/Iconlogout.png')} style={ButtonStyles.buttonIcon} />
              <Text style={ButtonStyles.buttonText3}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={ContainerStyles.footer}>
          <TouchableOpacity style={ButtonStyles.iconButton} onPress={() => router.push('/home')}>
            <Image source={require('../../../assets/Iconohome.png')} style={ImageStyles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={ModalStyles.modalOverlay}>
          <View style={ModalStyles.modalContainer}>
            <Text style={TextStyles.modalTitle}>Change Username</Text>
            <TextInput
              style={TextStyles.input}
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <View style={ModalStyles.modalButtons}>
              <RNButton title="Update" onPress={handleUpdateUsername} />
              <RNButton title="Cancel" onPress={() => setShowModal(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};
export default ProfileScreen;
