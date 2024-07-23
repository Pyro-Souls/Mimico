import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import { useStore } from '../../../providers/store';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const CharacterCard = ({ title, subtitle, stats, onPress }) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.stats}>Strength: {stats.strength}</Text>
    <Text style={styles.stats}>Agility: {stats.agility}</Text>
  </Pressable>
);

const AddNewCard = () => (
  <View style={styles.addCard}>
    <Text style={styles.plus}>+</Text>
  </View>
);

export default function Tab() {
  const { data, setCurrentCharacter } = useStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tus fichas</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === 'add') {
            return <AddNewCard />;
          } else {
            return (
              <CharacterCard
                title={item.title}
                subtitle={item.subtitle}
                stats={item.stats}
                onPress={() => {
                  setCurrentCharacter(item);
                  router.push('./ficha');
                }}
              />
            );
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#7a1820', 
  },
  card: {
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
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
    fontSize: 16,
    color: '#495057',
  },
  addCard: {
    width: width * 0.9,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7a1820',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: '#7a1820',
  },
});
