import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";

import { Run } from "../utils/vars";
import { loadStats } from "../storage/Storage";

export const StatsPage = () => {
  const [stats, setStats] = useState({
    distance: 0,
    duration: 0,
  });
  const route = useRoute();
  // @ts-ignore
  const runs: Run[] = route.params.newState;
  useEffect(() => {
    loadStats().then((result) => setStats(result));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tempo for 5 most recent runs</Text>
      <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: [
                  runs[runs.length - 1].tempo,
                  runs[runs.length - 2].tempo,
                  runs[runs.length - 3].tempo,
                  runs[runs.length - 4].tempo,
                  runs[runs.length - 5].tempo,
                ],
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
