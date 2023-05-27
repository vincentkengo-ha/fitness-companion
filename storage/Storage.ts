import AsyncStorage from "@react-native-async-storage/async-storage";

import { Run } from "../utils/vars";

export const saveCountables = async (countables: any) => {
  const jsonCountables = JSON.stringify(countables);
  await AsyncStorage.setItem("countables", jsonCountables);
};

export const loadCountables = async () => {
  // AsyncStorage.clear();
  const result = await AsyncStorage.getItem("countables");
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};

export const saveRun = async (run: Run) => {
  const items = await AsyncStorage.getItem("runs");
  var runs = [];
  if (items) {
    runs = JSON.parse(items);
  } 
  runs.add(run);
  const jsonRuns = JSON.stringify(runs);
  await AsyncStorage.setItem("runs", jsonRuns);
};

export const getRuns = async () => {
  const result = await AsyncStorage.getItem("runs");
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
}
