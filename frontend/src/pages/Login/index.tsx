import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { FormField } from "@widgets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@hooks";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setSubmitError("");

    setTimeout(() => {
      try {
        const mockUser = {
          id: "1",
          name: "Иван",
          surname: "Иванов",
          login: "ivan.ivanov",
          email: data.email,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          publicId: "user_1",
        };

        setUser(mockUser);
        setIsLoading(false);
        navigate("/");
      } catch {
        setSubmitError("Ошибка при входе. Проверьте данные и попробуйте еще раз.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Box w="400px">
      <VStack gap={6} py={6} px={10} bg="white" _dark={{ bg: "gray.800" }} rounded="lg" shadow="lg">
          <VStack gap={2} textAlign="center">
            <Heading size="lg">Вход в аккаунт</Heading>
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              Введите свои данные для входа
            </Text>
          </VStack>

          {submitError && (
            <Box bg="red.50" border="1px solid" borderColor="red.200" rounded="md" p={4}>
              <Text color="red.800" fontWeight="bold" mb={1}>Ошибка!</Text>
              <Text color="red.700">{submitError}</Text>
            </Box>
          )}

          <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
            <VStack gap={3}>
              <FormField
                title="Email"
                inputProps={{
                  type: "email",
                  placeholder: "Введите email",
                  ...register("email"),
                  border: "1px solid",
                  borderColor: "gray.300",
                  _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                }}
                error={errors.email?.message}
                vStackProps={{ w: "full" }}
              />

              <FormField
                title="Пароль"
                inputProps={{
                  type: "password",
                  placeholder: "Введите пароль",
                  ...register("password"),
                  border: "1px solid",
                  borderColor: "gray.300",
                  _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                }}
                error={errors.password?.message}
                vStackProps={{ w: "full" }}
              />

              <Button
                type="submit"
                w="full"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                loading={isLoading}
                loadingText="Вход..."
              >
                Войти
              </Button>
            </VStack>
          </Box>

          <Stack direction="row" gap={2} align="center">
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              Нет аккаунта?
            </Text>
            <Button
              variant="ghost"
              color="blue.500"
              onClick={() => navigate("/register")}
            >
              Зарегистрироваться
            </Button>
          </Stack>
      </VStack>
    </Box>
  );
};

export default Login;
