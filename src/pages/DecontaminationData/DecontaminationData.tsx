import * as React from "react";
import { Flex, Text, Box, VStack, useTheme } from "native-base";
import { SafeAreaView, Alert } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { usePulverizations } from "../../hooks/usePulverizations";
import { api } from "../../api";

import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Button } from "../../components/Button/Button";
import { Card, CardRow } from "../../components/Card/Card";

export function DecontaminationData() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmationChecked, setIsConfirmationChecked] =
    React.useState(false);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const { pulverizationHealth } = usePulverizations();

  const sprayStatusRows: CardRow[] = [
    {
      key: "Limpo",
      value:
        (pulverizationHealth?.ph as number) > 6 &&
        (pulverizationHealth?.ph as number) < 8
          ? "Sim"
          : "Não",
    },
    {
      key: "Bicos",
      value:
        pulverizationHealth?.nozzleStatus === "ok"
          ? "Não entupidos"
          : "Entupidos",
    },
    {
      key: "pH do tanque",
      value: String(pulverizationHealth?.ph.toFixed(2)),
    },
  ];

  async function handleStartDecontamination() {
    setIsLoading(true);

    try {
      await api.post("decontaminations/start", {
        message: "L",
      });

      setIsLoading(true);
      navigation.navigate("DecontaminationHandler", {});
    } catch (err) {
      setIsLoading(true);
      Alert.alert("Não foi possível iniciar a limpeza do tanque");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex p={8} flex={1} justify="space-between" align="center">
        <VStack flex={1} w="100%" space={4}>
          <Card
            title="Pulverizador"
            rows={sprayStatusRows}
            icon={
              <MaterialCommunityIcons
                name="tractor-variant"
                size={24}
                color={colors.green[500]}
              />
            }
          />
        </VStack>

        <Flex>
          <Text textAlign="center" fontSize="14px" mb={6}>
            Ao concordar em continuar e prosseguir com a limpeza o responsável
            pelo processo será informado para histórico do processo
          </Text>

          <Checkbox
            text="Concordo em prosseguir"
            onCheckboxChange={(isChecked) =>
              setIsConfirmationChecked(isChecked)
            }
          />

          <Box mt={7}>
            <Button
              text="Iniciar limpeza"
              onPress={handleStartDecontamination}
              disabled={!isConfirmationChecked || isLoading}
              loading={isLoading}
            />
          </Box>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}
