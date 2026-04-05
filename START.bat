@echo off
REM Quick Start Script for AI Farming Assistant
REM This script sets up and runs both frontend and backend

echo.
echo ========================================
echo AI Farming Assistant - Quick Start
echo ========================================
echo.

REM Check if running from correct directory
if not exist "backend" (
    echo Error: Run this script from the project root directory
    pause
    exit /b 1
)

echo [1/4] Setting up backend...
cd backend

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv and install requirements
call venv\Scripts\activate.bat
pip install -q -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo ... Creating .env file from template
    copy env.example .env
    echo ⚠️  Please edit backend/.env with your settings
    echo Press any key to continue...
    pause
)

echo [2/4] Starting backend server on http://localhost:8000
start cmd /k "cd backend && venv\Scripts\activate.bat && python main.py"

echo [3/4] Waiting for backend to start...
timeout /t 3 /nobreak

cd ..
cd miniproject

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install -q
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ... Creating .env.local file from template
    copy .env.example .env.local
)

echo [4/4] Starting frontend server on http://localhost:5173
start cmd /k "npm run dev"

echo.
echo ========================================
echo ✅ Servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo Docs:     http://localhost:8000/docs
echo.
echo Close either terminal window to stop servers.
echo.
pause
