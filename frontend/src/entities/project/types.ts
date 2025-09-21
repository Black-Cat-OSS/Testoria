import { z } from "zod";

export const addProjectFormSchema = z.object({
  projectName: z
    .string()
    .min(
      2,
      "Название должно содержать минимум 2 символа"
    )
    .max(
      50,
      "Название не должно превышать 50 символов"
    )
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Название может содержать только буквы, цифры, дефисы и подчеркивания"
    )
    .refine(
      (value) =>
        !value.startsWith("-") &&
        !value.endsWith("-"),
      "Название не может начинаться или заканчиваться дефисом"
    ),
  repositoryUrl: z
    .string()
    .min(1, "URL репозитория обязателен")
    .refine((value) => {
      try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    }, "Введите корректный URL (должен начинаться с http:// или https://)")
    .refine((value) => {
      const githubPattern = /github\.com/;
      const gitlabPattern = /gitlab\.com/;
      const bitbucketPattern = /bitbucket\.org/;
      return (
        githubPattern.test(value) ||
        gitlabPattern.test(value) ||
        bitbucketPattern.test(value)
      );
    }, "URL должен быть ссылкой на GitHub, GitLab или Bitbucket"),
});

/**
 * Схема валидации для информации о проекте с тестами
 */
export const projectInfoSchema = z.object({
  id: z.string().uuid("ID должен быть валидным UUID"),
  name: z.string().min(1, "Название проекта обязательно"),
  totalTests: z.number().int().min(0, "Общее количество тестов не может быть отрицательным"),
  passedTests: z.number().int().min(0, "Количество пройденных тестов не может быть отрицательным"),
  failedTests: z.number().int().min(0, "Количество проваленных тестов не может быть отрицательным"),
  skippedTests: z.number().int().min(0, "Количество пропущенных тестов не может быть отрицательным"),
  runningTests: z.number().int().min(0, "Количество тестов в процессе не может быть отрицательным"),
}).refine(
  (data) => {
    const sum = data.passedTests + data.failedTests + data.skippedTests + data.runningTests;
    return sum <= data.totalTests;
  },
  {
    message: "Сумма всех тестов не может превышать общее количество тестов",
    path: ["totalTests"]
  }
);

export type AddProjectFormData = z.infer<typeof addProjectFormSchema>;

/**
 * Тип, выведенный из схемы валидации ProjectInfo
 */
export type ProjectInfoData = z.infer<typeof projectInfoSchema>;

export interface Project {
  id: string;
  name: string;
  repositoryUrl: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'processing';
}

export interface CreateProjectData {
  name: string;
  repositoryUrl: string;
}

/**
 * Информация о проекте с детализацией по тестам
 */
export interface ProjectInfo {
  /** Уникальный идентификатор проекта */
  id: string;
  /** Название проекта */
  name: string;
  /** Общее количество тестов */
  totalTests: number;
  /** Количество пройденных тестов */
  passedTests: number;
  /** Количество проваленных тестов */
  failedTests: number;
  /** Количество пропущенных тестов */
  skippedTests: number;
  /** Количество тестов в процессе прохождения */
  runningTests: number;
}
