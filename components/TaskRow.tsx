import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { CheckTask } from "./CheckTask";
import { CommonStyles } from "../styles/CommonStyles";

// TouchableOpacity onPress always changes the current screen to EditTask screen
export const TaskRow = (props: {
  navigation: any;
  countable: any;
  changeCounts: any;
  index: number;
}) => (
  <View style={CommonStyles.row}>
    <TouchableOpacity
      style={styles.nameColumn}
      onPress={() =>
        props.navigation.navigate("EditTask", {
          index: props.index,
          name: props.countable.name,
          description: props.countable.description,
        })
      }
    >
      <Text style={CommonStyles.textItem}>{props.countable.name}</Text>
      <Text style={CommonStyles.descriptionText}>
        {props.countable.description}
      </Text>
      <Text style={CommonStyles.textItem}>{props.countable.count}</Text>
    </TouchableOpacity>

    <View style={styles.buttonColumn}>
      <CheckTask
        text="+"
        submit={() => {
          props.changeCounts(1, props.index);
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});
