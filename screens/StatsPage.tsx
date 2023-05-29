import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Stats } from "../utils/vars";
import { loadStats } from "../storage/Storage";

export const StatsPage = () => {
  const [stats, setStats] = useState({
    distance: 0,
    duration: 0,
  });

  useEffect(() => {
    loadStats().then((result) => setStats(result));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kilometers {stats.distance.toFixed(2)}</Text>
      <Text style={styles.text}>
        Hours {(stats.duration / 1000 / 60 / 60).toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    margin: 10,
  },
});
