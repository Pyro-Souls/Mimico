import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { router } from 'expo-router';
// Define la interfaz para las propiedades del componente
interface SettingsMenuProps {
  visible: boolean;
  onClose: () => void;
}

// Usa la interfaz en el componente
const SettingsMenu: React.FC<SettingsMenuProps> = ({ visible, onClose }) => {
  return (
     <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Settings Menu</Text>
          <TouchableOpacity style={styles.option} onPress={() => Alert.alert('General Settings')}>
            <Text style={styles.optionText}>General Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Account Settings')}>
            <Text style={styles.optionText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Privacy Settings')}>
            <Text style={styles.optionText}>Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Notification Settings')}>
            <Text style={styles.optionText}>Notification Settings</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => router.push('/home')} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsMenu;
