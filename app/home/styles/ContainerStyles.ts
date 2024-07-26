import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    right: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  usernameContainer: {
    flexDirection: 'row', // Mantener el flexDirection para mantener el orden de los elementos
    marginTop: 20, // Ajuste del margen superior
    alignItems: 'center', // Alinea el contenido al centro
  },
  topRightButtons: {
    position: 'absolute',
    top: 40, // Ajuste del margen superior
    right: 20,
    justifyContent: 'flex-end', // Alinear los elementos al final (a la derecha)
    flexDirection: 'row-reverse', // Mantener el flexDirection para mantener el orden de los elementos
    alignItems: 'center',
  },

  
});

export default ContainerStyles;
