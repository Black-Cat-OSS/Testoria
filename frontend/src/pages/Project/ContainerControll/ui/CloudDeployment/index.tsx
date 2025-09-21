import {
  Button,
  ButtonProps,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  SiAmazon,
  SiGooglecloud,
  SiDigitalocean,
} from "react-icons/si";
import { FaMicrosoft, FaServer, FaHome, FaCloud } from "react-icons/fa";

const buttonProps: ButtonProps = {
  width: "100%",
  height: "100%",
  variant: {
    base: "outline",
    _dark: "surface",
  },
};

const cloudProviders = [
  {
    name: "AWS",
    icon: SiAmazon,
    color: "orange.500",
  },
  {
    name: "Azure",
    icon: FaMicrosoft,
    color: "blue.500",
  },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
    color: "green.500",
  },
  {
    name: "Digital Ocean",
    icon: SiDigitalocean,
    color: "blue.400",
  },
  {
    name: "Yandex Cloud",
    icon: FaCloud,
    color: "red.500",
  },
  {
    name: "Selectel",
    icon: FaServer,
    color: "purple.500",
  },
  {
    name: "Self Hosted",
    icon: FaHome,
    color: "gray.600",
  },
];

export const CloudDeployment = () => {
  return (
    <Stack gap={20}>
      <Heading size={"4xl"}>
        ☁️ Облачные провайдеры
      </Heading>
      <Grid
        width={"750px"}
        templateColumns={"repeat(3, 1fr)"}
        templateRows={"repeat(3, 100px)"}
        gap={"15px"}
      >
        {cloudProviders.map((provider) => (
          <GridItem key={provider.name}>
            <Button {...buttonProps}>
              <Icon
                size={"lg"}
                as={provider.icon}
                color={provider.color}
              />
              {provider.name}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};
