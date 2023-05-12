import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CheckTask = (props: { text: string, submit: any }) => (
  <TouchableOpacity style={styles.button} onPress={props.submit}>
    <Text style={CommonStyles.textItem}>{props.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
