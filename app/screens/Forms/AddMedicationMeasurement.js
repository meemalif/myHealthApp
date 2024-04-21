import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";

import color from "../../config/color";
import { auth, firestore } from "../../../firebase";

const AddMedicationMeasurement = ({ navigation }) => {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedTest, setSelectedTest] = useState("tab");

  const handleSubmit = async () => {
    if (!medicationName || !dosage || !frequency) {
      alert("Please fill all the fields");
      return;
    }
    const uid = auth.currentUser?.uid;

    console.log(medicationName, dosage, frequency);
    const q = query(collection(firestore, "users"), where("userID", "==", uid));

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
        const docRef = await addDoc(measurementRef, {
          medicationName,
          dosage,
          frequency,
          type: selectedTest,
          createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Medication Measurement added successfully");
        navigation.goBack();
      } else {
        // Handle the case where no documents are found
        console.log("No documents found");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching user document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Medication Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setMedicationName(value)}
          value={medicationName}
          placeholder="i.e; Aspirin, insulin etc"
        />
        <Text style={styles.label}>Dosage: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setDosage(value)}
          value={dosage}
          placeholder="i.e; 5ml, 1 pill etc"
        />
        <Text style={styles.label}>Frequency:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setFrequency(value)}
          value={frequency}
          placeholder="i.e:; 2 Times a day, 3 times a day etc"
        />
        <Text style={styles.label}>Type of Medicine:</Text>

        <Picker
          selectedValue={selectedTest}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTest(itemValue)}
        >
          <Picker.Item label="Tablet" value="tab" />
          <Picker.Item label="Injection" value="Injection" />
          <Picker.Item label="Syrup" value="syrup" />
        </Picker>
      </View>

      <Button
        mode="elevated"
        buttonColor={color.primary}
        textColor="white"
        onPress={() => handleSubmit()}
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

export default AddMedicationMeasurement;
