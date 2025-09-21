import {
  Button,
  ButtonProps,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { FiImage, FiPlus } from "react-icons/fi";
import { GoContainer } from "react-icons/go";
import { IoCodeSlashOutline } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const buttonProps: ButtonProps = {
  width: "100%",
  height: "100%",
  variant: {
    base: "outline",
    _dark: "surface",
  },
};

export const Main = () => {
  useDocumentTitle("RepoDock - лаунчер");

  const navigate = useNavigate();

  return (
    <Stack gap={20}>
      <Heading size={"4xl"}>
        С чего хотите начать?
      </Heading>
      <Grid
        width={"500px"}
        templateColumns={"repeat(2, 2fr)"}
        templateRows={"repeat(3, 100px)"}
        gap={"15px"}
      >
        <GridItem>
          <Button
            {...buttonProps}
            onClick={() => navigate("code")}
          >
            <Icon
              size={"lg"}
              as={IoCodeSlashOutline}
              color="blue.500"
            />
            Исходный код
          </Button>
        </GridItem>
        <GridItem>
          <Button {...buttonProps}>
            <Icon
              size={"lg"}
              as={FiImage}
              color="pink.400"
            />
            Обозреватель образов
          </Button>
        </GridItem>
        <GridItem>
          <Button
            {...buttonProps}
            onClick={() => navigate("container")}
          >
            <Icon
              size={"lg"}
              as={GoContainer}
              color="orange.600"
            />
            Управлять контейнерами
          </Button>
        </GridItem>
        <GridItem>
          <Button {...buttonProps}>
            <Icon
              size={"lg"}
              as={LuBrainCircuit}
              color="green.400"
            />
            Генерировать с ИИ
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            {...buttonProps}
            height="48px"
            onClick={() =>
              navigate("/project/add")
            }
          >
            <Icon
              size={"lg"}
              as={FiPlus}
              color="teal.500"
            />
            Добавить новый проект
          </Button>
        </GridItem>
      </Grid>
    </Stack>
  );
};
