import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar, SegmentedButtons } from "react-native-paper";
import color from "../config/color";
import DoctorCard from "../components/DoctorCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState("diabetes");
  const [doctors, setDoctors] = useState([]);
  const [filterDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    // Function to filter users based on the search query
    const filterData = () => {
      if (searchQuery.length > 0) {
        const filteredData = doctors.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.speciality.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filteredData);
      }
    };
    filterData();
  }, [searchQuery]);

  useEffect(() => {
    // Fetch doctors from Firestore
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(firestore, "doctors");
        const querySnapshot = await getDocs(doctorsRef); // await the async call to getDocs

        const doctors = querySnapshot.docs.map((doc) => ({
          // Process the query snapshot
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctors);
        setFilteredDoctors(doctors);
      } catch (error) {
        // Handle any errors during the fetch here
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const selectedDoctor = filterDoctors.filter(
    (doc) => doc.speciality === value
  );

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
