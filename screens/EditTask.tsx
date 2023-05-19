import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

import { saveCountables } from "../storage/Storage";

// Pass in a task and edit it
export const EditTask = (props: { navigation: any }) => {
  const route = useRoute();
  // @ts-ignore
  const { countables, index } = route.params;
  const name = countables[index].name;
  const description = countables[index].description;
  const [newName, setName] = useState(countables[index].name);
  const [newDescription, setDescription] = useState(
    countables[index].description
  );

  const saveChanges = (name: string, description: string, index: number) => {
    const newState = [...countables];

    newState[index].name = name;
    if (name.length === 0) {
      newState[index].name = countables[index].name;
    }

    newState[index].description = description;
    if (description.length === 0) {
      newState[index].description = countables[index].description;
    }

    saveCountables(newState);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.text}
        placeholder={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        onPress={() => (
          saveChanges(newName, newDescription, index),
          props.navigation.navigate("Tasks")
        )}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
  },
});
