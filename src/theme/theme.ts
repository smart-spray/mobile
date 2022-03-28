import { extendTheme } from "native-base";

const colors = {
  red: {
    100: "#FFE4E6",
    500: "#E15959",
    600: "#DC2626",
    650: "#D05151",
  },
  orange: {
    500: "#ECA857",
  },
  yellow: {
    500: "#FFD645",
  },
  green: {
    500: "#65CC36",
    600: "#50A928",
    700: "#35AF57",
    900: "#059669",
  },
  blue: {
    500: "#32759A",
  },
  grayScale: {
    0: "#FFFFFF",
    100: "#F7F7F7",
    250: "#D4D4D4",
    350: "#AFAFAF",
    500: "#A3A3A3",
    600: "#7B7B81",
    800: "#4B5563",
    900: "#292929",
  },
};

const fontConfig = {
  Montserrat: {
    300: "Montserrat_300Light",
    400: "Montserrat_400Regular",
    600: "Montserrat_600SemiBold",
  },
};

const fonts = {
  bold: "Montserrat_600SemiBold",
  heading: "Montserrat_600SemiBold",
  body: "Montserrat_400Regular",
  regular: "Montserrat_400Regular",
  light: "Montserrat_300Light",
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "5px",
      fontSize: 16,
      fontFamily: "bold",
    },
  },
  Heading: {
    baseStyle: {
      letterSpacing: -2,
    },
  },
  Text: {
    baseStyle: {
      fontFamily: "Montserrat_400Regular",
      fontSize: 16,
    },
  },
};

export const theme = extendTheme({
  colors,
  fontConfig,
  fonts,
  components,
  useSystemColorMode: false,
  initialColorMode: "light",
});

type CustomThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
