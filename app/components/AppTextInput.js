import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/color";
import defaultStyles from "../config/styles";
import { Button } from "react-native-paper";

function AppTextInput({ icon, right, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={"gray"}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
      {right && (
        <Button mode="outlined" onPress={right}>
          Add location
        </Button>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 18,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInput;
