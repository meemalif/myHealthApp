import React from "react";
import { StyleSheet, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

function OnBoardingScreen({ navigation }) {
  return (
    <Onboarding
      onDone={() => navigation.navigate("Login")}
      onSkip={() => navigation.replace("Login")}
      imageContainerStyles={styles.container}
      bottomBarHeight={80}
      subTitleStyles={styles.subtitle}
      pages={[
        {
          backgroundColor: "#51e2f5",
          image: (
            <Image
              style={styles.image}
              source={require("../assets/onboarding/screen1.png")}
            />
          ),
          title: "Empowering You Through Diet",
          subtitle:
            " Manage your specific health condition with \n personalized meal plans and real-time monitoring.",
        },
        {
          backgroundColor: "#ffa8B6",
          image: (
            <Image
              style={styles.image}
              source={require("../assets/onboarding/screen2.png")}
            />
          ),
          title: "Track Your Progress \n Gain Insights",
          subtitle:
            "Log your meals, monitor your intake, and receive personalized guidance based on your goals.",
        },
        {
          backgroundColor: "#a28089",
          image: (
            <Image
              style={styles.image}
              source={require("../assets/onboarding/screen3.png")}
            />
          ),
          title: "Your Journey, \n Not Alone",
          subtitle:
            "Connect with a community of peers and access educational resources to support your health journey.",
        },
      ]}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  image: {
    width: 340,
    resizeMode: "contain",
  },
  subtitle: {
    paddingBottom: 80,
  },
});

export default OnBoardingScreen;
