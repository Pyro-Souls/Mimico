import React, { useEffect } from "react";
import { View, FlatList, Pressable, Text, Alert } from "react-native";
import { router } from "expo-router";
import useStore from "../../../providers/store";
import { addCharacter } from "../../../services/User.service";
import { CharacterData } from "../../../common/types/CharacterData";
import { GlobalSheet } from "../../../core/ui/GlobalSheet";
import {
  Typography,
  Button,
  Input,
  Radio,
  Checkbox,
} from "../../../core/ui/atoms";
import { ContainerUI } from "../../../core/ui/organisms/Container";

type CharacterCardProps = {
  characterData: CharacterData;
  onPress: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterData,
  onPress,
}) => (
  <Pressable style={GlobalSheet.card} onPress={onPress}>
    <Typography size="h5" text={characterData.nombre || "Unnamed Character"} />
  </Pressable>
);

type AddNewCardProps = {
  onPress: () => void;
};

const AddNewCard: React.FC<AddNewCardProps> = ({ onPress }) => (
  <Pressable style={GlobalSheet.addCard} onPress={onPress}>
    <Text style={GlobalSheet.addText}>+</Text>
  </Pressable>
);

const Tab: React.FC = () => {
  const { data, setCurrentCharacter, loadUserCharacters, user } = useStore();

  useEffect(() => {
    if (user.uid) {
      loadUserCharacters();
    }
  }, [user]);

  const handleAddNewCard = async () => {
    if (user?.uid) {
      if (data.length >= 3) {
        Alert.alert(
          "¡Uh, oh! ¡El Campamento se está llenando!",
          "Vamos a desbloquear uno más grande"
        );
        return;
      }

      const newCharacter: CharacterData = {
        id: String(data.length + 1),
        title: `New Character ${data.length + 1}`,
        userId: user.uid,
        nombre: "Nombre",
        competencias: [],
        imageUri: "",
      };
      try {
        await addCharacter(user.uid, newCharacter);
        loadUserCharacters();
        setCurrentCharacter(newCharacter);
        router.push("home/(tabs)/ficha");
      } catch (error) {
        console.error("Error adding new character:", error);
        alert("Failed to add new character");
      }
    }
  };

  return (
    <ContainerUI>
      <FlatList
        data={[...data, { id: "add" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === "add") {
            return <AddNewCard onPress={handleAddNewCard} />;
          } else {
            const character = item as CharacterData;
            return (
              <CharacterCard
                characterData={character}
                onPress={() => {
                  setCurrentCharacter(character);
                  router.push("home/(tabs)/ficha");
                }}
              />
            );
          }
        }}
        contentContainerStyle={GlobalSheet.list}
        ListHeaderComponent={() => (
          <View>
            <Typography size="h4" text={`Tus fichas (${data.length})`} />
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Typography
              size="sm"
              text={`Current user logged in: ${user.email} ${user.username}`}
            />
            <Typography
              size="sm"
              text={`Current mimicoins: ${user.mimicoins}`}
            />

            <Button title="Button Test" onPress={() => {}} />
            <Button title="Button Test" variant="outline" onPress={() => {}} />
            <Button title="Button Test" variant="text" onPress={() => {}} />
            <Button title="Button Test" variant="dashed" onPress={() => {}} />
            <Button title="Button Test" onPress={() => {}} icon="add" />

            <Input placeholder="Escriba algo..." label="Usuario" />
            <Input isArea placeholder="Escriba algo..." label="Comentarios" />

            <Radio
              options={[
                { label: "Peru", value: 1 },
                { label: "Colombia", value: 2 },
                { label: "Argentina", value: 3 },
              ]}
            />

            <Checkbox
              options={[
                { label: "Lechuga", value: 1 },
                { label: "Tomate", value: 2 },
                { label: "Queso", value: 3 },
              ]}
            />
          </View>
        )}
      />
    </ContainerUI>
  );
};

export default Tab;
