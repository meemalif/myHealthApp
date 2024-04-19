import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import React from "react";
import Card from "../components/Card";
import { Text } from "react-native-paper";
import color from "../config/color";

export default function BlogScreen() {
  const blogs = [
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
        {blogs.map((blog, index) => (
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
});
