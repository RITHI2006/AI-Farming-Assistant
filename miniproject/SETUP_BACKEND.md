# Backend Setup Guide - WhatsApp AI Farming Assistant

## Quick Start

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or install individually:
```bash
pip install fastapi uvicorn twilio requests python-dotenv langchain-google-genai langchain-openai aiohttp python-multipart
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
GEMINI_API_KEY=your_gemini_api_key_here
# OR use OpenAI instead
OPENAI_API_KEY=your_openai_api_key_here
# Optional: For Tamil voice transcription
BHASHINI_API_KEY=your_bhashini_api_key_here
```

### 3. Run the Server

**Windows:**
```bash
python main.py
```
or
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Linux/Mac:**
```bash
chmod +x run.sh
./run.sh
```

Server will start on `http://localhost:8000`

### 4. Expose with Ngrok

Since Twilio needs a public URL:

1. **Install Ngrok:**
   - Download from https://ngrok.com/download
   - Or: `choco install ngrok` (Windows) / `brew install ngrok` (Mac)

2. **Run Ngrok:**
   ```bash
   ngrok http 8000
   ```

3. **Copy the Forwarding URL:**
   - Example: `https://abc123.ngrok-free.app`
   - Copy this URL

### 5. Configure Twilio WhatsApp Sandbox

1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Messaging** → **Try it out** → **Send a WhatsApp message**
3. Click **Sandbox** tab
4. In **"A Message Comes In"** field, paste:
   ```
   https://your-ngrok-url.ngrok-free.app/whatsapp
   ```
5. Click **Save**

### 6. Connect Your Phone

1. Send the join code to the Twilio WhatsApp number shown in the console
2. Example: Send `join <code>` to `+1 415 523 8886`
3. You'll receive a confirmation message

### 7. Test the Bot

Send messages to the Twilio WhatsApp number:

- **Text:** "வணக்கம்" or "என் பயிரில் நோய் வந்திருக்கிறது"
- **Image:** Send a crop leaf photo
- **Voice:** Send a voice note in Tamil

## API Endpoints

### POST `/whatsapp`
Main webhook for Twilio WhatsApp messages.

### GET `/`
Health check.

### GET `/health`
Detailed health check with API configuration status.

## Getting API Keys

### Twilio
1. Sign up at https://www.twilio.com/
2. Get Account SID and Auth Token from dashboard

### Gemini API
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Copy to `.env` file

### OpenAI (Alternative)
1. Go to https://platform.openai.com/api-keys
2. Create API key
3. Copy to `.env` file

### Bhashini API (Optional)
1. Visit https://bhashini.gov.in/
2. Register and get API key
3. Copy to `.env` file

## Troubleshooting

### Server won't start
- Check if port 8000 is available
- Verify all dependencies are installed
- Check `.env` file exists and has correct format

### Ngrok not working
- Make sure ngrok is installed
- Check if port 8000 matches your server port
- Verify ngrok account is authenticated

### Twilio webhook not receiving messages
- Verify ngrok URL is correct in Twilio console
- Check server logs for incoming requests
- Ensure webhook URL ends with `/whatsapp`
- Test webhook with: `curl -X POST http://localhost:8000/whatsapp`

### AI not responding
- Verify GEMINI_API_KEY or OPENAI_API_KEY is set
- Check API key is valid
- Check server logs for errors

## Next Steps

1. **Integrate TensorFlow Lite:**
   - Replace `detect_disease()` function with actual model
   - Load model in `main.py`

2. **Integrate Bhashini API:**
   - Replace `transcribe_voice_tamil()` function
   - Add actual API calls

3. **Add Database:**
   - Store conversation history
   - Track user queries

4. **Deploy to Production:**
   - Use services like Railway, Render, or AWS
   - Set up proper domain
   - Configure SSL

## Support

For issues, check:
- Server logs in terminal
- Twilio console logs
- Ngrok web interface

