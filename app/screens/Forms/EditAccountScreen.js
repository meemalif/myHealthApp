import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import { Text as TextPaper, Button } from "react-native-paper";

import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/Index";
import FormImagePicker from "../../components/forms/FormImagePicker";

import { auth, firestore } from "../../../firebase";
import color from "../../config/color";
import TimePicker from "../../components/forms/TimePicker";
import uploadImage from "../../config/uploadImage";

function EditAccountScreen({ navigation, route }) {
  const userID = route.params;
  const uid = auth.currentUser.uid;

  const handleSubmit = async (values) => {
    if (values.profilePicture && values.profilePicture.length > 0) {
      var uploadUri = values.profilePicture[0];
      var fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const extension = fileName.split(".").pop();
      const name = fileName.split(".").slice(0, -1).join(".");
      fileName = name + Date.now() + "." + extension;
    }

    try {
      const downloadURL =
        values.profilePicture.length > 0
          ? await uploadImage(uploadUri, fileName, "userProfileImages/")
          : null;

      const docRef = doc(firestore, "users", userID);

      // Update the document with new fields
      const updatedFields = {};

      if (downloadURL) {
        updatedFields.profile = downloadURL;
      }
      if (values.bio) {
        updatedFields.bio = values.bio;
      }
      if (values.birthyear) {
        updatedFields.birthyear = values.birthyear;
      }
      if (values.blood) {
        updatedFields.blood = values.blood;
      }
      if (values.diagnose) {
        updatedFields.diagnose = values.diagnose;
      }
      if (values.stage) {
        updatedFields.stage = values.stage;
      }
      if (values.weight) {
        updatedFields.weight = values.weight;
      }

      // Add more fields as needed

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(docRef, updatedFields);
      }

      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async () => {
    try {
      await firestore.collection("users").doc(userID).delete();
      let user = auth.currentUser;
      user.delete().then(() => {
        console.log("User deleted");
      });
      navigation.navigate("Login");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{
          nickName: "",
          bio: "",
          birthyear: "",
          blood: "",
          diagnose: "",
          stage: "",
          weight: "",
          profilePicture: [],
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Text style={styles.logo}>select your profile picture</Text>
        <View style={{ alignSelf: "center" }}>
          <FormImagePicker name={"profilePicture"} single />
        </View>

        <AppFormField
          name="bio"
          multiline
          numberOfLines={3}
          maxLength={255}
          placeholder="Write a brief bio"
          icon="format-text"
        />
        <AppFormField
          name="blood"
          maxLength={4}
          placeholder="Enter your Blood Group"
          icon="blood"
        />
        <AppFormField
          name="diagnose"
          placeholder="Are you diagnosed with anything? i.e Diabetes etc"
          icon="blood"
        />
        <AppFormField
          name="stage"
          placeholder="Stage of your diagnosis"
          icon="blood"
        />
        <AppFormField
          name="weight"
          placeholder="Enter your weight in kgs"
          icon="blood"
        />

        <TimePicker
          name="birthyear"
          placeholder="Date of Birth"
          icon="calendar"
          mode="date"
        />

        <SubmitButton title="Done" />
      </AppForm>
      <Button
        mode="contained"
        style={{ margin: 10, padding: 5 }}
        onPress={() => navigation.navigate("RegisterDoctor", { id: uid })}
      >
        Register as a Doctor
      </Button>
      <Button
        mode="outlined"
        style={{
          margin: 10,
          marginHorizontal: 90,
          borderColor: color.primary,
        }}
        onPress={() => handleDelete()}
      >
        Delete account
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: StatusBar.currentHeight + 25,
  },
  logo: {
    color: color.royalPink,
  },
  containerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: color.light,
    borderRadius: 10,
  },
});

export default EditAccountScreen;
