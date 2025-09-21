import { Box, Heading, VStack } from "@chakra-ui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { CloudDeployment, ContainerTable } from "./ui";

export const ContainerControll = () => {
  useDocumentTitle("RepoDock - управление контейнерами");

  return (
    <VStack gap={8} width="100%" maxWidth="100%" py={8}>
      {false && <CloudDeployment />}

      <ContainerTable />
    </VStack>
  );
};
