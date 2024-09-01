import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from "../core/ui/atoms";
import * as ImagePicker from "expo-image-picker";

interface ImageSectionProps {
  imageUri: string | undefined;
  pickImage: () => Promise<void>;
  deleteImage: () => Promise<void>;
  deletingImage: boolean;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  imageUri,
  pickImage,
  deleteImage,
  deletingImage,
}) => {
  const handleImagePress = () => {
    if (imageUri) {
      Alert.alert(
        "Изображение",
        "Выберите действие",
        [
          {
            text: "Editar imagen",
            onPress: pickImage,
          },
          {
            text: "Eliminar imagen",
            onPress: confirmDelete,
            style: "destructive",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      pickImage();
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirmar",
      "Вы точно хотите удалить изображение?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteImage(),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.imageSection}>
      {imageUri ? (
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <Button title="¡Sube tu imagen!" onPress={pickImage} variant="dashed" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
  },
});

export default ImageSection;
