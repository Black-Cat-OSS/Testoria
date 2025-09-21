#!/bin/bash

# Testoria Development Start Script
# Этот скрипт запускает Backend и Frontend в режиме разработки

set -e

echo "🚀 Запускаем Testoria в режиме разработки..."

# Функция для очистки процессов при завершении
cleanup() {
    echo "🛑 Останавливаем сервисы..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Устанавливаем обработчик сигналов
trap cleanup SIGINT SIGTERM

# Запускаем Backend
echo "🔧 Запускаем Backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Ждём немного, чтобы Backend успел запуститься
sleep 3

# Запускаем Frontend
echo "🌐 Запускаем Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Сервисы запущены!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3000"
echo ""
echo "Нажмите Ctrl+C для остановки всех сервисов"

# Ждём завершения процессов
wait
