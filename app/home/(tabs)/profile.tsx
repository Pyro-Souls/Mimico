import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ContainerUI } from '../../../core/ui/organisms';
import { Button, Typography, Input } from '../../../core/ui/atoms';
import { fetchProfileData, updateUser, uploadProfileImage } from '../../../services/User.service';
import { useFonts, CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import * as ImagePicker from 'expo-image-picker';
import { logout } from '../../../services/Auth.service';
import useStore from '../../../providers/store';

const ProfileScreen: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fontsLoaded] = useFonts({ CarterOne_400Regular });
  const router = useRouter();
  const { user, setUser, updateUsername, updateProfileImage, clearUser } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.uid) {
          const data = await fetchProfileData(user.uid);
          console.log('Fetched profile data:', data);
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, [user.uid]);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() && user.uid) {
      try {
        const updatedUser = { ...user, username: newUsername };
        await updateUser(user.uid, updatedUser);
        updateUsername(newUsername);
        setNewUsername('');
        setShowModal(false);
      } catch (error) {
        console.error('Error updating username:', error);
        Alert.alert('Error', 'Hubo un error al actualizar el nombre de usuario. Intenta de nuevo.');
      }
    } else {
      Alert.alert('Invalid Input', 'El nombre de usuario no puede estar vacío.');
    }
  };

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
        const downloadURL = await uploadProfileImage(user.uid!, uri);
        console.log('Profile image URL:', downloadURL);
        const updatedUser = { ...user, profileImageUrl: downloadURL }; // Update with correct field name
        await updateUser(user.uid!, updatedUser);
        updateProfileImage(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'Hubo un error al subir la imagen.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout exitoso', 'Has cerrado sesión exitosamente');
      if (router.canDismiss()) router.dismissAll();
      clearUser();
    } catch (error) {
      Alert.alert('Error de Logout', 'Hubo un problema al cerrar sesión. Inténtalo de nuevo.');
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ContainerUI>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Typography size="h4" text="Profile Screen" />
          <Typography size="sm" text={`Current username: ${user.username || 'N/A'}`} />

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={user.profileImageUrl ? { uri: user.profileImageUrl } : require('../../../assets/profile_default.png')}
              style={{ width: 300, height: 300, borderRadius: 150, alignSelf: 'center' }}
              onError={() => console.error('Error loading profile image')} // Handle image load error
            />
          </TouchableOpacity>

          <Button title="Change Username" onPress={() => setShowModal(true)} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Typography size="h5" text="Change Username" />
            <Input
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <Button title="Update" onPress={handleUpdateUsername} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </ContainerUI>
  );
};

export default ProfileScreen;