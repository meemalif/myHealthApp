import React from "react";
import { StyleSheet, Text } from "react-native";

function ErrorMessage({ errors, visible }) {
  if (!visible || !errors) return null;
  return <Text style={styles.error}>{errors}</Text>;
}
const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
