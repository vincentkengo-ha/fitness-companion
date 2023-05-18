import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { CheckTask } from "./CheckTask";
import { CommonStyles } from "../styles/CommonStyles";

// TouchableOpacity onPress always changes the current screen to EditTask screen
export const TaskRow = (props: {
  navigation: any;
  countables: any;
  changeCounts: any;
  index: number;
}) => (
  <View style={CommonStyles.row}>
    <TouchableOpacity
      style={styles.nameColumn}
      onPress={() =>
        props.navigation.navigate("EditTask", {
          countables: props.countables,
          index: props.index,
        })
      }
    >
      <Text style={CommonStyles.textItem}>{props.countables[props.index].name}</Text>
      <Text style={CommonStyles.descriptionText}>
        {props.countables[props.index].description}
      </Text>
      <Text style={CommonStyles.textItem}>{props.countables[props.index].count}</Text>
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
