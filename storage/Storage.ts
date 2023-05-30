import AsyncStorage from "@react-native-async-storage/async-storage";

import { Run, Stats } from "../utils/vars";
import { StatusBar } from "react-native/types";

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
  loadRuns().then((result) => (runs = result));
  console.log(runs);
  runs = [...runs, run];
  const jsonCountables = JSON.stringify(runs);
  await AsyncStorage.setItem("runs", jsonCountables);
};

export const loadRuns = async () => {
  const result = await AsyncStorage.getItem("runs");
  if (result) {
    //console.log(result);
    return JSON.parse(result);
  } else {
    return [];
  }
};

export const saveStats = async (stats: Stats) => {
  const jsonDistance = JSON.stringify(stats);
  await AsyncStorage.setItem("stats", jsonDistance);
};

export const loadStats = async () => {
  const result = await AsyncStorage.getItem("stats");
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};
