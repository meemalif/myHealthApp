import React, { useState } from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/color";

function TimePicker({ icon, placeholder, width, name, mode }) {
  const { setFieldValue, touched, values, errors } = useFormikContext();
  const [show, setShow] = useState(false);
  const [placeholderTime, setPlaceholderTime] = useState(placeholder);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={"gray"}
              style={styles.icon}
            />
          )}
          <Text style={styles.text}>{placeholderTime}</Text>
          {icon && (
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={"gray"}
              style={styles.icon}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage errors={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          themeVariant="light"
          value={new Date()}
          mode={mode}
          display={mode == "date" ? "calendar" : "clock"}
          is24Hour={false}
          onChange={(event, time) => {
            setShow(false);
            if (event.type == "set") {
              setFieldValue(name, time);
              setPlaceholderTime(
                mode === "time"
                  ? time.getHours() + ":" + time.getMinutes()
                  : time.getDate() +
                      "-" +
                      (time.getMonth() + 1) +
                      "-" +
                      time.getFullYear()
              );
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 15,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 18,
    color: "#0c0c0c",
    flex: 1,
  },
});

export default TimePicker;
