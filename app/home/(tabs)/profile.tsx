import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useFonts, CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { logout } from '../../../services/Auth.service';
const ProfileScreen = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('Filemona');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    CarterOne_400Regular,
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  };

  const handleChangeUsername = () => {
    Alert.alert('Función para cambiar nombre de usuario');
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logout exitoso", "Has cerrado sesión exitosamente");
      logout();
        
        //This clears navigation history and goes back to the first screen 
        if (router.canDismiss()) router.dismissAll();
    } catch (error) {
      Alert.alert("Error de Logout", "Hubo un problema al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('../../../assets/fondomimico.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../../../assets/Iconback.png')} style={styles.backIcon} />
        </TouchableOpacity>
        
        <View style={styles.topRightButtons}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
            <Image source={require('../../../assets/Iconoajustes.png')} style={styles.settingsIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={() => Alert.alert('Botón Prime presionado')}>
            <Text style={styles.buttonText}>Prime</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>          
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image 
              source={userImage ? { uri: userImage } : require('../../../assets/Ellipse 22.png')} 
              style={styles.userImage} 
            />
          </TouchableOpacity>
          
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username}</Text>
            <TouchableOpacity style={styles.changeUsernameButton} onPress={handleChangeUsername}>
              <Image source={require('../../../assets/Iconeditname.png')} style={styles.usernameIcon} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonsContainer}>
           
            <TouchableOpacity style={styles.customButton3} onPress={handleLogout}>
              <Image source={require('../../../assets/Iconlogout.png')} style={styles.buttonIcon} />
              <Text style={styles.buttonText3}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/home')}>
            <Image source={require('../../../assets/Iconohome.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Ajuste del margen superior
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backIcon: {
    width: 28, // Tamaño más grande
    height: 28, // Tamaño más grande
  },
  topRightButtons: {
    position: 'absolute',
    top: 40, // Ajuste del margen superior
    right: 20,
    justifyContent: 'flex-end', // Alinear los elementos al final (a la derecha)
    flexDirection: 'row-reverse', // Mantener el flexDirection para mantener el orden de los elementos
    alignItems: 'center',
  },
  settingsButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10, // Espacio entre el botón de ajustes y el borde derecho del contenedor
  },
  settingsIcon: {
    width: 32, // Tamaño más grande
    height: 32, // Tamaño más grande
  },
  customButton: {
    backgroundColor: '#D73F3F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 132, // Ancho del botón
    height: 45, // Alto del botón
    justifyContent: 'center', // Centrar verticalmente el texto
    alignItems: 'center', // Centrar horizontalmente el texto
    position: 'relative', // Asegura que los elementos internos se posicionen correctamente
    marginVertical: 5, // Espacio vertical entre los botones
    // Añadir sombra
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // Para Android
  },
  customButton2: {
    backgroundColor: '#D73F3F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 374, // Ancho del botón
    height: 60, // Alto del botón
    justifyContent: 'center', // Centrar verticalmente el texto
    alignItems: 'center', // Centrar horizontalmente el texto
    position: 'relative', // Asegura que los elementos internos se posicionen correctamente
    marginVertical: 5, // Espacio vertical entre los botones
    // Añadir sombra
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // Para Android
  },
  customButton3: {
    backgroundColor: '#661414',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 374, // Ancho del botón
    height: 60, // Alto del botón
    justifyContent: 'center', // Centrar verticalmente el texto
    alignItems: 'center', // Centrar horizontalmente el texto
    position: 'relative', // Asegura que los elementos internos se posicionen correctamente
    marginVertical: 5, // Espacio vertical entre los botones
    // Añadir sombra
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // Para Android
  },
  buttonText: {
    color: '#EAA828', // Color del texto
    fontSize: 22, // Tamaño del texto aumentado a 32
    fontFamily: 'CarterOne_400Regular', // Aplica la fuente Carter One
    zIndex: 1, // Asegura que el texto esté por encima del botón
    position: 'absolute', // Posiciona el texto de manera absoluta dentro del botón
  },
  buttonText2: {
    color: '#FAF1E0', // Color del texto
    fontSize: 22, // Tamaño del texto aumentado a 32
    fontFamily: 'CarterOne_400Regular', // Aplica la fuente Carter One
    zIndex: 1, // Asegura que el texto esté por encima del botón
    position: 'absolute', // Posiciona el texto de manera absoluta dentro del botón
  },
  buttonText3: {
    color: '#FAF1E0', // Color del texto
    fontSize: 22, // Tamaño del texto aumentado a 32
    fontFamily: 'CarterOne_400Regular', // Aplica la fuente Carter One
    zIndex: 1, // Asegura que el texto esté por encima del botón
    position: 'absolute', // Posiciona el texto de manera absoluta dentro del botón
  },
  footer: {
    position: 'absolute', // Asegura que el icono esté fijo en la parte inferior derecha
    bottom: 150, // Ajuste del margen inferior
    right: 20, // Ajuste del margen derecho
    justifyContent: 'flex-end', // Alinea el contenido al final
    alignItems: 'center', // Alinea el contenido al centro horizontalmente
  },
  iconButton: {
    backgroundColor: '#661414',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
  },
  icon: {
    width: 50, // Tamaño del icono aumentado a 32
    height: 50, // Tamaño del icono aumentado a 32
  },
  background: {
    flex: 1, // Ajuste del fondo completo
    resizeMode: 'cover', // Cobertura completa
    justifyContent: 'center', // Alinea el contenido al centro
  },
  content: {
    flex: 1, // Ajuste del contenido para llenar la pantalla
    justifyContent: 'center', // Alinea el contenido al centro
    alignItems: 'center', // Alinea el contenido al centro
  },
  imageContainer: {
    marginTop: 50, // Ajuste del margen superior
    width: 150, // Ajuste del ancho
    height: 150, // Ajuste del alto
    borderRadius: 75, // Ajuste del radio de la esquina
    overflow: 'hidden', // Ajuste para la imagen
  },
  userImage: {
    width: '100%', // Ajuste del ancho al 100%
    height: '100%', // Ajuste del alto al 100%
  },
  usernameContainer: {
    flexDirection: 'row', // Mantener el flexDirection para mantener el orden de los elementos
    marginTop: 20, // Ajuste del margen superior
    alignItems: 'center', // Alinea el contenido al centro
  },
  username: {
    color: '#fff', // Color del texto blanco
    fontSize: 32, // Tamaño del texto aumentado a 32
    fontFamily: 'CarterOne_400Regular', // Aplica la fuente Carter One
  },
  changeUsernameButton: {
    marginLeft: 10, // Ajuste del margen izquierdo
  },
  usernameIcon: {
    width: 28, // Tamaño del icono aumentado a 32
    height: 28, // Tamaño del icono aumentado a 32
  },
  buttonsContainer: {
    width: '100%', // Ajuste del ancho al 100%
    alignItems: 'center', // Alinea el contenido al centro
    marginTop: 40, // Ajuste del margen superior
  },
  buttonIcon: {
    width: 28, // Tamaño del icono aumentado a 32
    height: 28, // Tamaño del icono aumentado a 32
    position: 'absolute', // Posiciona el icono de manera absoluta dentro del botón
    left: 20, // Ajuste del margen izquierdo
  },
});

export default ProfileScreen;
