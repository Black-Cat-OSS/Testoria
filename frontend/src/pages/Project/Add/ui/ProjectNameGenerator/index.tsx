import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import { useProjectNameGenerator } from "../../../../../shared/hooks/useProjectNameGenerator";
import { useProjectFormContext } from "../../contexts/ProjectFormContext";

export const ProjectNameGenerator = () => {
  const { onNameGenerated } = useProjectFormContext();
  
  const {
    generatedNames,
    isGenerating,
    generateNames,
    generateSingleName,
    clearGeneratedNames,
  } = useProjectNameGenerator();

  const handleGenerateNames = () => {
    generateNames(5);
  };

  const handleUseGeneratedName = async (name: string) => {
    onNameGenerated(name);
    clearGeneratedNames();
  };

  const handleGenerateSingle = async () => {
    const name = generateSingleName();
    onNameGenerated(name);
  };

  return (
    <VStack width="100%" gap={4} align="start">
      <HStack width="100%" gap={2} align="center">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleGenerateNames}
          loading={isGenerating}
        >
          🎲 Сгенерировать названия
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleGenerateSingle}
        >
          ⚡ Одно название
        </Button>
      </HStack>

      {generatedNames.length > 0 && (
        <VStack width="100%" gap={2} align="start">
          <Text fontSize="sm" color="gray.600">
            Выберите одно из предложенных названий:
          </Text>
          <HStack wrap="wrap" gap={2}>
            {generatedNames.map((name: string, index: number) => (
              <Button
                key={index}
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleUseGeneratedName(name)}
                _hover={{ bg: "blue.50" }}
              >
                {name}
              </Button>
            ))}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};
