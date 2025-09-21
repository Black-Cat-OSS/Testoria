# Testoria - Полнофункциональное веб-приложение

## Описание

Testoria - это современное веб-приложение, состоящее из двух частей:
- **Backend**: NestJS API с TypeScript, Prisma ORM и PostgreSQL
- **Frontend**: React 19 приложение с Vite, ChakraUI и поддержкой тем

## Технологический стек

### Backend
- **Node.js** - среда выполнения
- **NestJS** - фреймворк для Node.js
- **TypeScript** - основной язык программирования
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - реляционная база данных
- **class-validator** - валидация данных
- **class-transformer** - трансформация данных

### Frontend
- **Node.js** - среда выполнения
- **React 19** - библиотека для создания пользовательских интерфейсов
- **Vite** - сборщик и dev-сервер
- **TypeScript** - основной язык программирования
- **ChakraUI** - UI библиотека компонентов
- **Framer Motion** - анимации
- **Emotion** - CSS-in-JS библиотека

## Структура проекта

```
Testoria/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── env.example
├── frontend/               # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── theme/
│   │   └── App.tsx
│   ├── package.json
│   └── env.example
└── docs/                   # Документация
    └── README.md
```

## Установка и запуск

### Предварительные требования

- Node.js (версия 20 или выше)
- PostgreSQL (версия 12 или выше)
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd Testoria
```

### 2. Настройка Backend

```bash
cd backend

# Установка зависимостей
npm install

# Настройка переменных окружения
cp env.example .env
# Отредактируйте .env файл с вашими настройками базы данных

# Генерация Prisma клиента
npm run prisma:generate

# Создание и применение миграций
npm run prisma:migrate

# Запуск в режиме разработки
npm run start:dev
```

### 3. Настройка Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Настройка переменных окружения
cp env.example .env
# Отредактируйте .env файл с URL вашего API

# Запуск в режиме разработки
npm run dev
```

## Переменные окружения

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/testoria_db?schema=public"

# Server
PORT=3000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# JWT (для будущей аутентификации)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### Frontend (.env)

```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=Testoria
VITE_APP_VERSION=1.0.0
```

## Доступные скрипты

### Backend

- `npm run start` - запуск в продакшн режиме
- `npm run start:dev` - запуск в режиме разработки с hot-reload
- `npm run start:debug` - запуск в режиме отладки
- `npm run build` - сборка проекта
- `npm run prisma:generate` - генерация Prisma клиента
- `npm run prisma:migrate` - применение миграций базы данных
- `npm run prisma:studio` - запуск Prisma Studio

### Frontend

- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка для продакшна
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода линтером

## API Endpoints

### Основные

- `GET /` - приветственное сообщение
- `GET /health` - проверка состояния API

### Структура ответа Health Check

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## База данных

### Модели

#### User
- `id` (String, Primary Key) - уникальный идентификатор
- `email` (String, Unique) - email пользователя
- `name` (String, Optional) - имя пользователя
- `createdAt` (DateTime) - дата создания
- `updatedAt` (DateTime) - дата обновления

#### Post
- `id` (String, Primary Key) - уникальный идентификатор
- `title` (String) - заголовок поста
- `content` (String, Optional) - содержимое поста
- `published` (Boolean) - статус публикации
- `authorId` (String, Foreign Key) - ID автора
- `author` (User) - связь с пользователем
- `createdAt` (DateTime) - дата создания
- `updatedAt` (DateTime) - дата обновления

## Особенности

### Backend
- Полная поддержка TypeScript
- Автоматическая валидация входящих данных
- CORS настроен для работы с frontend
- Глобальные pipes для трансформации данных
- Модульная архитектура NestJS

### Frontend
- React 19 с новейшими возможностями
- Поддержка светлой и тёмной темы
- Адаптивный дизайн с ChakraUI
- TypeScript для типобезопасности
- Vite для быстрой разработки

## Разработка

### Добавление новых модулей (Backend)

Следуйте структуре модулей согласно правилам проекта:

```
(ModuleName)Module/
├── Interfaces/
│   └── I(InterfaceName).cs
├── DTO/
│   └── (ObjectName)DTO.cs
├── Controllers/
│   └── (ControllerName)Controller.cs
├── Services/
│   └── (ServiceName)Service.cs
├── Exceptions/
│   └── (ExceptionName)Exception.cs
├── Extensions/
│   └── (ExtensionName)Extension.cs
└── Events/
    └── (EventName)Event.cs
```

### Стиль кода

- Используйте JSDoc для JavaScript/TypeScript
- Избегайте комментариев в коде
- Применяйте принципы ООП: полиморфизм, наследование, инкапсуляция
- Используйте `sealed` для классов без наследования
- Делайте DTO readonly

## Устранение неполадок

### Backend не запускается
1. Проверьте, что PostgreSQL запущен
2. Убедитесь, что DATABASE_URL корректный
3. Выполните `npm run prisma:generate`

### Frontend не подключается к Backend
1. Проверьте, что Backend запущен на порту 3000
2. Убедитесь, что VITE_API_URL корректный
3. Проверьте CORS настройки

### Ошибки базы данных
1. Выполните `npm run prisma:migrate`
2. Проверьте подключение к PostgreSQL
3. Убедитесь, что база данных существует

## Лицензия

См. файл LICENSE в корне проекта.
