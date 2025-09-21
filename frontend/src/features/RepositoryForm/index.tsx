import { Button } from "@chakra-ui/react/button";
import { Input } from "@chakra-ui/react/input";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const gitUrlSchema = z.object({
  repoUrl: z
    .string()
    .min(1, "URL репозитория обязателен")
    .url("Введите корректный URL")
    .refine(
      (url) => {
        const gitUrlPattern = /^https?:\/\/.*\.git$/i;
        const githubPattern = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/.*$/i;
        return gitUrlPattern.test(url) || githubPattern.test(url);
      },
      "URL должен быть ссылкой на Git репозиторий (например: https://github.com/user/repo.git)"
    ),
});

type FormData = z.infer<typeof gitUrlSchema>;

export const RepositoryForm = () => {
  useDocumentTitle("RepoDok - Введите URL репозитория");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(gitUrlSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    navigate("/processing", { state: { repositoryUrl: data.repoUrl } });
  };

  return (
    <VStack gap={4} align="stretch">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={2} align="stretch">
          <HStack w="600px" gap={0}>
            <Input
              placeholder="https://github.com/your-repo.git"
              size="lg"
              borderEndRadius={0}
              {...register("repoUrl")}
              _invalid={{ borderColor: "red.500" }}
            />
            <Button
              type="submit"
              colorScheme="light"
              colorPalette={"blue"}
              size="lg"
              variant={"solid"}
              disabled={!isValid}
              borderStartRadius={0}
              minW="100px"
            >
              Далее
            </Button>
          </HStack>
          {errors.repoUrl && (
            <Text color="red.500" fontSize="sm" textAlign="left">
              {errors.repoUrl.message}
            </Text>
          )}
        </VStack>
      </form>
    </VStack>
  );
};
