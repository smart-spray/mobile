import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getHeaderTitle, Header } from "@react-navigation/elements";
import { useTheme, View, Pressable } from "native-base";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Home } from "../pages/Home/Home";
import { PulverizationBegin } from "../pages/PulverizationBegin/PulverizationBegin";
import { PulverizationData } from "../pages/PulverizationData/PulverizationData";
import { DecontaminationBegin } from "../pages/DecontaminationBegin/DecontaminationBegin";
import { DecontaminationData } from "../pages/DecontaminationData/DecontaminationData";
import { PulverizationHandler } from "../pages/PulverizationHandler/PulverizationHandler";
import { PulverizationCompleted } from "../pages/PulverizationCompleted/PulverizationCompleted";
import { DecontaminationHandler } from "../pages/DecontaminationHandler/DecontaminationHandler";
import { DecontaminationCompleted } from "../pages/DecontaminationCompleted/DecontaminationCompleted";

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
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.green[700],
          height: Platform.OS === "ios" ? 110 : 90,
        },
        headerTitleStyle: {
          color: colors.grayScale[0],
          fontFamily: fonts.heading,
          fontSize: 19,
        },
        headerTitleAlign: "center",
        headerBackImage: () => (
          <View paddingLeft={4}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.grayScale[0]}
            />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      {/* 
        Pulverization Screens
      */}
      <Stack.Screen
        name="PulverizationBegin"
        component={PulverizationBegin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PulverizationData"
        component={PulverizationData}
        options={{
          headerTitle: "Pulveriza????o",
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Header
                title={title}
                headerLeft={
                  back
                    ? (props) => (
                        <Pressable onPress={() => navigation.pop(2)}>
                          <View paddingLeft={Platform.OS === "ios" ? 4 : 7}>
                            <MaterialIcons
                              name="arrow-back"
                              size={24}
                              color={colors.grayScale[0]}
                            />
                          </View>
                        </Pressable>
                      )
                    : undefined
                }
                headerStyle={options.headerStyle}
                headerTitleStyle={options.headerTitleStyle}
                headerTitleAlign="center"
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="PulverizationHandler"
        component={PulverizationHandler}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PulverizationCompleted"
        component={PulverizationCompleted}
        options={{
          headerTitle: "",
          headerLeft: (props) => null,
        }}
      />

      {/* 
        Decontamination Screens
      */}
      <Stack.Screen
        name="DecontaminationBegin"
        component={DecontaminationBegin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DecontaminationData"
        component={DecontaminationData}
        options={{
          headerTitle: "Limpeza",
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Header
                title={title}
                headerLeft={
                  back
                    ? (props) => (
                        <Pressable onPress={() => navigation.pop(2)}>
                          <View paddingLeft={Platform.OS === "ios" ? 4 : 7}>
                            <MaterialIcons
                              name="arrow-back"
                              size={24}
                              color={colors.grayScale[0]}
                            />
                          </View>
                        </Pressable>
                      )
                    : undefined
                }
                headerStyle={options.headerStyle}
                headerTitleStyle={options.headerTitleStyle}
                headerTitleAlign="center"
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="DecontaminationHandler"
        component={DecontaminationHandler}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DecontaminationCompleted"
        component={DecontaminationCompleted}
        options={{
          headerTitle: "",
          headerLeft: (props) => null,
        }}
      />
    </Stack.Navigator>
  );
}
