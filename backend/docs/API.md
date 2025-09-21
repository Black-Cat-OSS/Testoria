# Testoria Backend API

## Описание

Backend API для системы управления тестами Testoria. Предоставляет endpoints для управления проектами и результатами тестов.

## Технологический стек

- **Node.js**: Среда выполнения
- **NestJS**: Фреймворк для создания API
- **TypeScript**: Язык программирования
- **PostgreSQL**: База данных
- **Prisma**: ORM для работы с базой данных
- **class-validator**: Валидация данных
- **Swagger/OpenAPI**: Автоматическая генерация документации API

## Переменные окружения

Создайте файл `.env` на основе `env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/testoria_db?schema=public"

# Server
PORT=3000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# JWT (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

## Запуск приложения

### Установка зависимостей
```bash
npm install
```

### Генерация Prisma клиента
```bash
npx prisma generate
```

### Применение миграций
```bash
npx prisma migrate dev
```

### Запуск в режиме разработки
```bash
npm run start:dev
```

### Запуск в продакшене
```bash
npm run build
npm run start:prod
```

## 📚 Swagger UI

После запуска приложения документация API доступна в интерактивном режиме:

**URL**: `http://localhost:3000/api/docs`

Swagger UI предоставляет:
- Полную документацию всех endpoints
- Интерактивное тестирование API
- Примеры запросов и ответов
- Схемы данных (DTO)
- Коды ошибок и их описания

## API Endpoints

### Проекты

#### POST /api/projects
Создает новый проект.

**Тело запроса:**
```json
{
  "name": "Название проекта"
}
```

**Ответ:**
```json
{
  "id": "uuid",
  "name": "Название проекта",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/projects
Получает все проекты.

**Ответ:**
```json
[
  {
    "id": "uuid",
    "name": "Название проекта",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/projects/:id
Получает проект по идентификатору.

**Ответ:**
```json
{
  "id": "uuid",
  "name": "Название проекта",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Результаты тестов

#### POST /api/test-results
Создает результат теста.

**Тело запроса:**
```json
{
  "projectId": "uuid",
  "testName": "Название теста",
  "status": "passed",
  "duration": 150.5,
  "errorMessage": "Сообщение об ошибке",
  "stackTrace": "Стек вызовов",
  "rawData": {}
}
```

**Ответ:**
```json
{
  "id": "uuid",
  "projectId": "uuid",
  "testName": "Название теста",
  "status": "passed",
  "duration": 150.5,
  "errorMessage": "Сообщение об ошибке",
  "stackTrace": "Стек вызовов",
  "rawData": {},
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /api/test-results/jest/:projectId
Отправляет результаты тестов Jest в формате JSON.

**Тело запроса:**
```json
{
  "testResults": [
    {
      "assertionResults": [
        {
          "title": "Название теста",
          "status": "passed",
          "duration": 150.5,
          "failureMessages": []
        }
      ]
    }
  ]
}
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "projectId": "uuid",
    "testName": "Название теста",
    "status": "passed",
    "duration": 150.5,
    "errorMessage": null,
    "stackTrace": null,
    "rawData": {},
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/test-results/:id
Получает результат теста по идентификатору.

#### GET /api/test-results/project/:projectId
Получает все результаты тестов для проекта.

## Коды ошибок

- **400 Bad Request**: Некорректные данные запроса
- **404 Not Found**: Ресурс не найден
- **500 Internal Server Error**: Внутренняя ошибка сервера

## Примеры использования

### Создание проекта
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "Мой тестовый проект"}'
```

### Отправка результатов Jest
```bash
curl -X POST http://localhost:3000/api/test-results/jest/PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "testResults": [
      {
        "assertionResults": [
          {
            "title": "should pass test",
            "status": "passed",
            "duration": 100
          }
        ]
      }
    ]
  }'
```
