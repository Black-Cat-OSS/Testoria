import { Button } from "@widgets";
import {
  Box,
  Stack,
  Heading,
} from "@chakra-ui/react";

export const ReadyToUse = () => {
  return (
    <Box
      minH="calc(100vh - 192px)"
      display="flex"
      width={"100%"}
      alignItems="center"
      justifyContent="center"
    >
      <Stack align="center" gap={8}>
        <Heading
          size="4xl"
          textAlign="center"
          transition="opacity 0.3s ease-in-out"
        >
          Проект проанализирован и готов к
          использованию!
        </Heading>
        <Button>Перейти к проекту</Button>
      </Stack>
    </Box>
  );
};
