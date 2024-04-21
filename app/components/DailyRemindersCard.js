import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // or any other icon set
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, firestore } from "../../firebase";

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

const DailyReminderCard = ({ navigation }) => {
  const [medication, setMedication] = useState([]);
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      // Fetch data here
      const uid = auth.currentUser?.uid;

      const q = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Assuming 'userID' is unique and only one doc will be returned
          console.log(userDoc.id);
          const measurementRef = collection(
            firestore,
            "users",
            userDoc.id,
            "medicationMeasurement"
          );
          const docRef = await getDocs(measurementRef);
          console.log(docRef.docs[0]);
          const data = docRef.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMedication(data);
          console.log(data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.header}>Medication</Text>
      {medication?.map((data) => (
        <TaskItem
          key={data.id}
          iconName={data.type === "tab" ? "pill" : "injection"}
          color="#1E90FF"
          title={data.medicationName}
          reminder={data.dosage + " - " + data.frequency}
        />
      ))}

      <Button
        icon={"plus-circle"}
        mode="outlined"
        onPress={() => {
          navigation();
        }}
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
