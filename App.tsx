import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Tasks } from "./screens/Tasks";
import { CreateTask } from "./screens/CreateTask";
import { Run } from "./screens/Run";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="Run" component={Run} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
