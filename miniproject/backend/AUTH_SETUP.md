# Backend Authentication Setup Guide

## 📦 Installation

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

## 🔧 Environment Setup

Create `.env` file in `backend/` folder:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ai_farming
SECRET_KEY=your-super-secret-key-change-in-production-123456
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## 🚀 Running Backend

```bash
cd backend
python main.py
# Or use uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: `http://localhost:8000`

## 📚 API Endpoints

### 1. **Sign Up**
```
POST /auth/signup
Content-Type: application/json

{
  "name": "John Farmer",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "password": "password123",
  "confirm_password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "John Farmer",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "is_active": true,
    "created_at": "2024-04-05T10:30:00"
  },
  "message": "Account created successfully!"
}
```

### 2. **Login**
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": { ... },
  "message": "Login successful!"
}
```

### 3. **Get Current User**
```
GET /auth/me
Headers: Authorization: Bearer {access_token}

Response:
{
  "id": 1,
  "name": "John Farmer",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "is_active": true,
  "created_at": "2024-04-05T10:30:00"
}
```

### 4. **Verify Token**
```
GET /auth/verify/{token}

Response:
{
  "valid": true,
  "user": { ... }
}
```

### 5. **Get All Users** (Admin)
```
GET /users/all

Response:
{
  "total_users": 5,
  "users": [ ... ]
}
```

## 🔐 Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Email validation
✅ Phone number validation
✅ CORS enabled
✅ Token expiration (30 days)
✅ Database validation (unique email & phone)

## 📊 Database Schema

### Users Table
```
id (Integer, Primary Key)
name (String, 100)
email (String, 100, Unique)
phone (String, 10, Unique)
state (String, 50)
district (String, 50)
password_hash (String, 255)
is_active (Boolean)
created_at (DateTime)
updated_at (DateTime)
```

## 🔄 Frontend Integration

Frontend is updated with `authAPI.js` service that:
- Handles signup/login requests
- Stores JWT token in localStorage
- Auto-adds token to API headers
- Manages user state

## ⚠️ Important Notes

- Change `SECRET_KEY` in production
- Use HTTPS in production
- Token expires after 30 days
- Database file: `farmers.db` (SQLite)
- All endpoints have CORS enabled
- Password must be at least 6 characters
- Phone must be exactly 10 digits

## 🐛 Troubleshooting

### "ModuleNotFoundError"
```bash
pip install -r requirements.txt
```

### "Database locked"
```bash
# Delete old database and restart
rm farmers.db
python main.py
```

### CORS Issues
- Backend already has CORS middleware enabled
- Ensure frontend API_URL matches backend URL

### Token Invalid
- Verify SECRET_KEY matches between backend and frontend
- Check token format: `Bearer {token}`
