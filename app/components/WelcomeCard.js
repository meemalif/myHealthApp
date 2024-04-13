import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Avatar } from "react-native-elements";

const WelcomeCard = ({ userName }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={{ width: "60%" }}>
          <Text style={styles.welcomeText}>Welcome {userName}!</Text>
          <Text style={styles.subtitle}>
            Step into Your Personal Health Hub – Where Your Wellness Journey
            Begins with Ease and Insight.
          </Text>
        </View>
        <Avatar
          size="xlarge"
          source={require("../assets/public/doctor.png")} // replace with your avatar image path
          //   containerStyle={styles.avatar}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#F7F7F7", // set your desired color
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    flexWrap: "wrap",
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default WelcomeCard;
