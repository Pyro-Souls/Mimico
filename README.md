# Mimico
Mimico App 
1. CharacterSheet Component
This component displays detailed information about the selected character and allows editing of their data. Here’s how it works:

Importing and Using Libraries:


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, ImageBackground, ScrollView } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useStore } from '../../../providers/store';


Getting Screen Dimensions:

const { width, height } = Dimensions.get('window');
This allows you to get the device screen size to adapt the component’s style to different screen sizes.

Defining Interfaces:


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

interface Character {
  id: string;
  title: string;
  subtitle: string;
  stats: {
    strength: number;
    agility: number;
  };
}
Interfaces define the structure of the data your component will work with. Item is used for list items, and Character describes a character.

Function convertCharacterToItem:


const convertCharacterToItem = (character: Character): Item => ({
  id: character.id,
  title: character.title,
  value: '',
  canAddMore: true,
  stats: character.stats,
});
This function converts a Character object to an Item object so it can be used in your list.

CharacterSheet Component:


export default function CharacterSheet() {
  const { currentCharacter, data, setData } = useStore();
  const initialData = currentCharacter ? [convertCharacterToItem(currentCharacter)] : [];
  const [localData, setLocalData] = useState<Item[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingValue, setEditingValue] = useState<string>('');
  const [editingStrength, setEditingStrength] = useState<string>('');
  const [editingAgility, setEditingAgility] = useState<string>('');

  useEffect(() => {
    if (currentCharacter) {
      setLocalData([convertCharacterToItem(currentCharacter)]);
    }
  }, [currentCharacter]);
useStore Hook: Used to get the currently selected character and data.
States:

localData: Local data for display in the component.
editingId, editingTitle, editingValue, editingStrength, editingAgility: States for storing editable data.
useEffect Hook: Updates localData if a new character is selected.

Action Handlers:


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
handleEdit: Sets the data you want to edit.
handleSave: Saves changes to the data and updates the global state.
handleRemove: Removes an item from the data.
handleAdd: Adds a new item to the data.
renderItem Function:

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
This function determines how each list item will look. If the item is being edited, it shows text fields and a save button. If not, it shows only the item’s data and edit/remove buttons. Additionally, a button for adding new data is provided.

Rendering the Component:


return (
  <ImageBackground
    source={{ uri: '../../../assets/mimico_background.png' }} // Replace with the correct path
    style={styles.backgroundImage}
  >
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Character Sheet {currentCharacter?.title || ''}</Text>
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
ImageBackground: Sets the background image.
ScrollView: Allows scrolling of content.
DraggableFlatList: Allows dragging list items to change their order.
Styles:


const styles = StyleSheet.create({
  backgroundImage: { ... },
  scrollView: { ... },
  container: { ... },
  list: { ... },
  card: { ... },
  active: { ... },
  titleContainer: { ... },
  title: { ... },
  input: { ... },
  buttonContainer: { ... },
  button: { ... },
  buttonText: { ... },
  addButton: { ... },
  value: { ... },
  stats: { ... },
  header: { ... },
});
Styles define the appearance of the components.

2. Tab Component
This component displays a list of character cards and allows selecting characters for editing.

Importing and Using Libraries:


import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import { useStore } from '../../../providers/store';
import { useRouter } from 'expo-router';
You import the necessary libraries and functions.

CharacterCard Component:


const CharacterCard = ({ title, subtitle, stats, onPress }) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.stats}>Strength: {stats.strength}</Text>
    <Text style={styles.stats}>Agility: {stats.agility}</Text>
  </Pressable>
);
This component displays a character card. When pressed, it calls the onPress function.

AddNewCard Component:

const AddNewCard = () => (
  <View style={styles.addCard}>
    <Text style={styles.plus}>+</Text>
  </View>
);
This component displays a button for adding a new character.

Tab Component:


export default function Tab() {
  const { data, setCurrentCharacter } = useStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Sheets</Text>
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
                  router.push('./characterSheet');
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
FlatList: Displays the list of characters.
renderItem: Determines how each item is displayed. If the item’s id is 'add', it shows a button for adding a new character. Otherwise, it displays a character card.
onPress: Sets the current character and navigates to the editing screen.
Styles:


const styles = StyleSheet.create({
  container: { ... },
  list: { ... },
  header: { ... },
  card: { ... },
  title: { ... },
  subtitle: { ... },
  stats: { ... },
  addCard: { ... },
  plus: { ... },
});
Styles define the appearance of the components.

3. Store (Global State)
This is the global state used to store character data and the currently selected character.

Importing and Defining Interfaces:

import { create } from 'zustand';

interface Character {
  id: string;
  title: string;
  subtitle: string;
  stats: {
    strength: number;
    agility: number;
  };
}

interface AppState {
  data: Character[];
  setData: (data: Character[]) => void;
  currentCharacter: Character | null;
  setCurrentCharacter: (character: Character | null) => void;
}
Interfaces define the state structure and functions for updating it.

Creating the Store:


export const useStore = create<AppState>((set) => ({
  data: [
    { id: '1', title: 'Mascarpone Toblerone', subtitle: 'Holy Knight', stats: { strength: 10, agility: 8 } },
    { id: '2', title: 'Elna Vajazo', subtitle: 'Assassin', stats: { strength: 6, agility: 6 } },
    { id: '3', title: 'Nano the Brother', subtitle: 'Corrupt Cleric', stats: { strength: 7, agility: 9 } },
    { id: '4', title: 'Sister Mon', subtitle: 'Butcher Nun', stats: { strength: 6, agility: 6 } },
    { id: 'add', title: '', subtitle: '', stats: { strength: 0, agility: 0 } },
  ],
  setData: (data) => set({ data }),
  currentCharacter: null,
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
}));
data: Array of characters, including a special element for adding new characters.
setData: Function to update the data.
currentCharacter: The currently selected character.
setCurrentCharacter: Function to set the current character.
