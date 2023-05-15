import { useState } from "react";
import { View, TextInput, Keyboard, StyleSheet } from "react-native";

import { CheckTask } from "./CheckTask";

export const AddRow = (props: { addNewCountable: any }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        placeholder="Enter a name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.textField}
        placeholder="Description (optional)" 
        onChangeText={setDescription}
      />
      <CheckTask
        text="Add"
        submit={() => {
          props.addNewCountable(name, description);
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
  },
  button: {
    margin: 10,
  },
  textField: {
    margin: 10,
  },
});
