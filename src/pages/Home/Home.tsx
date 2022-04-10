import * as React from "react";
import { Center, Flex, Heading, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { Button } from "../../components/Button/Button";

export function Home() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // TODO: implement sign in and sign out
  const user = {
    name: "Leandro",
    email: "leandro@gmail.com",
  };

  function handlePulverization() {
    navigation.navigate("PulverizationBegin", {});
  }

  function handleDecontamination() {
    navigation.navigate("DecontaminationBegin", {});
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex p={8} flex={1} justify="space-between">
        <Flex marginTop={10} w="100%">
          <Heading fontSize={28}>Bem vindo,</Heading>
          <Heading fontSize={28}>{user.name}</Heading>
        </Flex>

        <Center flex={1} marginBottom={10}>
          <Flex w="100%">
            <Text>O que você deseja fazer</Text>
            <Text>em sua fazenda hoje?</Text>
          </Flex>

          <VStack w="100%" space={2} marginY={10}>
            <Button text="Pulverizar" onPress={handlePulverization} />

            <Button text="Limpar o tanque" onPress={handleDecontamination} />
          </VStack>
        </Center>

        <Heading fontSize={14} w="100%" textAlign="center">
          SmartSpray
        </Heading>
      </Flex>
    </SafeAreaView>
  );
}
