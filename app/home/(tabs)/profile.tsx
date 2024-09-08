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
import { Ionicons } from '@expo/vector-icons'; 

const ProfileScreen: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fontsLoaded] = useFonts({ CarterOne_400Regular });
  const router = useRouter();
  const { user, setUser, updateUsername, updateProfileImage, clearUser } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          const data = await fetchProfileData(user.uid);
          console.log('Fetched profile data:', data);
          setUser(data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    fetchData();
  }, [user?.uid]);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() && user?.uid) {
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

  const pickImage = async (type: 'profile' | 'banner') => {
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
        const downloadURL = await uploadProfileImage(user?.uid!, uri);
        const updatedUser = type === 'profile'
          ? { ...user, profileImageUrl: downloadURL }
          : { ...user, bannerImageUrl: downloadURL };
        await updateUser(user?.uid!, updatedUser);
        if (type === 'profile') {
          updateProfileImage(downloadURL);
        }
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 16, alignItems: 'center' }}>

          {/* Imagen de Banner */}
          {user?.bannerImageUrl && (
            <Image
              source={{ uri: user.bannerImageUrl }}
              style={{ width: '100%', height: 150 }}
              onError={() => console.error('Error loading banner image')}
            />
          )}

          {/* Imagen de Perfil */}
          <TouchableOpacity onPress={() => editMode && pickImage('profile')}>
            <Image
              source={user?.profileImageUrl ? { uri: user.profileImageUrl } : require('../../../assets/profile_default.png')}
              style={{ width: 300, height: 300, borderRadius: 150, marginTop: -75 }} 
              onError={() => console.error('Error loading profile image')}
            />
          </TouchableOpacity>

          {/* Botón de Editar Perfil */}
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
              <Typography size="h5" text={editMode ? "Cancelar" : "Editar Perfil"} />
            </TouchableOpacity>
          </View>

          {/* Contenedor para el nombre de usuario y el botón de editar */}
          <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
            <Typography size="h2" text={user?.username || 'N/A'} />
            {editMode && (
              <TouchableOpacity onPress={() => setShowModal(true)} style={{ marginLeft: 8 }}>
                <Ionicons name="create-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>

          {/* ID de Usuario */}
          <View style={{ marginTop: 8 }}>
            <Typography size="sm" text={`UserID: ${user?.uid || 'N/A'}`} />
          </View>

          {/* Contenedor para el banner y el botón de editar */}
          <View style={{ marginTop: 32, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              {user?.bannerImageUrl && (
                <TouchableOpacity onPress={() => editMode && pickImage('banner')}>
                  <Image
                    source={{ uri: user.bannerImageUrl }}
                    style={{ width: '100%', height: 150 }}
                    onError={() => console.error('Error loading banner image')}
                  />
                </TouchableOpacity>
              )}
            </View>
            {editMode && (
              <TouchableOpacity onPress={() => pickImage('banner')} style={{ marginLeft: 8 }}>
                <Ionicons name="image-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>

          {/* Botón de Cerrar Sesión */}
          <View style={{ marginTop: 32 }}>
            <Button title="Cerrar Sesión" onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>

      {/* Modal para cambiar el nombre de usuario */}
      <Modal
        transparent
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Typography size="h5" text="Cambiar Nombre de Usuario" />
            <Input
              placeholder="Introduce un nuevo nombre de usuario"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <Button title="Actualizar" onPress={handleUpdateUsername} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </ContainerUI>
  );
};

export default ProfileScreen;
