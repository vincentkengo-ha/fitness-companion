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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckTask } from "../components/CheckTask";
import { TaskRow } from "../components/TaskRow";
import { loadCountables, saveCountables } from "../storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0 },
  { name: "Woodpecker", count: 3 },
];

export const Tasks = (props: { navigation: any }) => {
  console.log(typeof(props.navigation))
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  const changeCounts = (amount: number, index: number) => {
    const newState = [...countables];
    if (newState[index].count === 0 && amount === -1) {
      return;
    }
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const addNewCountable = (name: string) => {
    if (
      (countables.some((c) => c.name === name) && countables.length > 0) ||
      name.length === 0
    ) {
      name = "";
      return;
    }
    const newState = [...countables, { name, count: 0 }];
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
              countable={countable}
              key={countable.name}
              changeCounts={changeCounts}
              index={index}
            />
          ))}
          <View style={{ flex: 1 }} />
        </ScrollView>
        <StatusBar style="auto" />
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
  },
});
