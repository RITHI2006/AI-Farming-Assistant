# WhatsApp AI Farming Assistant - Backend

FastAPI backend for handling WhatsApp messages via Twilio API with AI-powered farming assistance.

## Features

- 📱 **WhatsApp Integration** - Receive messages via Twilio webhook
- 🖼️ **Image Processing** - Disease detection from crop leaf images
- 🎤 **Voice Transcription** - Tamil voice to text conversion (Bhashini/Whisper)
- 🤖 **AI Responses** - LangChain with Gemini/OpenAI for intelligent farming advice
- 🌾 **Tamil Language Support** - All responses in Tamil

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env` file:
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
GEMINI_API_KEY=your_gemini_api_key
# OR
OPENAI_API_KEY=your_openai_api_key
BHASHINI_API_KEY=your_bhashini_api_key (optional)
```

### 3. Run the Server

```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Twilio WhatsApp Setup

### Step 1: Twilio Sandbox Setup

1. Sign up at [Twilio](https://www.twilio.com/)
2. Go to WhatsApp Sandbox in Twilio Console
3. Send the join code to the Twilio WhatsApp number from your phone
4. You'll receive a confirmation message

### Step 2: Expose Local Server (Ngrok)

Since Twilio needs a public URL, use Ngrok:

1. Install Ngrok: https://ngrok.com/download
2. Run: `ngrok http 8000`
3. Copy the forwarding URL (e.g., `https://abc123.ngrok-free.app`)
4. In Twilio Console → WhatsApp Sandbox → "A Message Comes In"
5. Paste: `https://abc123.ngrok-free.app/whatsapp`
6. Save

### Step 3: Test

Send a message to your Twilio WhatsApp number:
- Text: "வணக்கம்"
- Image: Send a crop leaf photo
- Voice: Send a voice note in Tamil

## API Endpoints

### POST `/whatsapp`
Main webhook endpoint for Twilio WhatsApp messages.

**Handles:**
- Text messages → AI response
- Image messages → Disease detection
- Voice messages → Transcription + AI response

### GET `/`
Health check endpoint.

### GET `/health`
Detailed health check with configuration status.

## Message Flow

1. **Text Message:**
   - User sends text → AI generates response → Send back via Twilio

2. **Image Message:**
   - User sends image → Download from Twilio → Detect disease → Generate response → Send back

3. **Voice Message:**
   - User sends voice → Download from Twilio → Transcribe (Bhashini/Whisper) → AI generates response → Send back

## Placeholder Functions

### `detect_disease(image_path)`
Currently returns mock disease data. TODO: Integrate TensorFlow Lite model.

### `transcribe_voice_tamil(audio_path)`
Currently returns mock transcription. TODO: Integrate Bhashini API or OpenAI Whisper.

## Error Handling

- Network errors are caught and user-friendly Tamil error messages are sent
- Media download failures are handled gracefully
- AI API failures fall back to error messages

## Development

```bash
# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Check logs
tail -f logs/app.log
```

## Production Deployment

For production, consider:
- Using a proper web server (Gunicorn + Uvicorn workers)
- Setting up proper logging
- Using environment-specific .env files
- Adding rate limiting
- Implementing authentication for webhook endpoints





