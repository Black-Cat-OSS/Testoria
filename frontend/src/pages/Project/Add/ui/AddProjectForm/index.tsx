import { Button, VStack } from "@chakra-ui/react";
import { FormField } from "@widgets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProjectFormData, addProjectFormSchema } from "@entities";
import { ProjectNameGenerator } from "../ProjectNameGenerator";
import { ProjectFormProvider } from "../../contexts/ProjectFormContext";


export const AddProjectForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddProjectFormData>({
    resolver: zodResolver(addProjectFormSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      repositoryUrl: "",
    },
  });

  const handleNameGenerated = async (name: string) => {
    setValue("projectName", name);
    await trigger("projectName");
  };

  const onSubmit = (data: AddProjectFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <ProjectFormProvider onNameGenerated={handleNameGenerated}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width="500px" gap={4} align="start">
          <FormField
            title="Введите название проекта"
            vStackProps={{
              width: "100%",
            }}
            inputProps={{
              placeholder: "Например: nextjs-app",
              ...register("projectName"),
            }}
            error={errors.projectName?.message}
          />

          <ProjectNameGenerator />

          <FormField
            title="Введите URL репозитория"
            vStackProps={{
              width: "100%",
            }}
            inputProps={{
              placeholder:
                "https://github.com/your-repo.git",
              ...register("repositoryUrl"),
            }}
            error={errors.repositoryUrl?.message}
          />

          <Button
            type="submit"
            width="100%"
            bg={"blue.600"}
            color={"white"}
            mt={4}
            disabled={!isValid}
          >
            Далее
          </Button>
        </VStack>
      </form>
    </ProjectFormProvider>
  );
};
