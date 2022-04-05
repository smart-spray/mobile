import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

import { GlobalProvider } from "./src/hooks";
import { theme } from "./src/theme/theme";
import Routes from "./src/routes";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
    </NativeBaseProvider>
  );
}
