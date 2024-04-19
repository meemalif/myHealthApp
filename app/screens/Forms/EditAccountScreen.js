import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      if (values.DOB) {
        updatedFields.DOB = values.DOB;
      }

      // Add more fields as needed

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(docRef, updatedFields);
      }

      navigation.navigate("Account");
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
          fbLink: "",
          instaLink: "",
          linkedInLink: "",
          profilePicture: [],
          societyMade: [],
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <FormImagePicker name={"profilePicture"} single />
        <Text style={styles.logo}>select your profile picture</Text>
        <AppFormField
          maxLength={255}
          name={"nickName"}
          placeholder="Nick Name"
          icon="account"
        />

        <AppFormField
          name="bio"
          multiline
          numberOfLines={3}
          maxLength={255}
          placeholder="Write a brief bio"
          icon="format-text"
        />

        <TimePicker
          name="DOB"
          placeholder="Date of Birth"
          icon="calendar"
          mode="date"
        />

        <SubmitButton title="Done" />
      </AppForm>
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
    marginTop: 20,
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
