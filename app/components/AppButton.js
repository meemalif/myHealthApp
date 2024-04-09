import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../config/color";

function AppButtons({ title, style, TStyle, onPress, Color = "primary" }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            Color == "primary" ? colors.primary : colors.secondary,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, TStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 70,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 23,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default AppButtons;
