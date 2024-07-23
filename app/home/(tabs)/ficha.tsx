import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, ImageBackground, ScrollView } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useStore } from '../../../providers/store';

const { width, height } = Dimensions.get('window');

// Интерфейс Item с дополнительными полями для редактирования stats
interface Item {
  id: string;
  title: string;
  value: string;
  canAddMore: boolean;
  stats?: {
    strength: number;
    agility: number;
  };
}

// Предположим, что интерфейс Character выглядит так
interface Character {
  id: string;
  title: string;
  subtitle: string;
  stats: {
    strength: number;
    agility: number;
  };
}

const convertCharacterToItem = (character: Character): Item => ({
  id: character.id,
  title: character.title,
  value: '',
  canAddMore: true,
  stats: character.stats,
});

export default function CharacterSheet() {
  const { currentCharacter, data, setData } = useStore();
  const initialData = currentCharacter ? [convertCharacterToItem(currentCharacter)] : [];
  const [localData, setLocalData] = useState<Item[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingValue, setEditingValue] = useState<string>('');
  const [editingStrength, setEditingStrength] = useState<string>(''); // Новое состояние
  const [editingAgility, setEditingAgility] = useState<string>('');   // Новое состояние

  useEffect(() => {
    if (currentCharacter) {
      setLocalData([convertCharacterToItem(currentCharacter)]);
    }
  }, [currentCharacter]);

  const handleEdit = (id: string, title: string, value: string, stats?: { strength: number; agility: number }) => {
    setEditingId(id);
    setEditingTitle(title);
    setEditingValue(value);
    if (stats) {
      setEditingStrength(stats.strength.toString());
      setEditingAgility(stats.agility.toString());
    }
  };

  const handleSave = () => {
    if (editingId) {
      const updatedData = data.map(item =>
        item.id === editingId
          ? {
            ...item,
            title: editingTitle,
            stats: {
              strength: parseInt(editingStrength) || item.stats.strength,
              agility: parseInt(editingAgility) || item.stats.agility,
            },
          }
          : item
      );
      setLocalData(prevData =>
        prevData.map(item =>
          item.id === editingId
            ? {
              ...item,
              title: editingTitle,
              value: editingValue,
              stats: {
                strength: parseInt(editingStrength) || item.stats?.strength || 0,
                agility: parseInt(editingAgility) || item.stats?.agility || 0,
              },
            }
            : item
        )
      );
      setData(updatedData);
      setEditingId(null);
    }
  };

  const handleRemove = (id: string) => {
    setLocalData(prevData => prevData.filter(item => item.id !== id));
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const handleAdd = (id: string) => {
    const newId = String(data.length + 1);
    const newItem: Item = {
      id: newId,
      title: `New Field ${newId}`,
      value: '',
      canAddMore: true,
      stats: { strength: 0, agility: 0 },
    };
    setLocalData(prevData => [...prevData, newItem]);
    setData([...data, {
      id: newId,
      title: `New Field ${newId}`,
      subtitle: '',
      stats: { strength: 0, agility: 0 },
    }]);
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? 'rgba(215, 63, 63, 0.9)' : 'rgba(255, 255, 255, 0.7)' },
        isActive ? styles.active : null,
      ]}
      onLongPress={drag}
    >
      <View style={styles.titleContainer}>
        {editingId === item.id ? (
          <>
            <TextInput
              style={[styles.input, { fontSize: 18, fontWeight: 'bold' }]}
              value={editingTitle}
              onChangeText={setEditingTitle}
            />
            <TextInput
              style={[styles.input, { fontSize: 16 }]}
              value={editingValue}
              onChangeText={setEditingValue}
              multiline={true}
              numberOfLines={4}
            />
            <TextInput
              style={[styles.input, { fontSize: 16 }]}
              keyboardType="numeric"
              value={editingStrength}
              onChangeText={setEditingStrength}
              placeholder="Strength"
            />
            <TextInput
              style={[styles.input, { fontSize: 16 }]}
              keyboardType="numeric"
              value={editingAgility}
              onChangeText={setEditingAgility}
              placeholder="Agility"
            />
            <Pressable onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => handleEdit(item.id, item.title, item.value, item.stats)} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => handleRemove(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Remove</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
      {editingId !== item.id && (
        <View>
          <Text style={styles.value}>{item.value}</Text>
          {item.stats && (
            <Text style={styles.stats}>
              Strength: {item.stats.strength} Agility: {item.stats.agility}
            </Text>
          )}
        </View>
      )}
      {item.canAddMore && !editingId && (
        <Pressable onPress={() => handleAdd(item.id)} style={styles.addButton}>
          <Text style={styles.buttonText}>+ Add data</Text>
        </Pressable>
      )}
    </Pressable>
  );

  return (
    <ImageBackground
      source={{ uri: '../../../assets/mimico_background.png' }} // Замените на правильный путь
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.header}>Ficha de personaje {currentCharacter?.title || ''}</Text>
          <DraggableFlatList
            data={localData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => setLocalData(data)}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: height * 0.8,
    width: '100%',
  },
  list: {
    paddingVertical: 20,
  },
  card: {
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  active: {
    backgroundColor: 'rgba(215, 63, 63, 0.9)',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(215, 63, 63, 1)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'rgba(215, 63, 63, 1)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#7a1820', // Цвет заголовка
  },
});
