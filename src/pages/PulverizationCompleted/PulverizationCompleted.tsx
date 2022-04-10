import * as React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export function PulverizationCompleted() {
  const loaderRef = React.useRef<LottieView | null>(null);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  React.useEffect(() => {
    loaderRef.current?.play();

    setTimeout(() => {
      navigation.pop(4);
    }, 2000);
  }, []);

  return (
    <Center flex={1}>
      <Text fontSize="18px">Pulverização concluída</Text>
      <Text fontSize="18px">com sucesso!</Text>

      <LottieView
        ref={loaderRef}
        style={{
          width: 100,
        }}
        source={require("../../assets/lotties/completed.json")}
      />
    </Center>
  );
}
