import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppTextInput from "../AppTextInput";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppFormField({ name, width, right, placeholder, ...otherProps }) {
  const { setFieldTouched, touched, handleChange, errors } = useFormikContext();
  return (
    <>
      <TextInput
        mode="outlined"
        {...otherProps}
        label={placeholder}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
      />
      <ErrorMessage errors={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
