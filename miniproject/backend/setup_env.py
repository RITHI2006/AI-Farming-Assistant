"""
Quick setup script to create .env file with Gemini API key
"""

import os
from pathlib import Path

# Gemini API Key
GEMINI_API_KEY = "AIzaSyAQQr79iMIftBv5HEo5vNmYks6f9nYvdXc"

# Create .env file
env_path = Path(".env")

if env_path.exists():
    print("[WARNING] .env file already exists!")
    response = input("Do you want to update GEMINI_API_KEY? (y/n): ")
    if response.lower() != 'y':
        print("Cancelled.")
        exit(0)
    
    # Read existing .env
    with open(env_path, 'r') as f:
        content = f.read()
    
    # Update or add GEMINI_API_KEY
    lines = content.split('\n')
    updated = False
    new_lines = []
    
    for line in lines:
        if line.startswith('GEMINI_API_KEY='):
            new_lines.append(f'GEMINI_API_KEY={GEMINI_API_KEY}')
            updated = True
        else:
            new_lines.append(line)
    
    if not updated:
        new_lines.append(f'GEMINI_API_KEY={GEMINI_API_KEY}')
    
    content = '\n'.join(new_lines)
else:
    # Create new .env file
    content = f"""# Gemini API Key (Chatbot)
GEMINI_API_KEY={GEMINI_API_KEY}

# Twilio Configuration (Add your credentials)
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here

# Bhashini API (Optional - for Tamil voice transcription)
BHASHINI_API_KEY=your_bhashini_api_key_here

# Server Configuration
PORT=8000
HOST=0.0.0.0
"""

# Write .env file
with open(env_path, 'w') as f:
    f.write(content)

print("[SUCCESS] .env file created/updated successfully!")
print(f"[SUCCESS] Gemini API Key configured: {GEMINI_API_KEY[:20]}...")
print("\n[INFO] Next steps:")
print("1. Add your Twilio credentials to .env file")
print("2. Run: python main.py")
print("3. Test: http://localhost:8000/health")

