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
import { Warning } from "../../components/Warning/Warning";

const MILLISECONDS_INTERVAL = 10000; // 10 seconds

export function PulverizationHandler() {
  const tractorRef = React.useRef<LottieView | null>(null);

  const {
    fetchFlowRateTelemetry,
    fetchPhAndTurbidityTelemetry,
    lastFlowRateValue,
    lastPhAndTurbidityValue,
  } = useTelemetry();

  const { pulverizationHealth } = usePulverizations();

  const [isLoading, setIsLoading] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [pulverizationStarted, setPulverizationStarted] = React.useState(false);
  const [pulverizationStopped, setPulverizationStopped] = React.useState(false);
  const [title, setTitle] = React.useState(
    "Aguardando início\nda pulverização"
  );

  const [statusInterval, setStatusInterval] =
    React.useState<NodeJS.Timer | null>(null);

  const [elapsedInterval, setElapsedInterval] =
    React.useState<NodeJS.Timer | null>(null);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  async function fetchTelemetry() {
    await Promise.all([
      fetchFlowRateTelemetry("limpeza-esp32"),
      fetchPhAndTurbidityTelemetry("limpeza-esp32"),
    ]);
  }

  function handleStopPulverization() {
    Alert.alert(
      "Concluir pulverização",
      "Deseja realmente concluir a pulverização?",
      [
        { text: "Não" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              setIsLoading(true);
              clearInterval(statusInterval as NodeJS.Timer);
              clearInterval(elapsedInterval as NodeJS.Timer);

              await api.post("pulverizations", {
                deviceId: "limpeza-esp32",
                timeInSeconds: elapsedTime,
                weather: pulverizationHealth?.weather,
                createdAt: new Date().toISOString(),
              });

              if (!pulverizationStopped) {
                await api.put("pulverizations/stop", {
                  message: "S",
                });
              }

              setIsLoading(false);
              navigation.navigate("PulverizationCompleted", {});
            } catch (err) {
              setIsLoading(false);
              Alert.alert("Ocorreu um erro ao concluir a pulverização");
            }
          },
        },
      ]
    );
  }

  React.useEffect(() => {
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
    console.log({ lastFlowRateValue });
  }, [lastFlowRateValue]);

  React.useEffect(() => {
    if (lastPhAndTurbidityValue.isPulverizing) {
      tractorRef.current?.play();
      setTitle("Pulverização\nem andamento");
      setPulverizationStarted(true);
    }

    if (!lastPhAndTurbidityValue.isPulverizing && pulverizationStarted) {
      setPulverizationStopped(true);
      setTitle("Pulverização completa");
    }

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
          >
            {title}
          </Text>

          <LottieView
            ref={tractorRef}
            style={{
              width: 200,
            }}
            source={require("../../assets/lotties/tractor.json")}
          />

          <Flex m={6} height={90}>
            {pulverizationStarted && (
              <>
                {lastPhAndTurbidityValue.ph && (
                  <Text fontSize={14}>
                    Último ph coletado:{" "}
                    {lastPhAndTurbidityValue.ph.toFixed(2) ?? ""}
                  </Text>
                )}
                {lastFlowRateValue.sensor1 && (
                  <Text fontSize={14}>
                    Vazão no 1° sensor: {lastFlowRateValue.sensor1 ?? ""}
                  </Text>
                )}
                {lastFlowRateValue.sensor2 && (
                  <Text fontSize={14}>
                    Vazão no 2° sensor: {lastFlowRateValue.sensor2 ?? ""}
                  </Text>
                )}
                {lastFlowRateValue.sensor3 && (
                  <Text fontSize={14}>
                    Vazão no 3° sensor: {lastFlowRateValue.sensor3 ?? ""}
                  </Text>
                )}
              </>
            )}
          </Flex>

          {lastFlowRateValue.sector && (
            <Box w="100%" mt={4}>
              <Warning
                text={`Entupimento no setor ${lastFlowRateValue.sector}`}
              />
            </Box>
          )}
        </Center>

        <Box w="100%" mt={3}>
          {!pulverizationStopped && (
            <Text fontSize={14} lineHeight={18} textAlign="center" mb={6}>
              Nós iremos concluir a pulverização de maneira automática mas, caso
              queira, é possível interromper a pulverização pelo botão abaixo:
            </Text>
          )}

          <Button
            text={
              pulverizationStopped
                ? "Concluir etapa"
                : "Interromper pulverização"
            }
            onPress={handleStopPulverization}
            loading={isLoading}
            disabled={isLoading || !pulverizationStarted}
          />
        </Box>
      </Flex>
    </SafeAreaView>
  );
}
