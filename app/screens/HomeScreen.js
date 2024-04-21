import {
  StyleSheet,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { Button } from "react-native-paper";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

import WelcomeCard from "../components/WelcomeCard";
import MeasurementCard from "../components/MeasurementCard";
import DailyTasksCard from "../components/DailyTaskCard";
import { auth, firestore } from "../../firebase";

export default function HomeScreen({ navigation }) {
  const [bloodPressure, setBloodPressure] = useState([0, 0]);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const uid = auth.currentUser?.uid; // Use optional chaining in case currentUser is null
    setLoading(true);
    const q = query(collection(firestore, "users"), where("userID", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Assuming 'userID' is unique and only one doc will be returned
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
        const bloodPressureQuery = query(
          bloodPressureRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const bloodSugarQuery = query(
          bloodSugarRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const bloodPressureSnapshot = await getDocs(bloodPressureQuery);
        const bloodSugarSnapshot = await getDocs(bloodSugarQuery);
        if (!bloodPressureSnapshot.empty) {
          const bloodPressureDoc = bloodPressureSnapshot.docs[0];
          setBloodPressure([
            bloodPressureDoc.data().systolic,
            bloodPressureDoc.data().diastolic,
          ]);
        }
        if (!bloodSugarSnapshot.empty) {
          const bloodSugarDoc = bloodSugarSnapshot.docs[0];
          setBloodSugar(bloodSugarDoc.data().bloodSugar);
        }

        console.log(userDoc.id);
        setLoading(false);
      } else {
        // Handle the case where no documents are found
        console.log("No documents found");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching user document:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => fetchData()} />
      }
    >
      <WelcomeCard userName={"Muneeb"} />
      <Text h4 style={{ marginHorizontal: 20 }}>
        My Measurements
      </Text>
      <MeasurementCard
        title="Blood Pressure"
        measurement={bloodPressure.join("/")}
        unit="mmHg"
        status="Normal"
      />
      <MeasurementCard
        title="Blood Sugar/Diabetes"
        measurement={bloodSugar}
        unit="mg/dL"
        status="High"
      />
      <Button
        icon={"plus-circle"}
        mode="outlined"
        onPress={() => navigation.navigate("AddMeasurement")}
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
