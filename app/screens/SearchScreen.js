import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Searchbar, SegmentedButtons } from "react-native-paper";
import color from "../config/color";
import DoctorCard from "../components/DoctorCard";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState("diabetes");

  const doctor = [
    {
      name: "Dr. Usman",
      value: "diabetes",
      avatar: {
        uri: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg",
      }, // Replace with actual path
      specialty: "Endocrinologist, Diabetes Specialist",
      description:
        "Dr. Usman is a highly respected endocrinologist who specializes in the diagnosis, treatment, and management of diabetes. As a diabetes doctor, he works with patients to develop personalized treatment plans that take into account each individual’s unique needs and circumstances.",
    },
    {
      name: "Dr. Fajar",
      value: "hypertension",
      avatar: {
        uri: "https://img.freepik.com/premium-vector/flat-vector-illustration-woman-doctor_678069-78.jpg",
      },
      specialty: "Hypertensio Specialist",
      description:
        "Dr. Fajar is a highly respected endocrinologist who specializes in the diagnosis, treatment, and management of Hypertension. As a diabetes doctor, he works with patients to develop personalized treatment plans that take into account each individual’s unique needs and circumstances.",
    },
    {
      name: "Dr. Ayesha",
      value: "diabetes",
      avatar: {
        uri: "https://img.freepik.com/premium-vector/muslim-female-doctor-vector-illustration_844724-1500.jpg",
      },
      specialty: "Endocrinologist, Diabetes Specialist",
      description:
        "Dr. Ayesha is a highly respected endocrinologist who specializes in the diagnosis, treatment, and management of diabetes. As a diabetes doctor, she works with patients to develop personalized treatment plans that take into account each individual’s unique needs and circumstances.",
    },
    {
      name: "Dr. Ali",
      value: "hypertension",
      avatar: {
        uri: "https://static.vecteezy.com/system/resources/previews/014/637/274/original/male-doctor-carrying-a-stethoscope-while-crossing-his-arms-vector.jpg",
      },
      specialty: "Hypertension Specialist",
      description:
        "Dr. Ali is a highly respected endocrinologist who specializes in the diagnosis, treatment, and management of Hypertension. As a diabetes doctor, he works with patients to develop personalized treatment plans that take into account each individual’s unique needs and circumstances.",
    },
  ];

  const selectedDoctor = doctor.filter((doc) => doc.value === value);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "diabetes",
              label: "Diabetes",
              icon: "needle",
              checkedColor: color.primary,
            },
            {
              value: "hypertension",
              label: "Hypertension",
              icon: "heart-pulse",
              checkedColor: color.secondary,
            },
          ]}
        />
      </SafeAreaView>
      {selectedDoctor.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 20,
  },
});
