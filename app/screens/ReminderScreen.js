import { StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import DailyReminderCard from "../components/DailyRemindersCard";
import DailyExerciseCard from "../components/DailyExerciseCard";
import DietPlanCard from "../components/DietPlan";

export default function ReminderScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <DailyReminderCard
        navigation={() => navigation.navigate("AddMedicationMeasurement")}
      />
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
