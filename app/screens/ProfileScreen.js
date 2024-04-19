import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

import { firestore, auth } from "../../firebase";
import color from "../config/color";

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.multiSet([
        ["userLoggedIn", ""],
        ["email", ""],
        ["password", ""],
      ]);
      navigation.navigate("Login");
    } catch (error) {
      alert(error);
    }
  };
  async function fetchData() {
    setLoading(true);
    const uid = auth.currentUser.uid;

    const userQuery = query(
      collection(firestore, "users"),
      where("userID", "==", uid)
    );
    const userSnapshot = await getDocs(userQuery);
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const userID = userDoc.id;
    setUserId(userID);
    setUser(userData);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => fetchData()} />
      }
    >
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: user.profile
                ? user.profile
                : "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("EditAccountScreen", userId)}
            style={styles.editButton}
          >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={32}
              color={"white"}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}></View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.bio}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Button style={styles.button} mode="outlined" onPress={handleSignOut}>
        Log out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    paddingTop: 55,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: color.sapphhire,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  cms: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  department: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  societiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginBottom: 40,
    alignSelf: "center",
  },
  editButton: {
    position: "absolute",
    top: "40%",
    left: "150%",
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
  containerButtons: {
    flex: 1,
    alignItems: "center",
    marginBottom: 5,
  },
  bottom: {
    flex: 1,
    // backgroundColor: "white",
    padding: 20,
    height: "100%",
    borderRadius: 25,
    marginHorizontal: 20,
    alignSelf: "stretch",
    borderTopLeftRadius: 55,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
});

export default ProfileScreen;
