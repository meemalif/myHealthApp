import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { Card, colors } from "react-native-elements";

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

const data = [
  {
    title: "MONDAY",
    data: [
      {
        meal: "Breakfast",
        description: "steel cut oats with walnuts and fresh berries",
      },
      { meal: "Lunch", description: "salmon salad with cannellini beans" },
      {
        meal: "Dinner",
        description:
          "roasted chicken thighs with potatoes and scallions with herb vinaigrette and mixed greens",
      },
    ],
  },
  {
    title: "TUESDAY",
    data: [
      {
        meal: "Breakfast",
        description: "steel cut oats with walnuts and fresh berries",
      },
      { meal: "Lunch", description: "salmon salad with cannellini beans" },
      {
        meal: "Dinner",
        description:
          "roasted chicken thighs with potatoes and scallions with herb vinaigrette and mixed greens",
      },
    ],
  },
  {
    title: "WEDNESDAY",
    data: [
      {
        meal: "Breakfast",
        description: "steel cut oats with walnuts and fresh berries",
      },
      { meal: "Lunch", description: "salmon salad with cannellini beans" },
      {
        meal: "Dinner",
        description:
          "roasted chicken thighs with potatoes and scallions with herb vinaigrette and mixed greens",
      },
    ],
  },
  {
    title: "THURSDAY",
    data: [
      {
        meal: "Breakfast",
        description: "steel cut oats with walnuts and fresh berries",
      },
      { meal: "Lunch", description: "salmon salad with cannellini beans" },
      {
        meal: "Dinner",
        description:
          "roasted chicken thighs with potatoes and scallions with herb vinaigrette and mixed greens",
      },
    ],
  },
  {
    title: "FRIDAY",
    data: [
      {
        meal: "Breakfast",
        description: "steel cut oats with walnuts and fresh berries",
      },
      { meal: "Lunch", description: "salmon salad with cannellini beans" },
      {
        meal: "Dinner",
        description:
          "roasted chicken thighs with potatoes and scallions with herb vinaigrette and mixed greens",
      },
    ],
  },
  // ... Add other days
];

const DietPlanCard = () => {
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
