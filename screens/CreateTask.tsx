import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

import { Countable } from "../utils/vars";
import { loadCountables, saveCountables } from "../storage/Storage";
import { AddRow } from "../components/AddRow";

const intialCountables = [
  { name: "Crow", count: 0, description: "Smart" },
  { name: "Woodpecker", count: 3, description: "Brrrrr" },
];
// somehow create a task that persists.
export const CreateTask = (props: { navigation: any }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  console.log(countables, "CreateTask");

  const addNewCountable = (name: string, description: string) => {
    if (
      (countables.some((c: Countable) => c.name === name) &&
        countables.length > 0) ||
      name.length === 0
    ) {
      name = "";
      return;
    }
    const newState = [...countables, { name, count: 0, description }];
    newState.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setCountables(newState);
    saveCountables(newState);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        onChangeText={setDescription}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Tasks")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (
          addNewCountable(name, description), props.navigation.navigate("Tasks")
        )}
        style={styles.button}
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
