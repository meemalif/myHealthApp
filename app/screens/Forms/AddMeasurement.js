import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import {
  collection,
  addDoc,
  query,
  where,
  doc,
  getDocs,
} from "firebase/firestore";

import color from "../../config/color";
import { auth, firestore } from "../../../firebase";

const AddMeasurement = ({ navigation }) => {
  const [selectedTest, setSelectedTest] = useState("bloodPressure");
  const [bloodPressure, setBloodPressure] = useState({
    systolic: 0,
    diastolic: 0,
  });
  const [bloodSugar, setBloodSugar] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const uid = auth.currentUser?.uid; // Use optional chaining in case currentUser is null
    if (!uid) return; // If there's no user, don't attempt to fetch data

    const fetchData = async () => {
      const q = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Assuming 'userID' is unique and only one doc will be returned
          setUserId(userDoc.id);
          console.log(userDoc.id);
        } else {
          // Handle the case where no documents are found
          console.log("No documents found");
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching user document:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (selectedTest) => {
    if (selectedTest === "bloodPressure") {
      console.log(bloodPressure);
      if (bloodPressure.systolic == 0 || bloodPressure.diastolic == 0) {
        alert("Please enter both systolic and diastolic values");
        return;
      }
      const collectionRef = collection(
        firestore,
        "users",
        userId,
        "bloodPressure"
      );
      addDoc(collectionRef, {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
        createdAt: new Date(),
      });
      navigation.goBack();
    } else {
      if (bloodSugar === "") {
        alert("Please enter blood sugar value");
        return;
      }
      console.log(bloodSugar);
      const collectionRef = collection(
        firestore,
        "users",
        userId,
        "bloodSugar"
      );
      addDoc(collectionRef, {
        bloodSugar: bloodSugar,
        createdAt: new Date(),
      });
      Alert.alert("Congrats", "Measurement added successfully");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Test Type:</Text>
      <Picker
        selectedValue={selectedTest}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedTest(itemValue)}
      >
        <Picker.Item label="Blood Pressure" value="bloodPressure" />
        <Picker.Item label="Blood Sugar" value="bloodSugar" />
      </Picker>

      {selectedTest === "bloodPressure" ? (
        <View>
          <Text style={styles.label}>Blood Pressure (mmHg):</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setBloodPressure({ ...bloodPressure, systolic: value })
            }
            value={bloodPressure.systolic}
            placeholder="Systolic"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setBloodPressure({ ...bloodPressure, diastolic: value })
            }
            value={bloodPressure.diastolic}
            placeholder="Diastolic"
            keyboardType="numeric"
          />
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Blood Sugar (mg/dL):</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBloodSugar}
            value={bloodSugar}
            placeholder="Blood Sugar"
            keyboardType="numeric"
          />
        </View>
      )}
      <Button
        mode="elevated"
        buttonColor={color.primary}
        textColor="white"
        onPress={() => handleSubmit(selectedTest)}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
});

export default AddMeasurement;
