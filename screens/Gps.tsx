import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useStopwatch } from "react-use-precision-timer";

import { getDistanceFromLatLonInKm } from "../utils/getDistance";
import { formatTime } from "../utils/vars";

export const Gps = (props: { navigation: any }) => {
  const LOCATION_TASK = "background-location-task";

  const statuses = {
    running: "running",
    paused: "paused",
    stopped: "stopped",
  };

  // make ts stop crying
  const [locationHistory, setHistory] = useState([]);
  const [distance, setDistance] = useState(0);
  const [prevLocation, setPrevLocation] = useState();
  const [status, setStatus] = useState(statuses.stopped);
  const stopwatch = useStopwatch();

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

  const calculateTempo = (distance: number, time: number) => {
    time = time / 1000 / 60;
    if (Number.isNaN(distance / time)) {
      return 0;
    }
    return distance / time;
  };

  const start = async () => {
    if (status !== statuses.running) {
      setStatus(statuses.running);
      console.log("starting tracking");
      await Location.startLocationUpdatesAsync(LOCATION_TASK, {
        accuracy: Location.Accuracy.BestForNavigation,
      });
      console.log("tracking started");

      stopwatch.start();
    }
  };

  const pause = async () => {
    if (status !== statuses.paused) {
      if (status !== statuses.stopped) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      }
      setStatus(statuses.paused);

      stopwatch.pause();
    }
  };

  const stop = async () => {
    if (status !== statuses.stopped) {
      if (status !== statuses.paused) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      }
      props.navigation.navigate("PostRun", {
        duration: stopwatch.getElapsedStartedTime(),
        distance: distance,
        tempo: calculateTempo(distance, stopwatch.getElapsedStartedTime()),
        time: formatTime(new Date()),
      });
      setStatus(statuses.stopped);
      setDistance(0);
      stopwatch.stop();
      console.log("stop method successfully executed");
    }
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
        <Text style={styles.button}>start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pause}>
        <Text style={styles.button}>pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop}>
        <Text style={styles.button}>stop</Text>
      </TouchableOpacity>
      <Text style={styles.button}>km: {distance.toFixed(2)}</Text>
      <Text style={styles.button}>
        km/min:{" "}
        {calculateTempo(distance, stopwatch.getElapsedStartedTime()).toFixed(2)}
      </Text>
      <Text style={styles.button}>
        time: {(stopwatch.getElapsedStartedTime() / 1000).toFixed(0)}
      </Text>
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
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "lightgrey",
    margin: 10,
  },
});
