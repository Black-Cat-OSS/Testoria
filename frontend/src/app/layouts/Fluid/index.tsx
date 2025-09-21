import { Stack } from "@chakra-ui/react";
import { Footer, Header } from "@widgets";
import { useOutlet } from "react-router-dom";

export const FluidLayout = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header containerWidth={"100%"} />
      <Stack
        width="100%"
        maxWidth="100%"
        minH="calc(100svh - 64px)"
        mt="64px"
      >
        {outlet}
      </Stack>
      <Footer containerWidth={"100%"} />
    </>
  );
};
