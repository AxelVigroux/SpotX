import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "Poppins, sans-serif",
};
const colors = {
  primary: {
    300: "#FF8591",
    500: "#FF4154",
  },
  black: "#161E2E",
  white: "#F8F3F2",
  gray: "#2d3748",
};

const customTheme = extendTheme({ colors, fonts });

export default customTheme;
