import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage, single }) {
  // (imageUris);
  const scrollView = useRef();
  const [uriImage, setUriImage] = useState();

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {!single &&
          imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput imageUri={uri} onChange={() => onRemoveImage(uri)} />
            </View>
          ))}

        <ImageInput
          imageUri={single ? uriImage : null}
          onChange={(uri) => {
            onAddImage(uri);
            setUriImage(uri);
            // onRemoveImage(uri);
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
