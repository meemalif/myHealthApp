import { Platform } from "react-native";
import colors from "./color";

export default {
  colors,
  text: {
    fontSize: 18,
    color: "#0c0c0c",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
