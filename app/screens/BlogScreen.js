import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { FAB, Text, Portal, PaperProvider } from "react-native-paper";
import color from "../config/color";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
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
      // console.log("checking doctor" + doctor.id);
    };
    // Fetch blogs from Firestore
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(firestore, "blogs");
        const blogQuery = await getDocs(blogsRef);
        // console.log("checking blogs" + blogQuery.docs[0].data().title);
        const blogs = await Promise.all(
          blogQuery.docs.map(async (docu) => {
            const doctorId = docu.data()?.doctorId;
            if (!doctorId) {
              console.log("Doctor ID missing for blog:", docu.id);
              return null; // Early return if there's no doctor ID
            }

            // Correcting the document reference for fetching doctor details
            const doctorRef = doc(firestore, "doctors", doctorId);
            const doctorSnapshot = await getDoc(doctorRef);
            if (!doctorSnapshot.exists()) {
              console.log("No matching documents for doctor ID:", doctorId);
              return null;
            }
            const doctor = {
              ...doctorSnapshot.data(),
              id: doctorSnapshot.id,
            };
            // console.log("checking doctor" + doctor.id);
            return {
              id: docu.id,
              ...docu.data(),
              doctor: doctor,
            };
          })
        );

        // Filter out any null entries if the doctor wasn't found
        const filteredBlogs = blogs.filter((blog) => blog !== null);

        // console.log("checking blogs: ", filteredBlogs);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchDoctor();
    fetchBlogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ color: color.lincolnGreen, fontWeight: "bold", margin: 10 }}
      >
        Blogs and Articles
      </Text>
      <ScrollView>
        {blogs.map((blog, index) => (
          <Card
            key={index}
            Subtitle={blog.description}
            Title={blog.title}
            category={"self help"}
            date={blog.createdAt.toDate().toDateString()}
            imageUrl={blog.imageURL[0]}
            onPress={() => {
              console.log("ummm checking");
              navigation.navigate("BlogDetail", { id: blog.id });
            }}
            profile={
              blog.doctor.profileImage
                ? blog.doctor.profileImage
                : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            }
            profileSub={blog.doctor.speciality}
            profileTitle={blog.doctor.name}
            listPress={() => {
              console.log("list pressed");
              navigation.navigate("DoctorProfile", {
                doctorID: blog.doctor.id,
              });
            }}
          />
        ))}
      </ScrollView>
      {doctor.id && (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("addBlog", { doctorID: doctor.id });
            console.log("doctor id", doctor.id);
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
        </TouchableWithoutFeedback>
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
