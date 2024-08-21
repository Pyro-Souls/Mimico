import { StyleSheet } from 'react-native';

const ImageStyles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
    width: 250,
    height: 250,
    borderRadius: 150,
    overflow: 'hidden',
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  settingsIcon: {
    width: 32,
    height: 32,
  },
  usernameIcon: {
    width: 28,
    height: 28,
  },
  icon: {
    width: 50,
    height: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Ajuste del margen superior
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  
});

export default ImageStyles;
