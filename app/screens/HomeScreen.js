import { StyleSheet, ScrollView, StatusBar } from "react-native";
import React from "react";
import { Text } from "react-native-elements";
import { Button } from "react-native-paper";

import WelcomeCard from "../components/WelcomeCard";
import MeasurementCard from "../components/MeasurementCard";
import DailyTasksCard from "../components/DailyTaskCard";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <WelcomeCard userName={"Muneeb"} />
      <Text h4 style={{ marginHorizontal: 20 }}>
        My Measurements
      </Text>
      <MeasurementCard
        title="Blood Pressure"
        measurement="116/77"
        unit="mmHg"
        status="Normal"
      />
      <MeasurementCard
        title="Blood Sugar/Diabetes"
        measurement="225"
        unit="mg/dL"
        status="High"
      />
      <Button
        icon={"plus-circle"}
        mode="outlined"
        onPress={() => alert("Add Measurement")}
        theme={{ colors: { primary: "#00aaff" } }}
        style={{ marginHorizontal: 20 }}
      >
        Add Measurement
      </Button>
      <DailyTasksCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});
