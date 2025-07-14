@echo off
echo ===============================
echo 🚀 Starting Full Production Build
echo ===============================

:: Step 1: Build Vite client
echo 🔧 Building client (Vite) for production...
cd client
call npm install
call npm run build
cd ..

:: Step 2: Build Next.js frontend
echo 🔧 Building frontend (Next.js) for production...
cd frontend
call npm install
call npm run build
cd ..

:: Step 3: Start Flask API with Gunicorn (via new terminal)
echo 🐍 Starting Flask API with Gunicorn...
start cmd /k "cd backend && call pip install -r requirements.txt && call gunicorn -w 4 -b 0.0.0.0:8000 sentiment_api:app"

:: Delay to allow Flask to start
timeout /t 3 >nul

:: Step 4: Start Express server for serving built Vite app (via new terminal)
echo 🧩 Starting Express.js backend (serving Vite dist)...
start cmd /k "cd client && call npm install && call node server.js"

:: Finish
echo ===============================
echo ✅ All services are running in production mode!
echo ===============================
pause


