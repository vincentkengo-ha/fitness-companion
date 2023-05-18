import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckTask } from "../components/CheckTask";
import { TaskRow } from "../components/TaskRow";
import { loadCountables, saveCountables } from "../storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0, description: "Smart" },
  { name: "Woodpecker", count: 3, description: "Brrrrr" },
];

export const Tasks = (props: { navigation: any }) => {
  const [countables, setCountables] = useState(intialCountables);

  //Delete when user can add countables
  // if (countables.length === 0) {
  //   setCountables(intialCountables);
  // }
  console.log(countables, "Tasks");

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  useEffect(() => {
    const focusHandler = props.navigation.addListener("focus", () => {
      loadCountables().then((result) => setCountables(result));
      // Alert.alert("Refreshed");
    });

    return focusHandler;
  }, [props.navigation]);

  const changeCounts = (amount: number, index: number) => {
    const newState = [...countables];
    if (newState[index].count === 0 && amount === -1) {
      return;
    }
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const removeCountable = (name: string) => {
    const newState = countables.filter((filtered) => filtered.name !== name);
    setCountables(newState);
    saveCountables(newState);
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {countables.map((countable, index) => (
            <TaskRow
              countables={countables}
              key={countable.name}
              changeCounts={changeCounts}
              index={index}
              navigation={props.navigation}
            />
          ))}
          <View style={{ flex: 1 }} />
        </ScrollView>
        <StatusBar style="auto" />

        <TouchableOpacity
          //Temporary for testing purposes
          style={styles.addButton}
          onPress={() => props.navigation.navigate("Run")}
        >
          <Text style={styles.text}>run</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => props.navigation.navigate("CreateTask")}
        >
          <Text style={styles.text}>add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  addButton: {
    backgroundColor: "#6BA3B9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#fff",
  },
});
