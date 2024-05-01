import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import RenderHtml from "react-native-render-html";

import AppButtons from "../components/AppButton";
import Card from "../components/Card";
import ListItems from "../components/ListItem";
import colors from "../config/color";
import { firestore } from "../../firebase";

const screenWidth = Dimensions.get("window").width;

const BlogDetail = ({ route, navigation }) => {
  const blogId = route.params.id;
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(firestore, "blogs", blogId); // Simplified document reference
        const blogSnapshot = await getDoc(blogRef);
        if (!blogSnapshot.exists()) {
          console.log("No such document!");
          return;
        }
        const blogData = blogSnapshot.data();
        const doctorId = blogData.doctorId;

        const doctorRef = doc(firestore, "doctors", doctorId); // Simplified document reference
        const doctorSnapshot = await getDoc(doctorRef);
        if (!doctorSnapshot.exists()) {
          console.log("Doctor document not found!");
          return;
        }

        setBlog({
          id: blogSnapshot.id,
          data: blogData,
          doctor: {
            ...doctorSnapshot.data(),
            id: doctorSnapshot.id,
          },
        });
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [blogId]); // Fetch blog details when the blog ID changes

  return (
    <ScrollView style={styles.container}>
      <Carousel
        data={blog.data?.imageURL}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout="default"
        renderItem={({ item }) => (
          <>
            <Image style={styles.image} source={{ uri: item }} />
          </>
        )}
      />
      <View style={styles.societyContainer}>
        <ListItems
          onPress={() =>
            navigation.navigate("DoctorProfile", {
              doctorID: blog.doctor.id,
            })
          }
          image={blog.doctor?.profileImage || "https://picsum.photos/200"}
          title={blog.doctor?.name || "Doctor Name"}
          subtitle={blog.doctor?.speciality || "Speciality"}
        />
      </View>

      <Text style={styles.title}>{blog.data?.title}</Text>
      <Text style={styles.subtitle}>{blog.data?.description}</Text>
      <RenderHtml
        contentWidth={screenWidth}
        source={{ html: blog.data?.content }}
      />
    </ScrollView>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  subtitle: {
    color: colors.wenge,
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    fontWeight: "500",
  },
  societyContainer: {
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    width: 110,
    height: 40,
    marginHorizontal: 5,
    marginBottom: 7,
    borderRadius: 10,
    padding: 2,
  },
  ButtonText: {
    fontSize: 14,
    fontWeight: "300",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    marginLeft: 8,
    fontSize: 16,
  },
  eventCard: {
    width: screenWidth * 0.8,
    paddingHorizontal: 10,
  },
});
