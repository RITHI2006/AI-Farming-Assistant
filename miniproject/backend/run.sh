#!/bin/bash
# Run script for the backend server

echo "Starting WhatsApp AI Farming Assistant Backend..."
echo "Make sure you have:"
echo "1. Created .env file with API keys"
echo "2. Installed dependencies: pip install -r requirements.txt"
echo "3. Started ngrok: ngrok http 8000"
echo ""
echo "Starting server on http://0.0.0.0:8000"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload





