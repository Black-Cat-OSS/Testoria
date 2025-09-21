import {
  ChakraProvider as ChakraUIProvider,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode";
import { blueTheme } from "../../themes";

export const ChakraProvider: FC<
  ColorModeProviderProps
> = (props) => {
  return (
    <ChakraUIProvider value={blueTheme}>
      <ColorModeProvider {...props} />
    </ChakraUIProvider>
  );
};
