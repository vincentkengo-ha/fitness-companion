import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

import { Run, formatTime } from "../utils/vars";

export const PostRun = () => {
  const route = useRoute();
  // @ts-ignore
  const { duration, distance, tempo, time } = route.params;

  return ( 
    <View style={styles.container}>
      <Text style={styles.text}>distance: {distance.toFixed(2)}</Text>
      <Text style={styles.text}>duration: {(duration / 1000).toFixed(0)}</Text>
      <Text style={styles.text}>tempo: {tempo.toFixed(2)}</Text>
      <Text style={styles.text}>date time: {time}</Text>
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
});
