import { Box } from "@chakra-ui/react/box";
import {
  Container,
  ContainerProps,
} from "@chakra-ui/react/container";
import { Image } from "@chakra-ui/react/image";
import { Images } from "@assets";

interface FooterProps {
  containerWidth?: ContainerProps["maxW"];
}

export const Footer = ({
  containerWidth = "container.xl",
}: FooterProps) => {
  return (
    <Box
      as="footer"
      height="64px"
      width="100%"
      boxShadow="sm"
      bg={{
        base: "bg",
        _dark: "gray.900",
      }}
    >
      <Container
        maxW={containerWidth}
        height="100%"
        display="flex"
        alignItems="center"
      >
        <Image
          src={Images.w2blogo}
          alt="Web2Bizz Logo"
          height="40px"
        />
        Web2Bizz
      </Container>
    </Box>
  );
};
