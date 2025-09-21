#!/bin/bash

# Скрипт для проверки доступности Swagger UI
# Убедитесь, что сервер запущен на порту 3000

echo "🔍 Проверка Swagger UI"
echo "======================"

# Проверка доступности Swagger UI
echo "1. Проверка доступности Swagger UI..."
if curl -s "http://localhost:3000/api/docs" > /dev/null; then
    echo "✅ Swagger UI доступен"
    echo "   URL: http://localhost:3000/api/docs"
else
    echo "❌ Swagger UI недоступен. Убедитесь, что приложение запущено на порту 3000"
    exit 1
fi

# Проверка JSON схемы OpenAPI
echo ""
echo "2. Проверка OpenAPI схемы..."
if curl -s "http://localhost:3000/api/docs-json" | grep -q "openapi"; then
    echo "✅ OpenAPI схема доступна"
    echo "   URL: http://localhost:3000/api/docs-json"
else
    echo "❌ OpenAPI схема недоступна"
fi

# Проверка основных endpoints
echo ""
echo "3. Проверка основных endpoints..."

# Проверка projects endpoint
if curl -s "http://localhost:3000/api/projects" > /dev/null; then
    echo "✅ /api/projects endpoint доступен"
else
    echo "❌ /api/projects endpoint недоступен"
fi

# Проверка test-results endpoint
if curl -s "http://localhost:3000/api/test-results" > /dev/null; then
    echo "✅ /api/test-results endpoint доступен"
else
    echo "❌ /api/test-results endpoint недоступен"
fi

echo ""
echo "🎉 Проверка завершена!"
echo ""
echo "📖 Для просмотра документации откройте:"
echo "   http://localhost:3000/api/docs"
