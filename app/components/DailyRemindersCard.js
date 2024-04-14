import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // or any other icon set

// A single task item component
const TaskItem = ({ iconName, color, title, reminder }) => (
  <View style={styles.taskItem}>
    <Icon name={iconName} size={30} color={color} />
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.taskProgress}>{title}</Text>
      <Text>{reminder}</Text>
    </View>
  </View>
);

const DailyReminderCard = () => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.header}>Medication</Text>

      <TaskItem
        iconName="pill"
        color="#1E90FF"
        title="Insulin"
        reminder="5ml-Through Injection"
      />
      <TaskItem
        iconName="heart-pulse"
        color="#FF4500"
        title="Vitamin C"
        reminder="3 drops - 1 time per day"
      />
      <TaskItem
        iconName="heart"
        color="#FF69B4"
        title="Aspirin"
        reminder="1 pill - Daily"
      />
      <Button
        icon={"plus-circle"}
        mode="outlined"
        onPress={() => alert("Add Measurement")}
        theme={{ colors: { primary: "#00aaff" } }}
        style={styles.taskItemButton}
      >
        Add Measurement
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    // shadow and elevation props can be adjusted to match the design
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  header: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  taskItemButton: {
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  taskGoalItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  taskProgress: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyReminderCard;
