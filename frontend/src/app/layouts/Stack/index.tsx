import { Box } from "@chakra-ui/react";
import { Footer, Header } from "@widgets";
import { useOutlet } from "react-router-dom";

export const StackLayout = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      <Box
        as="main"
        pt="64px"
        pb="64px"
        flex="1"
        minH="calc(100svh - 64px)"
      >
        {outlet}
      </Box>
      <Footer />
    </>
  );
};
