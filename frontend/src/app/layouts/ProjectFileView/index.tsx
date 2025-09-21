import { Box, HStack } from "@chakra-ui/react";
import { useColorMode } from "@contexts";
import { FileTreeView } from "@features";
import { Footer, Header } from "@widgets";
import { useOutlet } from "react-router-dom";

export const ProjectFileViewLayout = () => {
  const outlet = useOutlet();

  const { colorMode } = useColorMode();

  return (
    <>
      <Header containerWidth="100%" />
      <HStack
        colorScheme={colorMode}
        alignItems={"start"}
        gapX={5}
      >
        <Box>
          <FileTreeView />
        </Box>
        <Box
          as="main"
          pt="70px"
          pr="10px"
          pb="64px"
          minH="calc(100svh - 64px)"
          flex="1"
        >
          {outlet}
        </Box>
      </HStack>
      <Footer containerWidth="100%" />
    </>
  );
};
