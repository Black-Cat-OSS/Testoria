#!/bin/bash

# Скрипт для тестирования API endpoints
# Убедитесь, что сервер запущен на порту 3000

BASE_URL="http://localhost:3000/api"

echo "🧪 Тестирование Testoria API"
echo "================================"

# Проверка доступности сервера
echo "1. Проверка доступности сервера..."
if curl -s "$BASE_URL/projects" > /dev/null; then
    echo "✅ Сервер доступен"
else
    echo "❌ Сервер недоступен. Убедитесь, что приложение запущено на порту 3000"
    exit 1
fi

# Создание проекта
echo ""
echo "2. Создание тестового проекта..."
PROJECT_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Content-Type: application/json" \
  -d '{"name": "Тестовый проект API"}')

if echo "$PROJECT_RESPONSE" | grep -q "id"; then
    echo "✅ Проект создан успешно"
    PROJECT_ID=$(echo "$PROJECT_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   ID проекта: $PROJECT_ID"
else
    echo "❌ Ошибка создания проекта:"
    echo "$PROJECT_RESPONSE"
    exit 1
fi

# Получение всех проектов
echo ""
echo "3. Получение всех проектов..."
PROJECTS_RESPONSE=$(curl -s "$BASE_URL/projects")
if echo "$PROJECTS_RESPONSE" | grep -q "id"; then
    echo "✅ Проекты получены успешно"
    echo "   Количество проектов: $(echo "$PROJECTS_RESPONSE" | grep -o '"id"' | wc -l)"
else
    echo "❌ Ошибка получения проектов:"
    echo "$PROJECTS_RESPONSE"
fi

# Создание результата теста
echo ""
echo "4. Создание результата теста..."
TEST_RESULT_RESPONSE=$(curl -s -X POST "$BASE_URL/test-results" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"testName\": \"Тест API\",
    \"status\": \"passed\",
    \"duration\": 150.5,
    \"rawData\": {\"test\": \"data\"}
  }")

if echo "$TEST_RESULT_RESPONSE" | grep -q "id"; then
    echo "✅ Результат теста создан успешно"
else
    echo "❌ Ошибка создания результата теста:"
    echo "$TEST_RESULT_RESPONSE"
fi

# Отправка результатов Jest
echo ""
echo "5. Отправка результатов Jest..."
JEST_RESPONSE=$(curl -s -X POST "$BASE_URL/test-results/jest/$PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "testResults": [
      {
        "assertionResults": [
          {
            "title": "Jest тест 1",
            "status": "passed",
            "duration": 100
          },
          {
            "title": "Jest тест 2",
            "status": "failed",
            "duration": 200,
            "failureMessages": ["Тест провалился"]
          }
        ]
      }
    ]
  }')

if echo "$JEST_RESPONSE" | grep -q "id"; then
    echo "✅ Результаты Jest отправлены успешно"
    echo "   Количество результатов: $(echo "$JEST_RESPONSE" | grep -o '"id"' | wc -l)"
else
    echo "❌ Ошибка отправки результатов Jest:"
    echo "$JEST_RESPONSE"
fi

# Получение результатов тестов для проекта
echo ""
echo "6. Получение результатов тестов для проекта..."
TEST_RESULTS_RESPONSE=$(curl -s "$BASE_URL/test-results/project/$PROJECT_ID")
if echo "$TEST_RESULTS_RESPONSE" | grep -q "id"; then
    echo "✅ Результаты тестов получены успешно"
    echo "   Количество результатов: $(echo "$TEST_RESULTS_RESPONSE" | grep -o '"id"' | wc -l)"
else
    echo "❌ Ошибка получения результатов тестов:"
    echo "$TEST_RESULTS_RESPONSE"
fi

echo ""
echo "🎉 Тестирование завершено!"
