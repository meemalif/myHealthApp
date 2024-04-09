import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  Button,
  Modal,
  TextInput,
  Text as TextPaper,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";

import { auth } from "../../../firebase";
// import Screen from "../../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/Index";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});
function LoginScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserState = () => {
      AsyncStorage.getItem("userLoggedIn")
        .then((loggedIn) => {
          if (loggedIn === "true") {
            setLoading(true);
            // User is already logged in, retrieve email and password from AsyncStorage
            AsyncStorage.multiGet(["email", "password"])
              .then((values) => {
                const email = values[0][1];
                const password = values[1][1];
                signInWithEmailAndPassword(auth, email, password)
                  .then((userCredentials) => {
                    const user = userCredentials.user;
                    user.email;
                    navigation.navigate("DrawerNavigation");
                  })
                  .catch((error) => alert(error));
              })
              .catch((error) => alert(error));
          }
          if (loggedIn !== "true") {
            setLoading(false);
          }
        })
        .catch((error) => alert(error));
    };
    fetchUserState();
    // setLoading(false);
  }, []);
  const handleForget = async () => {
    ("forgetting password");
    email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "reset password mail have been sent.",
          "Check your Email. make sure to check your spam mail"
        );
        setIsModalVisible(false);
      })
      .catch((error) => {
        Alert.prompt(error);
        setIsModalVisible(false);
      });
  };

  const handleSignIn = (values) => {
    const email = values.email;
    const password = values.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        if (user.emailVerified) {
          user.email;

          // Save the user's login status, email, and password in AsyncStorage
          AsyncStorage.multiSet([
            ["userLoggedIn", "true"],
            ["email", email],
            ["password", password],
            ["uid", user.uid],
          ])
            .then(() => {
              navigation.navigate("TabNavigation");
            })
            .catch((error) => alert(error));
        } else {
          Alert.alert("make sure to verify your email.");
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/onboarding/screen1.png")}
      />
      <ActivityIndicator animating={loading} color={MD2Colors.red800} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSignIn(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          icon={"email"}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name={"email"}
          placeholder="Email"
          onChangeText={(val) => val}
        />
        <AppFormField
          icon={"lock"}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="password"
          name={"password"}
        />

        <View style={{ marginTop: 15 }}>
          <SubmitButton title={"Login"} />
        </View>
      </AppForm>
      <TextPaper
        variant="labelMedium"
        style={{ color: "red", marginVertical: 20 }}
        onPress={() => setIsModalVisible(true)}
      >
        Forget Password?
      </TextPaper>
      <Text style={styles.text}>
        New to our app?{" "}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.textC}> click here </Text>
        </TouchableWithoutFeedback>
        to register now.
      </Text>

      <Modal
        dismissable={true}
        style={styles.modalContainer}
        onDismiss={() => setIsModalVisible(false)}
        visible={isModalVisible}
      >
        <View>
          <TextPaper>Enter your Email</TextPaper>
          <TextInput
            placeholder="email"
            inputMode="email"
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Button onPress={() => handleForget()} mode="contained">
              Forget
            </Button>
            <Button onPress={() => setIsModalVisible(false)} mode="outlined">
              cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    margin: 30,
    width: 200,
    height: 200,
  },
  container: {
    paddingHorizontal: 20,
  },
  textC: {
    color: "skyblue",
  },
  text: {
    paddingTop: 20,
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    marginVertical: 300,
    marginTop: 100,
    alignSelf: "center",
    height: "100%",
    width: "100%",
    maxHeight: 400,
    maxWidth: 500,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
export default LoginScreen;
