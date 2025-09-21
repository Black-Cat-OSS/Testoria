import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AddProjectForm } from "./ui";

export const Add = () => {
  useDocumentTitle("RepoDock - добавить новый проект");

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading size="4xl" mb={4}>
            💻 Добавить новый проект
          </Heading>
        </Box>
        
        <Stack align="center" justify="center" minH="200px">
          <AddProjectForm />
        </Stack>
      </VStack>
    </Container>
  );
};
