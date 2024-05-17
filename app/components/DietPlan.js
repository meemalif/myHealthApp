import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { Card, colors } from "react-native-elements";
import { diabetesMealPlan, hypertensionMealPlan } from "../config/meal-plan";
import { auth, firestore } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const MealCard = ({ meal, description }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.meal}>{meal}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const DayMealCard = ({ title, data }) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {data.map((item, index) => (
          <MealCard
            key={index}
            meal={item.meal}
            description={item.description}
          />
        ))}
      </View>
    </View>
  );
};

const DietPlanCard = () => {
  const [diagnose, setDiagnose] = useState("Diabetes");
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
          setDiagnose(userDoc.data().diagnose);
          console.log(userDoc.id);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
  const data =
    diagnose === "Diabetes" ? diabetesMealPlan : hypertensionMealPlan;
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.cardTitle}>Diet Plan</Text>
      {data.map((day, index) => (
        <DayMealCard key={index} title={day.title} data={day.data} />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2E8B57",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#E0E0E0",
    color: "#2E8B57",
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  itemContainer: {
    borderColor: colors.grey3,
    borderWidth: 1,
    width: "30%",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 2,
  },
  meal: {
    paddingHorizontal: 10,
    backgroundColor: "#2E8B57",
    width: "100%",
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  description: {
    fontSize: 10,
    marginLeft: 10,
    padding: 5,
    color: "#666",
  },
});

export default DietPlanCard;
