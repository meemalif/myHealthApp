import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";

import colors from "../config/color";
import ListItems from "./ListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButtons from "./AppButton";
import color from "../config/color";
const screenWidth = Dimensions.get("window").width;

function Card({
  Title,
  Subtitle,
  imageUrl,
  onPress,
  date,
  profile,
  profileTitle,
  profileSub,
  old,
  style,
  listPress,
  category,
}) {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.placeholder}>
          {profile && profileTitle && (
            <ListItems
              image={profile}
              title={profileTitle}
              subtitle={profileSub}
              onPress={listPress}
            />
          )}
          <View>
            <Image source={{ uri: imageUrl }} style={styles.appimage} />

            <View style={styles.date}>
              <Text style={{ color: "gray" }}>{date?.split(" ")[0]}</Text>
              <Text
                style={{
                  color: color.secondary,
                  fontWeight: "900",
                  fontSize: 23,
                  fontFamily: "Roboto",
                }}
              >
                {date?.split(" ")[2]}
              </Text>
              <Text style={{ color: color.primary, fontWeight: "bold" }}>
                {date?.split(" ")[1]}
              </Text>
            </View>
          </View>
          <View style={styles.textPlaceholder}>
            <Text style={styles.title}> {Title} </Text>

            <Text style={styles.subtitle}>
              {Subtitle.substring(0, 90) + "..."}
            </Text>
          </View>
          <Text style={styles.category}>{category}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  placeholder: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    flexWrap: "wrap",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 22,
  },
  venuebox: {
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  category: {
    color: colors.royalPink,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
  },

  buttons: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  button: {
    width: 110,
    height: 40,
    marginHorizontal: 5,
    marginBottom: 7,
    borderRadius: 10,
    padding: 2,
  },
  ButtonText: {
    fontSize: 14,
    fontWeight: "300",
  },
  subtitle: {
    color: "gray",
    marginTop: 10,
  },
  appimage: {
    width: "100%",
    height: 210,
  },
  textPlaceholder: {
    padding: 10,
  },
  paid: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: color.sapphhire,
    padding: 5,
    opacity: 0.95,
    borderRadius: 10,
  },
  date: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "white",
    padding: 5,
    opacity: 0.95,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default Card;
