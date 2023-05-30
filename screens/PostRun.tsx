import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { Run, Stats } from "../utils/vars";
import { loadRuns, saveRuns, loadStats, saveStats } from "../storage/Storage";

export const PostRun = (props: { navigation: any }) => {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({
    distance: 0,
    duration: 0,
  });
  const route = useRoute();
  // @ts-ignore
  const { duration, distance, tempo, time } = route.params;

  useEffect(() => {
    loadRuns().then((result) => setRuns(result));
    loadStats().then((result) => setStats(result));
  }, []);

  const save = () => {
    const run: Run = {
      time: time,
      duration: duration,
      distance: distance,
      tempo: tempo,
    };
    const newState = [...runs, run];
    saveRuns(newState);

    const newStats: Stats = {
      distance: stats.distance + distance,
      duration: stats.duration + duration,
    };
    saveStats(newStats);
    loadStats().then((result) => setStats(result));
    props.navigation.navigate("StatsPage", {newState});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>distance: {distance.toFixed(2)}</Text>
      <Text style={styles.text}>duration: {(duration / 1000).toFixed(0)}</Text>
      <Text style={styles.text}>tempo: {tempo.toFixed(2)}</Text>
      <Text style={styles.text}>date time: {time}</Text>
      <TouchableOpacity onPress={save}>
        <Text style={styles.pressableText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loadRuns}>
        <Text style={styles.pressableText}>printRuns</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
  pressableText: {
    fontSize: 30,
    backgroundColor: "lightblue",
  },
});
