#!/bin/bash

# Testoria Setup Script
# Этот скрипт устанавливает и настраивает весь проект

set -e

echo "🚀 Начинаем настройку Testoria..."

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Пожалуйста, установите Node.js версии 20 или выше."
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Требуется Node.js версии 20 или выше. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"

# Устанавливаем зависимости Backend
echo "📦 Устанавливаем зависимости Backend..."
cd backend
npm install

# Настраиваем переменные окружения для Backend
if [ ! -f .env ]; then
    echo "⚙️ Создаём .env файл для Backend..."
    cp env.example .env
    echo "📝 Пожалуйста, отредактируйте backend/.env с настройками вашей базы данных"
fi

# Генерируем Prisma клиент
echo "🔧 Генерируем Prisma клиент..."
npm run prisma:generate

cd ..

# Устанавливаем зависимости Frontend
echo "📦 Устанавливаем зависимости Frontend..."
cd frontend
npm install

# Настраиваем переменные окружения для Frontend
if [ ! -f .env ]; then
    echo "⚙️ Создаём .env файл для Frontend..."
    cp env.example .env
fi

cd ..

echo "✅ Настройка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Настройте базу данных PostgreSQL"
echo "2. Отредактируйте backend/.env с настройками базы данных"
echo "3. Выполните миграции: cd backend && npm run prisma:migrate"
echo "4. Запустите Backend: cd backend && npm run start:dev"
echo "5. Запустите Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend будет доступен по адресу: http://localhost:5173"
echo "🔧 Backend API будет доступен по адресу: http://localhost:3000"
