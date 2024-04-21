import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const MeasurementCard = ({ title, measurement, unit }) => {
  let status = "Normal";
  if (title === "Blood Pressure") {
    const [systolic, diastolic] = measurement.split("/");
    if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      status = "Elevated";
    } else if (systolic >= 130 && systolic <= 139) {
      status = "High";
    } else if (systolic >= 140 || diastolic >= 90) {
      status = "VHigh";
    }
  } else if (title === "Blood Sugar/Diabetes") {
    if (measurement < 70) {
      status = "Low";
    } else if (measurement >= 70 && measurement <= 99) {
      status = "Normal";
    } else if (measurement >= 100 && measurement <= 125) {
      status = "Elevated";
    } else if (measurement >= 126 && measurement <= 180) {
      status = "High";
    } else {
      status = "VHigh";
    }
  }

  // determine the status color based on the measurement status
  const statusColor = {
    Low: "#2E8B57", // green-ish
    Normal: "#308AFF", // blue
    Elevated: "#FFD700", // yellow
    High: "#FFA500", // orange
    VHigh: "#FF4500", // red
  }[status];

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Icon name="question-circle" size={20} color="#C0C0C0" />
      </View>
      <View style={styles.measurementContainer}>
        <Text style={styles.measurement}>{measurement}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <View style={[styles.statusIndicator, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF", // white background
  },
  cardTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  measurementContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  measurement: {
    fontSize: 36,
    fontWeight: "bold",
    marginRight: 5,
  },
  unit: {
    fontSize: 18,
  },
  statusIndicator: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MeasurementCard;
