import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";

import { Picker } from "@react-native-picker/picker";

import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/Index";
import FormImagePicker from "../../components/forms/FormImagePicker";
import uploadImage from "../../config/uploadImage";
import { auth, firestore } from "../../../firebase";
import color from "../../config/color";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("name"),
  description: Yup.string().min(10).label("Description"),
  images: Yup.array().min(1, "please select atleast 1 image"),
  bio: Yup.string().required().min(5).max(25).label("Bio"),
  registrationNumber: Yup.string()
    .required()
    .min(5)
    .label("Registration Number"),
  contact: Yup.string().required().min(11).label("Contact"),
});

function RegisterDoctor({ navigation, route }) {
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedSpeciality, setSelectedSpeciality] = useState("diabetes");
  const userId = route.params.id;
  console.log("user id----------" + userId);

  const handleSubmit = async (values) => {
    console.log(values);
    const downloadURLs = [];

    const doctorRef = collection(firestore, "doctors");
    const doctorQuery = await getDocs(
      query(doctorRef, where("userId", "==", auth.currentUser.uid))
    );
    if (!doctorQuery.empty) {
      Alert.alert("Doctor already registered");
      navigation.goBack();
      return;
    }

    for (let i = 0; i < values.images.length; i++) {
      const uploadUri = values.images[i];
      let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const extension = fileName.split(".").pop();
      const name = fileName.split(".").slice(0, -1).join(".");
      fileName = name + Date.now() + "." + extension;

      try {
        const downloadURL = await uploadImage(
          uploadUri,
          fileName,
          "doctorImages/"
        );
        downloadURLs.push(downloadURL);
        downloadURL;
      } catch (e) {
        console.error("Error uploading image: ", e);
        // Handle error if image upload fails
      }
    }
    if (downloadURLs.length === 0) {
      Alert.alert("No images uploaded");
      return;
    }

    // Use the downloadURLs array as needed, e.g., store them in Firestore

    try {
      const collectionRef = collection(firestore, "doctors");
      const docRef = await addDoc(collectionRef, {
        profileImage: downloadURLs[0],
        name: values.name,
        bio: values.bio,
        registrationNumber: values.registrationNumber,
        contact: values.contact,
        description: values.description,
        createdAt: new Date(),
        userId: userId,
        gender: selectedGender,
        speciality: selectedSpeciality,
        rating: 4.5,
      });
      Alert.alert("Doctor registered successfully");
      navigation.goBack();
      return;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <AppForm
          initialValues={{
            name: "",
            bio: "",
            registrationNumber: "",
            contact: "",
            description: "",
            images: [],
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          <Text>Upload Your Doctor Image</Text>
          <View style={{ alignSelf: "center" }}>
            <FormImagePicker name={"images"} single />
          </View>
          <AppFormField
            maxLength={255}
            name={"name"}
            placeholder="Name"
            icon="card-text"
          />
          <AppFormField
            name="description"
            multiline
            numberOfLines={3}
            placeholder="Description"
            icon="format-text"
          />
          <AppFormField
            name="bio"
            multiline
            numberOfLines={3}
            placeholder="Tell us about yourself"
            icon="format-text"
          />

          <AppFormField
            name="registrationNumber"
            placeholder="Enter Your Registration Number"
            icon="format-text"
          />
          <AppFormField
            name="contact"
            placeholder="Enter Your Contact Number"
            icon="format-text"
            type="number"
          />

          <Text style={styles.label}>Select Your Gender:</Text>
          <Picker
            selectedValue={selectedGender}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <Picker
            selectedValue={selectedSpeciality}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSpeciality(itemValue)}
          >
            <Picker.Item label="Diabetes" value="diabetes" />
            <Picker.Item label="HyperTension" value="hypertension" />
          </Picker>

          <SubmitButton title="post" />
        </AppForm>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: color.light,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 16,
  },
  locationModal: {
    backgroundColor: "white",
    padding: 20,
    margin: "auto",
    borderRadius: 10,
    maxHeight: 1000,
    minHeight: 300,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  modalContainer: {
    top: 5,
    left: 10,
    position: "absolute",
    width: "100%",
  },
  modalInput: {
    borderColor: color.olive,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
});

export default RegisterDoctor;
