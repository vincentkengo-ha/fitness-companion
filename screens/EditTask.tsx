import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

// Pass in a task and edit it
export const EditTask = (props: { navigation: any }) => {
  const route = useRoute();
  // @ts-ignore
  const { index, name, description } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
  },
});
