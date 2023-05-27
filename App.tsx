import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Tasks } from "./screens/Tasks";
import { CreateTask } from "./screens/CreateTask";
import { EditTask } from "./screens/EditTask";
import { Gps } from "./screens/Gps";
import { PostRun } from "./screens/PostRun";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen name="Gps" component={Gps} />
        <Stack.Screen name="PostRun" component={PostRun} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
