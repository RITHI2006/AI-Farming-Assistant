"""
Create .env file with Gemini API key
"""

GEMINI_API_KEY = "AIzaSyAQQr79iMIftBv5HEo5vNmYks6f9nYvdXc"

env_content = f"""# Gemini API Key (Chatbot)
GEMINI_API_KEY={GEMINI_API_KEY}

# Twilio Configuration (Add your credentials)
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here

# Bhashini API (Optional - for Tamil voice transcription)
BHASHINI_API_KEY=your_bhashini_api_key_here

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017

# Server Configuration
PORT=8000
HOST=0.0.0.0
"""

with open(".env", "w") as f:
    f.write(env_content)

print("SUCCESS: .env file created with Gemini API key!")
print(f"Gemini API Key: {GEMINI_API_KEY[:20]}...")





