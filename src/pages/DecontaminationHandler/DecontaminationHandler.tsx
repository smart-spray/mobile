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
  const [decontaminationStarted, setDecontaminationStarted] =
    React.useState(false);
  const [title, setTitle] = React.useState("Aguardando início\nda limpeza");
  const [decontaminationStopped, setDecontaminationStopped] =
    React.useState(false);

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

            if (!decontaminationStopped) {
              await api.put("decontaminations/stop", {
                message: "S",
              });
            }

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
    if (lastPhAndTurbidityValue.isClean) {
      cleaningRef.current?.play();
      setTitle("Limpeza\nem andamento");
      setDecontaminationStarted(true);
    }

    if (!lastPhAndTurbidityValue.isClean && decontaminationStarted) {
      setDecontaminationStopped(true);
      setTitle("Limpeza completa");
    }
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
            {title}
          </Text>

          <LottieView
            ref={cleaningRef}
            style={{
              width: 170,
            }}
            source={require("../../assets/lotties/cleaning.json")}
          />

          <Flex m={6} height={50}>
            {decontaminationStarted && (
              <>
                {lastPhAndTurbidityValue.ph && (
                  <Text fontSize={14}>
                    Último ph coletado:{" "}
                    {lastPhAndTurbidityValue.ph.toFixed(2) ?? ""}
                  </Text>
                )}
                {lastPhAndTurbidityValue.tb && (
                  <Text fontSize={14}>
                    Turbidez:{" "}
                    {lastPhAndTurbidityValue.tb > 900 &&
                    lastPhAndTurbidityValue.tb < 1200
                      ? "água limpa"
                      : "água turva"}
                  </Text>
                )}
              </>
            )}
          </Flex>
        </Center>

        <Box w="100%" mt={3}>
          {!decontaminationStopped && (
            <Text fontSize={14} lineHeight={18} textAlign="center" mb={6}>
              Nós iremos concluir a limpeza de maneira automática mas, caso
              queira, é possível interromper a limpeza pelo botão abaixo:
            </Text>
          )}

          <Button
            text={
              decontaminationStopped ? "Concluir etapa" : "Interromper limpeza"
            }
            onPress={handleStopDecontamination}
            loading={isLoading}
            disabled={isLoading || !decontaminationStarted}
          />
        </Box>
      </Flex>
    </SafeAreaView>
  );
}
