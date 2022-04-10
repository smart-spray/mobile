import * as React from "react";
import { Center, Text, useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface HeaderWarningProps {
  text?: string;
}

export function Warning({ text }: HeaderWarningProps) {
  const { colors } = useTheme();

  return (
    <Center bg="red.500" w="100%" paddingY={3} paddingX={6} borderRadius="4px">
      <Ionicons
        name="warning"
        size={36}
        color={colors.grayScale[0]}
        style={{ marginBottom: 8 }}
      />

      {text && (
        <Text
          fontSize="17px"
          fontFamily="regular"
          textAlign="center"
          lineHeight={20}
          letterSpacing={-1}
          color="grayScale.0"
        >
          {text}
        </Text>
      )}
    </Center>
  );
}
