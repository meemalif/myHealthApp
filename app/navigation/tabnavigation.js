import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ReminderScreen from "../screens/ReminderScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BlogScreen from "../screens/BlogScreen";
import HomeScreen from "../screens/HomeScreen";
import AIModel from "../screens/AI";
import color from "../config/color";

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: color.royalPink,
      tabBarInactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="magnify" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Reminder"
      component={ReminderScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="bell-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Blog"
      component={BlogScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="newspaper" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="AI"
      component={AIModel}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="robot-happy"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="account-circle"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

function TabNavigation(props) {
  return <TabNavigator />;
}

export default TabNavigation;

{
  /* <Tab.Screen
  name="Add"
  component={ListingEditScreen}
  options={({ navigation }) => ({
    tabBarButton: () => (
      <NewListing onPress={() => navigation.navigate("Add")} />
    ),
    tabBarIcon: ({ size, color }) => (
      <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
    ),
  })}
/>; */
}
