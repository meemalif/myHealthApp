import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../config/color";
import Card from "../components/Card";
import {
  query,
  collection,
  where,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { firestore } from "../../firebase";
import { Divider } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const DoctorProfile = ({ navigation, route }) => {
  const doctorId = route.params.doctorID;
  const [doctor, setDoctor] = useState({});
  const [blogs, setBlogs] = useState([{}]);
  //   console.log("----------" + doctorId);

  const fetchBlogs = async (doctorId) => {
    const blogsRef = collection(firestore, "blogs");

    const querySnapshot = await getDocs(
      query(blogsRef, where("doctorId", "==", doctorId))
    );
    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    console.log("checking blogs-----" + blogs[0].data?.title);
    setBlogs(blogs);
  };

  useEffect(() => {
    // Fetch doctor details from Firestore
    const fetchDoctor = async () => {
      const doctorRef = collection(firestore, "doctors");
      const doctorDoc = doc(doctorRef, doctorId);
      const doctorSnapshot = await getDoc(doctorDoc);
      if (!doctorSnapshot.exists()) {
        console.log("No such document!");
        return;
      }
      const doctor = {
        ...doctorSnapshot.data(),
        id: doctorSnapshot.id,
      };
      setDoctor(doctor);
      fetchBlogs(doctorId);
    };

    fetchDoctor();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: doctor.profileImage
                ? doctor.profileImage
                : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.societyFullName}>{doctor.name}</Text>
        <Text style={styles.societyName}>{doctor.speciality}</Text>
        <Text style={styles.societyName}>{doctor.description}</Text>

        {(doctor.contact || doctor.rating) && (
          <View style={styles.socialMediaContainer}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {doctor.contact && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `whatsapp://send?phone=${
                        doctor.contact
                      }&text=${"hi, I came from TheHealthApp"}`
                    )
                  }
                  style={styles.socialMediaIcon}
                >
                  <MaterialCommunityIcons
                    name="whatsapp"
                    size={32}
                    color={color.skyblue}
                  />
                </TouchableOpacity>
              )}
              <Divider
                horizontalInset={true}
                style={{ height: 20, width: 2 }}
                bold={true}
              />
              {doctor.rating && (
                <View style={styles.ratingContainer}>
                  {/* Icons for ratings could be repeated based on the rating value */}
                  <Icon name="star" size={15} color="#FFD700" />
                  <Icon name="star" size={15} color="#FFD700" />
                  <Icon name="star" size={15} color="#FFD700" />
                  <Icon name="star-half-empty" size={15} color="#FFD700" />
                  <Icon name="star-o" size={15} color="#FFD700" />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          alignSelf: "center",
        }}
      >
        Articles by {doctor.name}
      </Text>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <Card
              // onPress={() => navigation.navigate("EventDetails", item)}
              style={styles.eventCard}
              Title={item.data?.title}
              Subtitle={item.data?.description || "Description Loading"}
              imageUrl={item.data?.imageURL[0]}
              date={item.data?.createdAt?.toDate().toDateString()}
              // time={startTime + "-" + endTime}
              category={"self help"}
              old
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: color.lavender,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
  },
  imageContainer: {
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  societyFullName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  societyName: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  societyMade: {
    fontSize: 14,
    color: color.light,
    marginBottom: 5,
  },
  eventCard: {
    width: screenWidth * 0.8,
    paddingHorizontal: 10,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: -30,
    padding: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    shadowOpacity: 0.8,
  },
  socialMediaIcon: {
    marginHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
