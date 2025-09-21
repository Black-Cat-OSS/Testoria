import { Box } from "@chakra-ui/react/box";
import { RepositoryForm, ProjectCards } from "@features";
import "./style.css";
import { Heading, Stack, Tabs } from "@chakra-ui/react";

const Main = () => {
  return (
    <Box
      minH="calc(100vh - 192px)"
      width={"100%"}
    >
      <Tabs.Root variant="enclosed" defaultValue="home">
        <Tabs.List justifyContent="center" mb={8}>
          <Tabs.Trigger value="home">Главная</Tabs.Trigger>
          <Tabs.Trigger value="projects">Проекты</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="home">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="60vh"
          >
            <Stack
              gap={8}
              align="center"
              textAlign="center"
            >
              <Heading size="4xl">
                🚀 «Push. Build. Dock. Done.»
              </Heading>
              <RepositoryForm />
            </Stack>
          </Box>
        </Tabs.Content>
        
        <Tabs.Content value="projects" px={0}>
          <ProjectCards />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Main;
