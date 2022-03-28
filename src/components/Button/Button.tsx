import * as React from "react";
import { ColorType } from "native-base/lib/typescript/components/types";
import { Center, HStack, Spinner, Text, useTheme } from "native-base";
import { TouchableOpacity } from "react-native";

interface ButtonIcon {
  position: "left" | "right";
  iconElement: React.ReactNode;
}

interface ButtonProps {
  backgroundColor?: ColorType;
  color?: ColorType;
  borderColor?: ColorType;
  disabled?: boolean;
  loading?: boolean;
  text: string;
  icon?: ButtonIcon;
  onPress: () => void;
}

export function Button({
  backgroundColor = "green.500",
  color = "grayScale.0",
  borderColor,
  disabled = false,
  loading = false,
  text,
  icon,
  onPress,
}: ButtonProps) {
  const { colors } = useTheme();

  const buttonContent = () => (
    <Text
      fontFamily="bold"
      color={color}
      fontSize="16px"
      p="10px"
      letterSpacing={-0.2}
    >
      {text}
    </Text>
  );

  const buttonContentWithIcon = ({ position, iconElement }: ButtonIcon) => (
    <HStack
      direction={position === "left" ? "row" : "row-reverse"}
      alignItems="center"
    >
      {iconElement}
      {buttonContent()}
    </HStack>
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <Center
        background={disabled ? colors.grayScale[350] : backgroundColor}
        p="6px"
        borderRadius="5px"
        borderColor={borderColor ? borderColor : undefined}
        borderWidth={borderColor ? 1 : 0}
        flexDirection="row"
      >
        {loading ? (
          <Center p="12px">
            <Spinner
              color={color ?? colors.grayScale[0]}
              background={colors.red[500]}
            />
          </Center>
        ) : (
          <>{icon ? buttonContentWithIcon(icon) : buttonContent()}</>
        )}
      </Center>
    </TouchableOpacity>
  );
}
