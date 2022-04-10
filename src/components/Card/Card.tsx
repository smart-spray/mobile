import * as React from "react";
import { Flex, Text, useTheme, VStack } from "native-base";

export interface CardRow {
  key: string;
  value: string;
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  rows: CardRow[];
}

export function Card({ icon, title, rows }: CardProps) {
  const { colors } = useTheme();

  return (
    <Flex bg={colors.grayScale[0]} p="16px" borderRadius="5px">
      <Flex direction="row" align="center" marginBottom="18px">
        {icon}
        <Text marginLeft="8px" fontSize="16px" fontFamily="bold">
          {title}
        </Text>
      </Flex>

      <VStack space={3}>
        {rows.map((row) => (
          <Flex
            key={row.key}
            direction="row"
            align="center"
            justify="space-between"
          >
            <Text>{row.key}</Text>
            <Text>{row.value}</Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
