import {
  AbsoluteCenter,
  Box,
} from "@chakra-ui/react";
import { Footer, Header } from "@widgets";
import { useOutlet } from "react-router-dom";

export const CenterLayout = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      <Box minH="calc(100svh - 64px)">
        <AbsoluteCenter>{outlet}</AbsoluteCenter>
      </Box>
      <Footer />
    </>
  );
};
