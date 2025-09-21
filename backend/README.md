# Testoria Backend

Backend API для системы управления тестами Testoria, построенный на NestJS с PostgreSQL.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- PostgreSQL 12+
- npm или yarn

### Установка

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения:
```bash
cp env.example .env
```

3. Обновите `.env` файл с вашими настройками базы данных:
```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/testoria_db?schema=public"
```

4. Примените миграции базы данных:
```bash
npx prisma migrate dev
```

5. Запустите приложение:
```bash
npm run start:dev
```

## 📚 API Документация

### Swagger UI
Интерактивная документация API доступна по адресу: `http://localhost:3000/api/docs`

### Подробная документация
Полная документация API доступна в файле [docs/API.md](docs/API.md).

### Основные endpoints:

- `POST /api/projects` - Создание проекта
- `GET /api/projects` - Получение всех проектов
- `GET /api/projects/:id` - Получение проекта по ID
- `POST /api/test-results` - Создание результата теста
- `POST /api/test-results/jest/:projectId` - Отправка результатов Jest
- `GET /api/test-results/project/:projectId` - Получение результатов тестов проекта

## 🧪 Тестирование

Для тестирования API используйте скрипт:
```bash
./scripts/test-api.sh
```

## 🛠️ Разработка

### Доступные команды

```bash
# Запуск в режиме разработки
npm run start:dev

# Сборка проекта
npm run build

# Запуск в продакшене
npm run start:prod

# Линтинг
npm run lint

# Тестирование
npm run test

# Prisma команды
npx prisma generate    # Генерация Prisma клиента
npx prisma migrate dev # Применение миграций
npx prisma studio     # Открытие Prisma Studio
```

### Структура проекта

```
src/
├── projects/                 # Модуль проектов
│   ├── controllers/         # Контроллеры
│   ├── services/           # Сервисы
│   ├── dto/               # Data Transfer Objects
│   ├── interfaces/        # Интерфейсы
│   └── exceptions/        # Исключения
├── prisma/                # Prisma схема и миграции
└── main.ts               # Точка входа приложения
```

## 🗄️ База данных

Проект использует PostgreSQL с Prisma ORM. Схема базы данных включает:

- **projects** - Проекты
- **test_results** - Результаты тестов
- **users** - Пользователи (для будущего использования)
- **posts** - Посты (для будущего использования)

## 🔧 Конфигурация

### Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `DATABASE_URL` | URL подключения к PostgreSQL | - |
| `PORT` | Порт сервера | 3000 |
| `NODE_ENV` | Окружение | development |
| `FRONTEND_URL` | URL фронтенда для CORS | http://localhost:5173 |

## 📝 Логирование

Приложение использует встроенное логирование NestJS. В режиме разработки логи выводятся в консоль.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под лицензией ISC.
