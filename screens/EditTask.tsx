import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

// Pass in a task and edit it
export const EditTask = (props: { navigation: any }) => {
  const route = useRoute();
  // @ts-ignore
  const { countables, index } = route.params;
  const name = countables[index].name;
  const description = countables[index].description;
  const [newName, setName] = useState("");
  const [newDescription, setDescription] = useState("");

  const saveChanges = (name: string, description: string, index: number) => {

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
