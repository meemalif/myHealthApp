import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // or any other icon set

const TaskGoals = ({ iconName, color, title, progress }) => (
  <View style={styles.taskGoalItem}>
    <Icon
      style={{ alignSelf: "center" }}
      name={iconName}
      size={30}
      color={color}
    />

    <Text style={styles.taskProgress}>{title}</Text>
    <Text style={{ alignSelf: "center" }}>{progress}</Text>
  </View>
);

const exercises = [
  {
    iconName: "run",
    color: "#1E90FF",
    title: "Running",
    progress: "30 mins",
  },
  {
    iconName: "weight-lifter",
    color: "#FF4500",
    title: "Weight Lifting",
    progress: "20 mins",
  },
  {
    iconName: "bike",
    color: "#FF69B4",
    title: "Cycling",
    progress: "15 mins",
  },
  {
    iconName: "yoga",
    color: "#FF6347",
    title: "Yoga",
    progress: "10 mins",
  },
];

const DailyExerciseCard = () => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.header}>Daily Exercise</Text>

      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 30,
        }}
      >
        {exercises.map((exercise, index) => (
          <TaskGoals
            key={index}
            color={exercise.color}
            iconName={exercise.iconName}
            progress={exercise.progress}
            title={exercise.title}
          />
        ))}
      </View>
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
  taskGoalItem: {
    width: "40%",
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
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyExerciseCard;
