import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";

// somehow create a task that persists.
export const CreateTask = (props: {
  route: any;
  navigation: any;
}) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        onChangeText={setName}
      />
      <TextInput style={styles.input} placeholder="Description (Optional)" />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Tasks")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        //this wont work right now
        onPress={props.route.addNewCountable(name)}
      >
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6BA3B9",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: "46%",
    height: 40,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
  input: {
    fontSize: 24,
    color: "#fff",
  },
});
