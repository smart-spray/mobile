import * as React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export function DecontaminationBegin() {
  const loaderRef = React.useRef<LottieView | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  React.useEffect(() => {
    loaderRef.current?.play();

    // startDraftPulverization({
    //   ...TODO
    // });

    setTimeout(() => navigation.navigate("DecontaminationData", {}), 2000);
  }, []);

  return (
    <Center flex={1}>
      <Text fontSize={18}>Estamos preparando a</Text>
      <Text fontSize={18}>descontaminação, aguarde...</Text>

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
