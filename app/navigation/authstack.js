import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Forms/login";
import RegisterScreen from "../screens/Forms/register";
import TabNavigation from "./tabnavigation";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import EditAccountScreen from "../screens/Forms/EditAccountScreen";
import AddMeasurement from "../screens/Forms/AddMeasurement";
import AddMedicationMeasurement from "../screens/Forms/AddMedicationMeasurement";
import AddBlog from "../screens/Forms/addBlog";

const AppStack = createNativeStackNavigator();

export default function AuthStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch === true ? (
          <AppStack.Screen name="Onboarding" component={OnBoardingScreen} />
        ) : (
          <AppStack.Screen name="login" component={Login} />
        )}
        <AppStack.Screen name="Register" component={RegisterScreen} />
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="AddMeasurement" component={AddMeasurement} />
        <AppStack.Screen
          name="AddMedicationMeasurement"
          component={AddMedicationMeasurement}
        />
        <AppStack.Screen name="TabNavigation" component={TabNavigation} />
        <AppStack.Screen
          name="EditAccountScreen"
          component={EditAccountScreen}
        />
        <AppStack.Screen name="addBlog" component={AddBlog} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
