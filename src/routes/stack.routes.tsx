import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "native-base";

import { Home } from "../pages/Home/Home";

const Stack = createStackNavigator();

export function StackRoutes() {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.grayScale[100],
        },
        headerTitleStyle: {
          color: colors.grayScale[0],
          fontFamily: fonts.heading,
          fontSize: 19,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
