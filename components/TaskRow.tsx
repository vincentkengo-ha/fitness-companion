import { StyleSheet, Text, View } from "react-native";

import { CheckTask } from "./CheckTask";
import { CommonStyles } from "../styles/CommonStyles";
import { AddRow } from "./AddRow";

export const TaskRow = (props: { countable: any, changeCounts: any, index: number }) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{props.countable.name}</Text>
      <Text style={CommonStyles.descriptionText}>{props.countable.description}</Text>
      <Text style={CommonStyles.textItem}>{props.countable.count}</Text>
    </View>
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
