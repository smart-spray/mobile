import * as React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { usePulverizations } from "../../hooks/usePulverizations";

export function DecontaminationBegin() {
  const loaderRef = React.useRef<LottieView | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { fetchPulverizationHealth } = usePulverizations();

  React.useEffect(() => {
    loaderRef.current?.play();

    const deviceId = "limpeza-esp32";

    async function getPulverizationHealth() {
      await fetchPulverizationHealth(deviceId);
      setTimeout(() => navigation.navigate("DecontaminationData", {}), 1000);
    }

    getPulverizationHealth();
  }, []);

  return (
    <Center flex={1}>
      <Text fontSize={18}>Estamos preparando a limpeza</Text>
      <Text fontSize={18}>do tanque, aguarde...</Text>

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
