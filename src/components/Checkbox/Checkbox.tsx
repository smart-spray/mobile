import * as React from "react";
import { Pressable, Text, Flex, useTheme } from "native-base";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface CheckboxProps {
  text: string;
  direction?: "left" | "right";
  onCheckboxChange: (isChecked: boolean) => void;
}

export function Checkbox({
  text,
  direction = "left",
  onCheckboxChange,
}: CheckboxProps) {
  const { colors } = useTheme();
  const [isChecked, setIsChecked] = React.useState(false);

  function handleOnPress() {
    onCheckboxChange(!isChecked);
    setIsChecked((oldValue) => !oldValue);
  }

  return (
    <Pressable onPress={handleOnPress}>
      <Flex
        direction={direction === "left" ? "row" : "row-reverse"}
        align="center"
        justify="center"
        width="100%"
      >
        <Flex
          w="24px"
          h="24px"
          justify="center"
          align="center"
          borderRadius={4}
          borderWidth={isChecked ? 0 : 2.4}
          borderColor={isChecked ? colors.green[600] : colors.grayScale[250]}
          backgroundColor={isChecked ? colors.green[600] : colors.grayScale[50]}
          mr={direction === "left" ? "12px" : undefined}
          ml={direction === "right" ? "12px" : undefined}
        >
          {isChecked && (
            <FontAwesome5 name="check" size={17} color={colors.grayScale[0]} />
          )}
        </Flex>

        <Text>{text}</Text>
      </Flex>
    </Pressable>
  );
}
