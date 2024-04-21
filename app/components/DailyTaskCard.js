import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { auth, firestore } from "../../firebase";

// A single task item component
const TaskItem = ({ iconName, color, title, progress }) => (
  <View style={styles.taskItem}>
    <Icon name={iconName} size={30} color={color} />
    <Text style={styles.taskText}>{title}</Text>
    <Text style={styles.taskProgress}>{progress}</Text>
  </View>
);

const TaskGoals = ({ iconName, color, title, progress }) => (
  <View style={styles.taskGoalItem}>
    <Icon name={iconName} size={30} color={color} />

    <Text style={styles.taskProgress}>{progress}</Text>
    <Text style={{}}>{title}</Text>
  </View>
);

const DailyTasksCard = () => {
  const [todaysBloodPressureReadings, setTodaysBloodPressureReadings] =
    useState([]);
  const [todaysBloodSugarReadings, setTodaysBloodSugarReadings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const uid = auth.currentUser.uid;
      const userQuery = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userID = userDoc.id;
      console.log(userID);
      const bloodPressureRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodPressure"
      );
      const bloodSugarRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodSugar"
      );

      const q = query(bloodPressureRef, where("timestamp", ">=", startOfToday));

      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data());
        const readings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodaysBloodPressureReadings(readings);
      } catch (error) {
        console.error("Error fetching today's blood pressure readings:", error);
      }

      const bloodSugarQuery = query(
        bloodSugarRef,
        where("timestamp", ">=", startOfToday)
      );

      try {
        const querySnapshot = await getDocs(bloodSugarQuery);
        const readings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodaysBloodSugarReadings(readings);
      } catch (error) {
        console.error("Error fetching today's blood sugar readings:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.header}>Daily Tasks</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <TaskGoals
          iconName="trophy"
          color="#FFD700"
          title="Completion Rate"
          progress="85%"
        />
        <TaskGoals
          iconName="test-tube"
          color="#FF6347"
          title="Measurements"
          progress={`${
            todaysBloodPressureReadings.length + todaysBloodSugarReadings.length
          }`}
        />
      </View>
      <TaskItem
        iconName="pill"
        color="#1E90FF"
        title="Losartan"
        progress="1/2 Intakes"
      />
      <TaskItem
        iconName="heart-pulse"
        color="#FF4500"
        title="Blood Pressure"
        progress={`${todaysBloodPressureReadings.length}/2 measurements`}
      />
      <TaskItem
        iconName="heart"
        color="#FF69B4"
        title="Blood Sugar"
        progress={`${todaysBloodSugarReadings.length}/2 measurements`}
      />
      <TaskItem
        iconName="food-apple"
        color="#228B22"
        title="Meal"
        progress="866/1200 calories"
      />
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

export default DailyTasksCard;
