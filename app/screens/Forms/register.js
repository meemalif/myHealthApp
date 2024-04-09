import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  View,
  Image,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import { auth, firestore } from "../../../firebase";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/Index";
import color from "../../config/color";
import AnimatedLottieView from "lottie-react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  fullname: Yup.string().required().label("fullname"),
  birthyear: Yup.number().required().label("birthyear"),
});

function RegisterScreen({ navigation }) {
  const [uid, setUid] = useState("");

  const handleRegister = async (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        sendEmailVerification(user)
          .then(() => {
            Alert.alert(
              "Verification Email sent",
              "Make sure to check your spam mails"
            );
          })
          .catch((error) => {
            alert("Error sending verification email: ", error);
          });

        const collectionRef = collection(firestore, "users");
        ("collection made");
        const docRef = await addDoc(collectionRef, {
          name: values.fullname,
          email: values.email,
          cms: values.cms,
          department: values.schools.label,
          batch: values.batch,
          userID: user.uid,
        });
        // ("Document written with ID: ", docRef.id);
        Alert.alert("Congrats", "You have been registered to Societal");
        navigation.navigate("Login");
      })
      .catch((error) => alert(error));
    return;
  };

  return (
    <ScrollView style={styles.container}>
      <AnimatedLottieView
        source={require("../../assets/onboarding/screen2.json")}
        autoPlay={true}
        loop={true}
      />
      <Image
        style={styles.logo}
        source={require("../../assets/onboarding/screen2.png")}
      />
      <AppForm
        initialValues={{
          email: "",
          password: "",
          fullname: "",
          birthyear: "",
        }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          icon={"account"}
          autoCapitalize="none"
          autoCorrect={false}
          name={"fullname"}
          placeholder="Full Name"
        />
        <AppFormField
          icon={"email"}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name={"email"}
          placeholder="Email"
        />
        <AppFormField
          icon={"lock"}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="Password"
          name={"password"}
        />
        <AppFormField
          icon={"calendar-check"}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          placeholder="Year of Birth ie 2000"
          name={"birthyear"}
        />
        <View style={{ marginTop: 15 }}>
          <SubmitButton title={"register"} />
        </View>
      </AppForm>
      <Text style={styles.text}>
        Already registered
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textC}> click here </Text>
        </TouchableWithoutFeedback>
        to Login
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  textC: {
    color: "skyblue",
  },
  text: {
    paddingTop: 20,
    paddingLeft: 10,
  },
  containerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: color.light,
    borderRadius: 10,
  },
  logo: {
    alignSelf: "center",
    marginTop: -20,
    width: 300,
    height: 300,
  },
});

export default RegisterScreen;
