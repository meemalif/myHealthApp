import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/Index";
import FormImagePicker from "../../components/forms/FormImagePicker";
import uploadImage from "../../config/uploadImage";
import { firestore } from "../../../firebase";
import color from "../../config/color";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).label("Title"),
  description: Yup.string().min(10).label("Description"),
  images: Yup.array().min(1, "please select atleast 1 image"),
});

function AddBlog({ navigation, route }) {
  const [content, setContent] = useState("");
  const richText = React.useRef();
  const doctorId = route.params.doctorID;
  console.log("----------" + doctorId);

  const handleSubmit = async (values) => {
    console.log(values);
    const downloadURLs = [];

    for (let i = 0; i < values.images.length; i++) {
      const uploadUri = values.images[i];
      let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const extension = fileName.split(".").pop();
      const name = fileName.split(".").slice(0, -1).join(".");
      fileName = name + Date.now() + "." + extension;

      try {
        const downloadURL = await uploadImage(uploadUri, fileName, "blogs/");
        downloadURLs.push(downloadURL);
        downloadURL;
      } catch (e) {
        console.error("Error uploading image: ", e);
        // Handle error if image upload fails
      }
    }

    // Use the downloadURLs array as needed, e.g., store them in Firestore

    try {
      const collectionRef = collection(firestore, "blogs");
      ("collection made");
      navigation.goBack();
      const docRef = await addDoc(collectionRef, {
        imageURL: downloadURLs,
        title: values.title,
        description: values.description,
        createdAt: new Date(),
        content: content,
        doctorId: doctorId,
      });
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
            title: "",
            description: "",
            images: [],
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          <Text>
            It would be great if you select Blog Images in 706 width * 392
            height
          </Text>
          <FormImagePicker name={"images"} />
          <AppFormField
            maxLength={255}
            name={"title"}
            placeholder="Title"
            icon="card-text"
          />
          <AppFormField
            name="description"
            multiline
            numberOfLines={3}
            // maxLength={255}
            placeholder="Description"
            icon="format-text"
          />
          <SafeAreaView>
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, marginVertical: 20 }}
              >
                <Text>Content:</Text>
                <RichToolbar
                  editor={richText}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                    actions.insertLink,
                    actions.alignCenter,
                    actions.alignLeft,
                    actions.alignRight,
                    actions.foreColor,
                    actions.fontSize,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                  ]}
                  iconMap={{ [actions.heading1]: handleHead }}
                />
                <RichEditor
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "gray",
                    height: 200,
                  }}
                  ref={richText}
                  onChange={(descriptionText) => {
                    setContent(descriptionText);
                    console.log("descriptionText:", descriptionText);
                  }}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </SafeAreaView>

          <SubmitButton title="post" />
        </AppForm>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 100,
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
});

export default AddBlog;
