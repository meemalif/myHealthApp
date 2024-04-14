import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import DailyTasksCard from "../components/DailyTaskCard";
import DailyReminderCard from "../components/DailyRemindersCard";
import DailyExerciseCard from "../components/DailyExerciseCard";
import DietPlanCard from "../components/DietPlan";

export default function ReminderScreen() {
  return (
    <ScrollView style={styles.container}>
      <DailyReminderCard />
      <DailyExerciseCard />
      <DietPlanCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
