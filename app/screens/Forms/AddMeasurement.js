import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import color from "../../config/color";

const AddMeasurement = () => {
  const [selectedTest, setSelectedTest] = useState("bloodPressure");
  const [bloodPressure, setBloodPressure] = useState({
    systolic: "",
    diastolic: "",
  });
  const [bloodSugar, setBloodSugar] = useState("");

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
        onPress={() => console.log(bloodPressure, bloodSugar)}
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
