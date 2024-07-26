import { StyleSheet } from 'react-native';

const ButtonStyles = StyleSheet.create({
  customButton: {
    backgroundColor: '#D73F3F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 132,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  customButton2: {
    backgroundColor: '#D73F3F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 374,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  customButton3: {
    backgroundColor: '#661414',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
    width: 374,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  buttonText: {
    color: '#EAA828',
    fontSize: 22,
    fontFamily: 'CarterOne_400Regular',
    zIndex: 1,
    position: 'absolute',
  },
  buttonText2: {
    color: '#FAF1E0',
    fontSize: 22,
    fontFamily: 'CarterOne_400Regular',
    zIndex: 1,
    position: 'absolute',
  },
  buttonText3: {
    color: '#FAF1E0',
    fontSize: 22,
    fontFamily: 'CarterOne_400Regular',
    zIndex: 1,
    position: 'absolute',
  },
  iconButton: {
    backgroundColor: '#661414',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#372721',
  },
  buttonIcon: {
    width: 28,
    height: 28,
    position: 'absolute',
    left: 20,
  },
  topRightButtons: {
    position: 'absolute',
    top: 40, // Ajuste del margen superior
    right: 20,
    justifyContent: 'flex-end', // Alinear los elementos al final (a la derecha)
    flexDirection: 'row-reverse', // Mantener el flexDirection para mantener el orden de los elementos
    alignItems: 'center',
  },
    backButton: {
    position: 'absolute',
    top: 50, // Ajuste del margen superior
    left: 500,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  


});

export default ButtonStyles;
