import { View, Text, StyleSheet, Button, FlatList, Dimensions } from 'react-native';

import { useEffect } from 'react';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const data = [
    { id: '1', title: 'Mascarpone Toblerone', subtitle: 'Caballero Sagrado', stats: { strength: 10, agility: 8,  } },
    { id: '2', title: 'Elna Vajazo', subtitle: 'Asesina', stats: { strength: 6, agility: 6 } },
    { id: '3', title: 'Nano el Hermano', subtitle: 'Clèrigo Corrupto', stats: { strength: 7, agility: 9 } },
    { id: '4', title: 'Monja Mon', subtitle: 'Monja carnicera', stats: { strength: 6, agility: 6 } },
    { id: 'add', title: '', subtitle: '', stats: {} }, // Special item for the empty card

  // Add more characters here...
];

const CharacterCard = ({ title, subtitle, stats }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.stats}>Strength: {stats.strength}</Text>
    <Text style={styles.stats}>Agility: {stats.agility}</Text>
  </View>
);

const AddNewCard = () => (
  <View style={styles.addCard}>
    <Text style={styles.plus}>+</Text>
  </View>
);


export default function Tab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (item.id === 'add') {
            return <AddNewCard />;
          } else {
            return <CharacterCard title={item.title} subtitle={item.subtitle} stats={item.stats} />;
          }
        }}
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
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    color: '#495057',
  },
  addCard: {
    width: width * 0.9, // 90% of the screen width
    height: 120, // Adjust height as needed
    backgroundColor: '#f3ce87',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7a1820',
    borderStyle: 'dashed',
  },
  plus: {
    fontSize: 40,
    color: '#7a1820',
  },
});