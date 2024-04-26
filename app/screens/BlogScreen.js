import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { FAB, Text, Portal, PaperProvider } from "react-native-paper";
import color from "../config/color";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BlogScreen({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const uid = auth.currentUser.uid;
    setUserId(uid);
    const fetchDoctor = async () => {
      const doctorRef = collection(firestore, "doctors");
      const doctorQuery = query(doctorRef, where("userId", "==", uid));
      const doctorSnapshot = await getDocs(doctorQuery);
      if (doctorSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const doctor = {
        ...doctorSnapshot.docs[0].data(),
        id: doctorSnapshot.docs[0].id,
      };

      setDoctor(doctor);
      console.log("checking doctor" + doctor.id);
    };
    // Fetch blogs from Firestore
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(firestore, "blogs");
        const blogQuery = await getDocs(blogsRef);
        const blogs = blogQuery.docs.map(async (doc) => {
          //getting doctor from doctor collection using doctor id
          const doctorRef = collection(firestore, "doctors");
          const doctorQuery = query(
            doctorRef,
            where("userId", "==", doc.data().doctorId)
          );
          const doctorSnapshot = await getDocs(doctorQuery);
        });

        console.log(blogs);
        setBlogs(blogs);
      } catch (error) {
        // Handle any errors during the fetch here
        console.error("Error fetching blogs:", error);
      }
    };
    fetchDoctor();
    fetchBlogs();
  }, []);
  const blogsa = [
    {
      Title: "Life is beautiful as it is.",
      Subtitle: "Never take life for granted. Life is beautiful as it is.",
      category: "Self help",
      date: new Date().toDateString(),
      imageUrl:
        "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      profile:
        "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      profileTitle: "Dr. John Doe",
      profileSub: "Neurologist",
    },
    {
      Title: "Life is beautiful as it is.",
      Subtitle: "Never take life for granted. Life is beautiful as it is.",
      category: "Self help",
      date: new Date().toDateString(),
      imageUrl:
        "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      profile:
        "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      profileTitle: "Dr. John Doe",
      profileSub: "Neurologist",
    },
  ];

  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ color: color.lincolnGreen, fontWeight: "bold", margin: 10 }}
      >
        Blogs and Articles
      </Text>
      <ScrollView>
        {blogsa.map((blog, index) => (
          <Card
            key={index}
            Subtitle={blog.Subtitle}
            Title={blog.Title}
            category={blog.category}
            date={blog.date}
            imageUrl={blog.imageUrl}
            onPress={() => console.log("ummm checking")}
            profile={blog.profile}
            profileSub={blog.profileSub}
            profileTitle={blog.profileTitle}
            listPress={() => console.log("list pressed")}
          />
        ))}
      </ScrollView>
      {doctor.id && (
        <TouchableHighlight
          onPress={() => {
            console.log("doctor id", doctor.id);
            navigation.navigate("addBlog", { doctorID: doctor.id });
          }}
        >
          <View style={styles.fab}>
            <MaterialCommunityIcons
              name="plus"
              color={"white"}
              size={50}
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            />
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: "#e5eaf5",
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: color.primary,
  },
});
