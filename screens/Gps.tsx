import { useState, useEffect, Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getDistanceFromLatLonInKm } from "../utils/getDistance";

export const Gps = () => {
  const LOCATION_TASK = "background-location-task";

  // make ts stop crying
  const [locationHistory, setHistory] = useState([]);
  const [distance, setDistance] = useState(0);
  const [tempo, setTempo] = useState(Number);
  const [prevLocation, setPrevLocation] = useState();

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        console.log("All permissions granted");
      }
    }
  };

  // stupid
  useEffect(() => {
    requestPermissions();
  });

  const calculateDistance = (location: any) => {
    var temp = distance;
    var dist = 0;
    if (prevLocation) {
      dist = getDistanceFromLatLonInKm(
        prevLocation.locations[0].coords.latitude,
        prevLocation.locations[0].coords.longitude,
        location.locations[0].coords.latitude,
        location.locations[0].coords.longitude
      );
    }
    setDistance((temp += dist));

    console.log("Current distance: ", distance);
  };

  const start = async () => {
    console.log("starting tracking");
    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.BestForNavigation,
    });
    console.log("tracking started");
  };

  const stop = async () => {
    // gives a promise rejection when LOCATION_TASK is cancelled
    console.log("stopping tracking");
    await Location.stopLocationUpdatesAsync(LOCATION_TASK);
    console.log("tracking stopped");
    console.log(JSON.stringify(locationHistory));
  };

  TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
    if (error) {
      console.log("error occured: ", error);
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const newState = [...locationHistory, data];
      //stop crying ts
      setHistory(newState);
      calculateDistance(data);
      // console.log(JSON.stringify(locations));
      // do something with the locations captured in the background
      setPrevLocation(data);
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={start}>
        <Text style={styles.button}>start tracking</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop}>
        <Text style={styles.button}>stop tracking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "lightgrey",
    margin: 10,
  },
});
