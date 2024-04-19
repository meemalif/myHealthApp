import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/color";

function ImageInput({ imageUri, onChange }) {
  const requestPermission = async () => {
    const result = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (result.granted) {
      alert("you need to enable camera permission");
    }
  };

  useEffect(() => {
    requestPermission();
  }, [1]);

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("delete", "are you sure you want to delete it", [
        { text: "yes", onPress: () => onChange(null) },
        {
          text: "no",
        },
      ]);
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) {
        onChange(result.assets[0].uri);
      }
    } catch (error) {
      "error occured", error;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            color="gray"
            size={40}
            style={styles.icon}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
