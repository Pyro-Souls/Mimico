import React, { useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useStore from '../../../providers/store';
import { addCharacter } from '../../../services/User.service';
import { Characters } from '../../../common/types/Characters';
import { GlobalSheet } from "../../../core/ui";
import { Typography } from "../../../core/ui/atoms";
import { Container } from "../../../core/ui/organisms";

type CharacterCardProps = {
  characters: Characters;
  onPress: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ characters, onPress }) => (
  <Pressable style={GlobalSheet.card} onPress={onPress}>
    <Typography size="h5" text={characters.title} />
    <Typography size="md" text={characters.subtitle} />
    <Typography size="sm" text={`Strength: ${characters.stats.strength}`} />
    <Typography size="sm" text={`Agility: ${characters.stats.agility}`} />
  </Pressable>
);

type AddNewCardProps = {
  onPress: () => void;
};

const AddNewCard: React.FC<AddNewCardProps> = ({ onPress }) => (
  <Pressable style={GlobalSheet.addCard} onPress={onPress}>
    <Typography size="h2" text="+" />
  </Pressable>
);

const Tab: React.FC = () => {
  const { data, setCurrentCharacter, loadUserCharacters, user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (user.uid) {
      loadUserCharacters();
    }
  }, [user]);

  const handleAddNewCard = async () => {
    if (user?.uid) {
      const newCharacter: Characters = {
        id: String(data.length + 1),
        title: `New Character ${data.length + 1}`,
        subtitle: 'New Subtitle',
        stats: { strength: 0, agility: 0 },
        userId: user.uid,
      };
      try {
        await addCharacter(user.uid, newCharacter);
        loadUserCharacters();
        setCurrentCharacter(newCharacter);
        router.push('/ficha');
      } catch (error) {
        console.error('Error adding new character:', error);
        alert('Failed to add new character');
      }
    }
  };

  return (
    <Container>
      <View style={GlobalSheet.ViewContent}>
        <Typography size="h4" text="Tus fichas" />
        <FlatList
          data={[...data, { id: 'add' }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.id === 'add') {
              return <AddNewCard onPress={handleAddNewCard} />;
            } else {
              const character = item as Characters;
              return (
                <CharacterCard
                  characters={character}
                  onPress={() => {
                    setCurrentCharacter(character);
                    router.push('/ficha');
                  }}
                />
              );
            }
          }}
          contentContainerStyle={GlobalSheet.list}
        />
      </View>
    </Container>
  );
};

export default Tab;
