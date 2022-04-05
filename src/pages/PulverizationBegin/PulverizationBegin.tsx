import * as React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { usePulverizations } from "../../hooks/usePulverizations";

export function PulverizationBegin() {
  const loaderRef = React.useRef<LottieView | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { fetchPulverizationHealth } = usePulverizations();

  React.useEffect(() => {
    loaderRef.current?.play();

    // TODO: remove hard-coded device id
    const deviceId = "limpeza-esp32";

    async function getPulverizationHealth() {
      const pulverizationHealth = await fetchPulverizationHealth(deviceId);
      console.log({ pulverizationHealth });
      navigation.navigate("PulverizationData", {});
    }

    getPulverizationHealth();
  }, []);

  return (
    <Center flex={1}>
      <Text fontSize={18}>Estamos preparando a</Text>
      <Text fontSize={18}>pulverização, aguarde...</Text>

      <LottieView
        ref={loaderRef}
        style={{
          width: 100,
        }}
        source={require("../../assets/lotties/three-dots.json")}
      />
    </Center>
  );
}
