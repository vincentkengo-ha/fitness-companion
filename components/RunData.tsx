import { Text, StyleSheet, View } from "react-native";

export const RunData = (props: { data: string; name: string }) => (
  <View style={styles.container}>
    <Text style={styles.dataText}>{props.data}</Text>
    <Text style={styles.nameText}>{props.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dataText: {
    fontSize: 40,
  },
  nameText: {
    fontSize: 20,
  },
});
