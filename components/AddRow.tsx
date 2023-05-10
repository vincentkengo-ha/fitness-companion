import { useState } from "react";
import { View, TextInput, Keyboard, StyleSheet } from "react-native";

import { CheckBox } from "./CheckBox";

export const AddRow = (props: { addNewCountable: any }) => {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        placeholder="Enter a name"
        onChangeText={setName}
      />
      <CheckBox
        style={styles.button}
        text="Add"
        submit={() => {
          props.addNewCountable(name);
          Keyboard.dismiss();
          // no work :(
          setName("");
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
