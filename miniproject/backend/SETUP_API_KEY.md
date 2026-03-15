# Gemini API Key Setup

## Your Gemini API Key
```
AIzaSyAQQr79iMIftBv5HEo5vNmYks6f9nYvdXc
```

## Setup Instructions

### Step 1: Create .env file

In the `backend` directory, create a `.env` file:

```bash
cd backend
```

Create `.env` file with this content:

```env
# Gemini API Key (Chatbot)
GEMINI_API_KEY=AIzaSyAQQr79iMIftBv5HEo5vNmYks6f9nYvdXc

# Twilio Configuration (Add your Twilio credentials)
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here

# Bhashini API (Optional - for Tamil voice transcription)
BHASHINI_API_KEY=your_bhashini_api_key_here

# Server Configuration
PORT=8000
HOST=0.0.0.0
```

### Step 2: Verify Setup

Run the health check:
```bash
python main.py
```

Then visit: `http://localhost:8000/health`

You should see:
```json
{
  "status": "healthy",
  "twilio_configured": false,
  "ai_configured": true,
  "bhashini_configured": false
}
```

If `ai_configured` is `true`, your Gemini API key is working!

### Step 3: Test the Chatbot

The AI will now respond to WhatsApp messages using Gemini API.

## Security Note

⚠️ **IMPORTANT**: Never commit the `.env` file to git! It's already in `.gitignore`.

## Troubleshooting

If you get errors:
1. Make sure `.env` file is in the `backend` directory
2. Check the API key is correct (no extra spaces)
3. Verify `python-dotenv` is installed: `pip install python-dotenv`
4. Restart the server after changing `.env`





