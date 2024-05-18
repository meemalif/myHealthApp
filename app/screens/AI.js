import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { Picker } from "@react-native-picker/picker";

const MyComponent = () => {
  const [model, setModel] = useState(null);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    smokingHistory: "",
    bmi: "",
    hba1cLevel: "",
    bloodGlucoseLevel: "",
  });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      console.log("loading model");
      await tf.ready(); // Ensure TensorFlow.js is ready

      console.log("kjsf");
      const loadedModel = await tf.loadLayersModel(
        require("../assets/tfjs_model/model.json")
      );
      console.log("Model loaded", loadedModel.summary());
      setModel(loadedModel);
      console.log("Model loaded");
    };
    loadModel();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("checking", model);
    if (formData.bloodGlucoseLevel > 180) {
      setPrediction(0.75);
    }
    if (model) {
      const inputData = tf.tensor2d([
        [
          encodeGender(formData.gender),
          parseFloat(formData.age),
          encodeSmokingHistory(formData.smokingHistory),
          parseFloat(formData.bmi),
          parseFloat(formData.hba1cLevel),
          parseFloat(formData.bloodGlucoseLevel),
        ],
      ]);
      const results = model.predict(inputData);
      const prediction = results.dataSync()[0];
      setPrediction(prediction);
      console.log("Prediction: ", prediction);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI-based Diabetes Prediction</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleChange("gender", itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleChange("age", text)}
          placeholder="Age"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Smoking History</Text>
        <Picker
          selectedValue={formData.smokingHistory}
          onValueChange={(itemValue) =>
            handleChange("smokingHistory", itemValue)
          }
        >
          <Picker.Item label="Select Status" value="" />
          <Picker.Item label="Never" value="Never" />
          <Picker.Item label="Current" value="Current" />
          <Picker.Item label="Former" value="Former" />
          <Picker.Item label="Not Current" value="Not Current" />
          <Picker.Item label="No Info" value="No Info" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>BMI</Text>
        <TextInput
          style={styles.input}
          value={formData.bmi}
          onChangeText={(text) => handleChange("bmi", text)}
          placeholder="BMI"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>HbA1c Level</Text>
        <TextInput
          style={styles.input}
          value={formData.hba1cLevel}
          onChangeText={(text) => handleChange("hba1cLevel", text)}
          placeholder="HbA1c Level"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Blood Glucose Level</Text>
        <TextInput
          style={styles.input}
          value={formData.bloodGlucoseLevel}
          onChangeText={(text) => handleChange("bloodGlucoseLevel", text)}
          placeholder="Blood Glucose Level"
          keyboardType="numeric"
        />
      </View>
      <Button title="Predict" onPress={handleSubmit} />
      {prediction !== null && (
        <Text style={styles.prediction}>
          Prediction: {prediction > 0.5 ? "Positive" : "Negative"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    height: 40,
    fontSize: 16,
  },
  prediction: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

function encodeGender(gender) {
  return gender === "Male" ? 1 : 0;
}

function encodeSmokingHistory(history) {
  switch (history) {
    case "Never":
      return 0;
    case "Current":
      return 1;
    case "No Info":
      return 2;
    case "Former":
      return 3;
    case "Not Current":
      return 4;
    default:
      return 2;
  }
}

export default MyComponent;
