import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function ListItems({ image, title, IconComponent, subtitle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.appimage} source={{ uri: image }} />}
        <View style={styles.apptext}>
          <Text style={styles.main}>{title}</Text>
          {subtitle && <Text style={styles.sub}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignContent: "center",
  },
  appimage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  delete: {
    position: "absolute",
    right: 15,
    top: 20,
    padding: 10,
  },
  main: {
    fontFamily: "Roboto" || null,
    fontSize: 22,
  },
  sub: {
    color: "gray",
  },
  apptext: {
    marginLeft: 15,
    justifyContent: "center",
  },
});

export default ListItems;
