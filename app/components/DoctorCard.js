import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const DoctorCard = ({ doctor }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.bio}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {doctor.description?.slice(0, 100)}...
          </Text>
        </View>
        <Image
          source={{
            uri: doctor.profile
              ? doctor.profile
              : doctor.gender === "male"
              ? "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              : "https://img.freepik.com/premium-vector/flat-vector-illustration-woman-doctor_678069-78.jpg",
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.ratingContainer}>
        {/* Icons for ratings could be repeated based on the rating value */}
        <Icon name="star" size={15} color="#FFD700" />
        <Icon name="star" size={15} color="#FFD700" />
        <Icon name="star" size={15} color="#FFD700" />
        <Icon name="star-half-empty" size={15} color="#FFD700" />
        <Icon name="star-o" size={15} color="#FFD700" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => () => {
            Linking.openURL(
              `whatsapp://send?phone=${
                doctor.contact
              }&text=${"hi, I came from TheHealthApp"}`
            );
            console.log(doctor.contact, "doctor contact number");
          }}
          style={[styles.button, styles.sendRequestButton]}
          d
        >
          <Text style={styles.buttonText}>SEND REQUEST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.contactButton]}>
          <Text style={styles.buttonText}>CONTACT</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: "auto",
    borderRadius: 40,
  },
  doctorInfo: {
    width: "65%",
    marginLeft: 10,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    flexWrap: "wrap",
    fontSize: 12,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  sendRequestButton: {
    backgroundColor: "#FF4500",
  },
  contactButton: {
    backgroundColor: "#1E90FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default DoctorCard;
