from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from twilio.twiml.messaging_response import MessagingResponse
from dotenv import load_dotenv
import requests
import os
import asyncio

load_dotenv()

app = FastAPI(title="AI Farming Assistant + Ollama Chatbot")

# -------------------- CORS (for React) --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- ENV --------------------
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")

# =========================================================
# ✅ OLLAMA CHAT ENDPOINT (FOR REACT)
# =========================================================
@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_message = body.get("message")

    if not user_message:
        return {"reply": "Please send a message"}

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.1:8b",
                "prompt": user_message,
                "stream": False
            },
            timeout=120
        )

        data = response.json()

        return {
            "reply": data.get("response", "No response from model")
        }

    except Exception as e:
        return {
            "reply": f"❌ Ollama error: {str(e)}"
        }

# =========================================================
# ✅ WHATSAPP (TWILIO) WEBHOOK
# =========================================================
@app.post("/whatsapp")
async def whatsapp_webhook(request: Request):
    try:
        form = await request.form()
        message_body = form.get("Body", "").strip()

        if not message_body:
            reply = "🌾 விவசாய உதவியாளருக்கு வரவேற்கிறோம்!"
        else:
            # You can switch this to Ollama later if you want
            reply = f"🤖 நீங்கள் அனுப்பிய செய்தி:\n{message_body}"

        resp = MessagingResponse()
        resp.message(reply)
        return Response(str(resp), media_type="application/xml")

    except Exception as e:
        resp = MessagingResponse()
        resp.message(f"❌ Error: {str(e)}")
        return Response(str(resp), media_type="application/xml")

# =========================================================
# ✅ HEALTH CHECK
# =========================================================
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "ollama": "http://localhost:11434",
        "react_chat": "/chat",
        "whatsapp": "/whatsapp"
    }

# =========================================================
# ✅ RUN SERVER
# =========================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
