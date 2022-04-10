import * as React from "react";
import { Center, Text, Flex, Box } from "native-base";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, Alert } from "react-native";

import { api } from "../../api";
import { usePulverizations } from "../../hooks/usePulverizations";
import { useTelemetry } from "../../hooks/useTelemetry";

import { Button } from "../../components/Button/Button";

const MILLISECONDS_INTERVAL = 10000; // 10 seconds

export function DecontaminationHandler() {
  const cleaningRef = React.useRef<LottieView | null>(null);

  const { fetchPhAndTurbidityTelemetry, lastPhAndTurbidityValue } =
    useTelemetry();

  const { pulverizationHealth } = usePulverizations();

  const [isLoading, setIsLoading] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);

  const [statusInterval, setStatusInterval] =
    React.useState<NodeJS.Timer | null>(null);

  const [elapsedInterval, setElapsedInterval] =
    React.useState<NodeJS.Timer | null>(null);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  async function fetchTelemetry() {
    await fetchPhAndTurbidityTelemetry("limpeza-esp32");
  }

  function handleStopDecontamination() {
    Alert.alert("Concluir limpeza", "Deseja realmente concluir a limpeza?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          try {
            setIsLoading(true);
            clearInterval(statusInterval as NodeJS.Timer);
            clearInterval(elapsedInterval as NodeJS.Timer);

            await api.post("decontaminations", {
              deviceId: "limpeza-esp32",
              timeInSeconds: elapsedTime,
              createdAt: new Date().toISOString(),
            });

            setIsLoading(false);
            navigation.navigate("DecontaminationCompleted", {});
          } catch (err) {
            console.log({ err });
            setIsLoading(false);
            Alert.alert("Ocorreu um erro ao concluir a limpeza");
          }
        },
      },
    ]);
  }

  React.useEffect(() => {
    cleaningRef.current?.play();

    const interval = setInterval(() => {
      fetchTelemetry();
    }, MILLISECONDS_INTERVAL);

    const elapsed = setInterval(() => {
      setElapsedTime((current) => current + 1);
    }, 1000);

    setStatusInterval(interval);
    setElapsedInterval(elapsed);
  }, []);

  React.useEffect(() => {
    console.log({ lastPhAndTurbidityValue });
  }, [lastPhAndTurbidityValue]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex flex={1} p={8}>
        <Center flex={1}>
          <Text
            fontSize={22}
            fontFamily="bold"
            textAlign="center"
            letterSpacing={-1}
            lineHeight={24}
            mb={4}
          >
            Limpeza{"\n"}em andamento
          </Text>

          <LottieView
            ref={cleaningRef}
            style={{
              width: 170,
            }}
            source={require("../../assets/lotties/cleaning.json")}
          />

          <Flex m={6} height={50}>
            {lastPhAndTurbidityValue.ph && (
              <Text fontSize={14}>
                Último ph coletado: {lastPhAndTurbidityValue.ph ?? ""}
              </Text>
            )}
            {lastPhAndTurbidityValue.tb && (
              <Text fontSize={14}>
                Última turbidez coletada: {lastPhAndTurbidityValue.tb ?? ""}
              </Text>
            )}
          </Flex>
        </Center>

        <Box w="100%" mt={3}>
          <Button
            text="Concluir limpeza"
            onPress={handleStopDecontamination}
            loading={isLoading}
            disabled={isLoading}
          />
        </Box>
      </Flex>
    </SafeAreaView>
  );
}
