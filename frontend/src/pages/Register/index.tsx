import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react";
import { FormField } from "@widgets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@hooks";

const registerSchema = z.object({
  login: z
    .string()
    .min(1, "Логин обязателен")
    .min(3, "Логин должен содержать минимум 3 символа")
    .regex(/^[a-zA-Z0-9_-]+$/, "Логин может содержать только буквы, цифры, дефисы и подчеркивания"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  name: z
    .string()
    .min(1, "Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .regex(/^[а-яА-Яa-zA-Z\s]+$/, "Имя может содержать только буквы"),
  surname: z
    .string()
    .min(1, "Фамилия обязательна")
    .min(2, "Фамилия должна содержать минимум 2 символа")
    .regex(/^[а-яА-Яa-zA-Z\s]+$/, "Фамилия может содержать только буквы"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Пароль должен содержать заглавную букву, строчную букву и цифру"),
  confirmPassword: z
    .string()
    .min(1, "Подтверждение пароля обязательно"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setSubmitError("");

    setTimeout(() => {
      try {
        const mockUser = {
          id: `user_${Date.now()}`,
          name: data.name,
          surname: data.surname,
          login: data.login,
          email: data.email,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          publicId: `user_${Date.now()}`,
        };

        setUser(mockUser);
        setIsLoading(false);
        navigate("/");
      } catch {
        setSubmitError("Ошибка при регистрации. Попробуйте еще раз.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <Box w="400px">
      <VStack gap={6} py={6} px={10} bg="white" _dark={{ bg: "gray.800" }} rounded="lg" shadow="lg">
          <VStack gap={2} textAlign="center">
            <Heading size="lg">Регистрация</Heading>
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              Создайте новый аккаунт
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
              <HStack w="full" gap={4}>
                <FormField
                  title="Имя *"
                  inputProps={{
                    placeholder: "Введите имя",
                    ...register("name"),
                    border: "1px solid",
                    borderColor: "gray.300",
                    _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                  }}
                  error={errors.name?.message}
                  vStackProps={{ flex: 1 }}
                />

                <FormField
                  title="Фамилия *"
                  inputProps={{
                    placeholder: "Введите фамилию",
                    ...register("surname"),
                    border: "1px solid",
                    borderColor: "gray.300",
                    _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                  }}
                  error={errors.surname?.message}
                  vStackProps={{ flex: 1 }}
                />
              </HStack>

              <FormField
                title="Логин *"
                inputProps={{
                  placeholder: "Введите логин",
                  ...register("login"),
                  border: "1px solid",
                  borderColor: "gray.300",
                  _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                }}
                error={errors.login?.message}
                vStackProps={{ w: "full" }}
              />

              <FormField
                title="Email *"
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
                title="Пароль *"
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

              <FormField
                title="Подтверждение пароля *"
                inputProps={{
                  type: "password",
                  placeholder: "Подтвердите пароль",
                  ...register("confirmPassword"),
                  border: "1px solid",
                  borderColor: "gray.300",
                  _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }
                }}
                error={errors.confirmPassword?.message}
                vStackProps={{ w: "full" }}
              />

              <Button
                type="submit"
                w="full"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                loading={isLoading}
                loadingText="Регистрация..."
              >
                Зарегистрироваться
              </Button>
            </VStack>
          </Box>

          <HStack gap={2} align="center">
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              Уже есть аккаунт?
            </Text>
            <Button
              variant="ghost"
              color="blue.500"
              onClick={() => navigate("/login")}
            >
              Войти
            </Button>
          </HStack>
      </VStack>
    </Box>
  );
};

export default Register;
