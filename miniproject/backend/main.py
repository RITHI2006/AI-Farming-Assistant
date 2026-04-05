from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from twilio.twiml.messaging_response import MessagingResponse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import requests
import os
from datetime import datetime

# Import auth modules
from schemas import SignupRequest, LoginRequest, UserResponse, TokenResponse
from auth import hash_password, verify_password, create_access_token, decode_token

load_dotenv()

# ===================== MONGODB SETUP =====================
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["ai_farming"]
users_collection = db["users"]

# ===================== FASTAPI INIT =====================
app = FastAPI(title="AI Farming Assistant + Ollama Chatbot")

# ===================== CORS =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== HELPER =====================
def format_user(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "state": user["state"],
        "district": user.get("district", ""),
        "is_active": user.get("is_active", True),
        "created_at": user.get("created_at", datetime.utcnow())
    }

# =========================================================
# ✅ AUTHENTICATION
# =========================================================

@app.post("/auth/signup", response_model=TokenResponse)
async def signup(request: SignupRequest):

    # Check email
    if await users_collection.find_one({"email": request.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check phone
    if await users_collection.find_one({"phone": request.phone}):
        raise HTTPException(status_code=400, detail="Phone already exists")

    # Hash password
    try:
        hashed_password = hash_password(request.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Store user
    user_data = {
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "state": request.state,
        "district": request.district or "",
        "password_hash": hashed_password,
        "is_active": True,
        "created_at": datetime.utcnow()
    }

    result = await users_collection.insert_one(user_data)
    user = await users_collection.find_one({"_id": result.inserted_id})

    # Token
    access_token = create_access_token(str(user["_id"]), user["email"])

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(**format_user(user)),
        message="Account created successfully"
    )


@app.post("/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):

    user = await users_collection.find_one({"email": request.email})

    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account inactive")

    access_token = create_access_token(str(user["_id"]), user["email"])

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(**format_user(user)),
        message="Login successful"
    )


@app.get("/auth/me", response_model=UserResponse)
async def get_current_user(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token = authorization.split(" ")[1]
    except:
        raise HTTPException(status_code=401, detail="Invalid token format")

    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = await users_collection.find_one({"_id": ObjectId(token_data["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(**format_user(user))


@app.get("/auth/verify/{token}")
async def verify_token(token: str):

    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = await users_collection.find_one({"_id": ObjectId(token_data["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "valid": True,
        "user": format_user(user)
    }


@app.get("/users/all")
async def get_all_users():

    users = []
    async for user in users_collection.find({}):
        users.append(format_user(user))

    return {
        "total_users": len(users),
        "users": users
    }

# =========================================================
# ✅ CHAT (OLLAMA)
# =========================================================
@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    message = body.get("message")

    if not message:
        return {"reply": "Please send a message"}

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.1:8b",
                "prompt": message,
                "stream": False
            },
            timeout=120
        )

        data = response.json()
        return {"reply": data.get("response", "No response")}

    except Exception as e:
        return {"reply": f"Error: {str(e)}"}

# =========================================================
# ✅ WHATSAPP
# =========================================================
@app.post("/whatsapp")
async def whatsapp_webhook(request: Request):
    try:
        form = await request.form()
        msg = form.get("Body", "").strip()

        reply = "🌾 Welcome!" if not msg else f"🤖 You said:\n{msg}"

        resp = MessagingResponse()
        resp.message(reply)

        return Response(str(resp), media_type="application/xml")

    except Exception as e:
        resp = MessagingResponse()
        resp.message(f"Error: {str(e)}")
        return Response(str(resp), media_type="application/xml")

# =========================================================
# ✅ HEALTH
# =========================================================
@app.get("/health")
async def health():
    return {"status": "ok"}

# =========================================================
# ✅ RUN
# =========================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)