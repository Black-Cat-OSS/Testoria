import { ButtonProps } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { FC } from "react";

export const Button: FC<ButtonProps> = (
  props
) => {
  return (
    <ChakraButton
      {...props}
      type="submit"
      colorScheme="light"
      colorPalette={"blue"}
      variant={"solid"}
    >
      {props.children}
    </ChakraButton>
  );
};
