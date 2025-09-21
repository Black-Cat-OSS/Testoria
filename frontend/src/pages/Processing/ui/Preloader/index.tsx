import {
  Box,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const messages = [
  "Идет обработка вашего запроса, пожалуйста подождите...",
  "Почти готово, не переключайтесь...",
  "Изучаем репозиторий...",
  "Настраиваем окружение...",
  "Собираем контейнеры...",
];

export const Preloader = () => {
  const [currentMessage, setCurrentMessage] =
    useState("");
  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    if (messageIndex >= messages.length) {
      setMessageIndex(0);
      return;
    }

    const showMessage = () => {
      setCurrentMessage(messages[messageIndex]);
    };

    const hideMessage = () => {
      setCurrentMessage("");
      setMessageIndex((prev) => prev + 1);
    };

    const showTimeout = setTimeout(
      showMessage,
      300
    );
    const hideTimeout = setTimeout(
      hideMessage,
      2000
    );

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [messageIndex]);

  return (
    <Box
      minH="calc(100vh - 192px)"
      display="flex"
      width={"100%"}
      alignItems="center"
      justifyContent="center"
    >
      <Stack align="center" gap={8}>
        <div style={{ height: "56px" }}>
          <Heading
            size="4xl"
            textAlign="center"
            opacity={currentMessage ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
          >
            {currentMessage}
          </Heading>
        </div>
        <Image
          width={"150px"}
          src={"/loading.svg"}
          alt="Loading..."
        />
      </Stack>
    </Box>
  );
};
