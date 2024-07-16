import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const initialData = [
  { id: '1', title: 'Nombre', value: 'Elna Vajazo' },
  { id: '2', title: 'Clase', value: 'Assessino' },
  { id: '3', title: 'Subclase', value: 'Ladrón' },
  { id: '4', title: 'Apariencia', value: 'Enano, con una complexión delgada pero atlética. Su piel es de un tono rojo oscuro, que le permite camuflarse en las sombras con facilidad. Tiene unos ojos penetrantes de color rojo carmesí que parecen brillar en la oscuridad, reflejando su naturaleza peligrosa. Su cabello es blanco como la nieve, largo y siempre recogido en una coleta para no entorpecer sus movimientos. Sus orejas puntiagudas asoman por encima de su capa negra, siempre atenta a cualquier sonido.' },
];

export default function CharacterSheet() {
  const [data, setData] = useState(initialData);

  const handleEdit = (id, newValue) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const handleRemove = id => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <TextInput
        style={styles.input}
        value={item.value}
        onChangeText={text => handleEdit(item.id, text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEdit(item.id, item.value)} color="#7a1820" />
        <Button title="Remove" onPress={() => handleRemove(item.id)} color="#7a1820" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7deae',
  },
  list: {
    alignItems: 'center',
  },
  card: {
    width: width * 0.9, // 90% of the screen width
    backgroundColor: '#f3ce87',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});