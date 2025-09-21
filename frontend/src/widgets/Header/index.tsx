import { Images } from "@assets";
import { Box } from "@chakra-ui/react/box";
import {
  Container,
  ContainerProps,
} from "@chakra-ui/react/container";
import { Image } from "@chakra-ui/react/image";
import { Button } from "@chakra-ui/react/button";
import { HStack } from "@chakra-ui/react/stack";
import { ColorModeButton } from "@contexts";
import { useUser } from "@hooks";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface HeaderProps {
  containerWidth?: ContainerProps["maxW"];
}

export const Header = ({
  containerWidth = "container.xl",
}: HeaderProps) => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      boxShadow="sm"
      zIndex="sticky"
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
        justifyContent="space-between"
      >
        <Image
          src={Images.repodokLogo}
          alt="Web2Bizz Logo"
          height="40px"
          className="header"
        />
        <HStack gap={4}>
          <ColorModeButton />
          {isAuthenticated ? (
            <Image
              src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
              alt="User Avatar"
              width="32px"
              height="32px"
              borderRadius="50%"
              objectFit="cover"
            />
          ) : (
            <HStack gap={2}>
              <Button
                size="sm"
                color="blue.500"
                borderColor="blue.500"
                variant="outline"
                _hover={{
                  bg: "blue.50",
                }}
                onClick={() => navigate("/login")}
              >
                Войти
              </Button>
              <Button
                size="sm"
                bg="blue.500"
                color="white"
                variant="solid"
                _hover={{
                  bg: "blue.600",
                }}
                onClick={() => navigate("/register")}
              >
                Зарегистрироваться
              </Button>
            </HStack>
          )}
        </HStack>
      </Container>
    </Box>
  );
};
