import * as React from "react";
import { Center, Flex, Text } from "native-base";
import { SafeAreaView } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export function PulverizationData() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex p={8} flex={1} justify="space-between">
        <Center flex={1} marginBottom={10}>
          <Text>Dados da Pulverização</Text>
        </Center>
      </Flex>
    </SafeAreaView>
  );
}
