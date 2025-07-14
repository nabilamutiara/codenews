@echo off
echo =============================
echo Starting Flask API...
echo =============================
start cmd /k "cd backend && python sentiment_api.py"

timeout /t 2 >nul

echo =============================
echo Starting Express.js backend...
echo =============================
start cmd /k "npm run server"

timeout /t 2 >nul

echo =============================
echo Starting Vite client...
echo =============================
start cmd /k "cd client && npm run dev"

timeout /t 2 >nul

echo =============================
echo Starting Next.js frontend...
echo =============================
start cmd /k "cd frontend && npm run dev"

echo =============================
echo All services launched!
echo =============================
