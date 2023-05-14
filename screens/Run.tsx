import { View, Text, StyleSheet } from "react-native";

import { RunData } from "../components/RunData";

export const Run = () => {
  const data = "0.0";
  const name = "km";

  return (
    <View style={styles.container}>
      <Text>foo</Text>
      <RunData data={data} name={name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
