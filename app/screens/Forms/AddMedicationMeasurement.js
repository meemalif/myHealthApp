import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import color from "../../config/color";

const AddMedicationMeasurement = () => {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");

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
      </View>

      <View>
        <Text style={styles.label}>Frequency:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setFrequency(value)}
          value={frequency}
          placeholder="i.e:; 2 Times a day, 3 times a day etc"
        />
      </View>

      <Button
        mode="elevated"
        buttonColor={color.primary}
        textColor="white"
        onPress={() => console.log(medicationName, dosage, frequency)}
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
