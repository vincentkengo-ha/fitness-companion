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

export const saveRuns = async (runs: Run[]) => {
  const jsonCountables = JSON.stringify(runs);
  await AsyncStorage.setItem("runs", jsonCountables);
};

export const saveRun = async (run: Run) => {
  var runs: Run[] = [];
  // result is stuck in scope
  loadRuns().then((result) => runs = result);
  console.log(runs);
  runs = [...runs, run];
  const jsonCountables = JSON.stringify(runs);
  await AsyncStorage.setItem("runs", jsonCountables);
};

export const loadRuns = async () => {
  const result = await AsyncStorage.getItem("runs");
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};
