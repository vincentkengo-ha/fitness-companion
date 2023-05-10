import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tasks from "./screens/Tasks";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
       <Stack.Screen
          name="Tasks"
          component={Tasks}
        />
     </Stack.Navigator>
    </NavigationContainer>
  );
}
