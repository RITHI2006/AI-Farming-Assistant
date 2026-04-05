#!/bin/bash
# Quick Start Script for AI Farming Assistant (macOS/Linux)

echo ""
echo "========================================"
echo "AI Farming Assistant - Quick Start"
echo "========================================"
echo ""

# Check if running from correct directory
if [ ! -d "backend" ]; then
    echo "Error: Run this script from the project root directory"
    exit 1
fi

echo "[1/4] Setting up backend..."
cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv and install requirements
source venv/bin/activate
pip install -q -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "... Creating .env file from template"
    cp env.example .env
    echo "⚠️  Please edit backend/.env with your settings"
    read -p "Press enter to continue..."
fi

echo "[2/4] Starting backend server on http://localhost:8000"
python main.py &
BACKEND_PID=$!

echo "[3/4] Waiting for backend to start..."
sleep 3

cd ../miniproject

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install -q
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "... Creating .env.local file from template"
    cp .env.example .env.local
fi

echo "[4/4] Starting frontend server on http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "✅ Servers are starting..."
echo "========================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "Docs:     http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
