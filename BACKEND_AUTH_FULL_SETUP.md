# 🌾 Backend Python Authentication System - Setup Guide

## 📋 Overview

Complete backend authentication system with Flask/FastAPI for signup, login, and user data storage.

### Features Implemented:
✅ User registration (signup) with validation
✅ User login with password hashing
✅ JWT token-based authentication
✅ SQLite database with SQLAlchemy ORM
✅ Password security with bcrypt
✅ Email & phone uniqueness validation
✅ Token verification endpoint
✅ User profile management

---

## 🚀 Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

Create `.env` file in `backend/` folder:

```bash
cp env.example .env
```

Edit `.env` file with your settings:

```env
DATABASE_URL=sqlite:///./farmers.db
SECRET_KEY=your-super-secret-key-change-in-production
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../miniproject

# Create environment file
cp .env.example .env.local

# Edit .env.local
# VITE_API_URL=http://localhost:8000
```

---

## 🔧 Running the Application

### Backend (Terminal 1):

```bash
cd backend
python main.py
# OR use uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: **http://localhost:8000**

Check API docs: **http://localhost:8000/docs**

### Frontend (Terminal 2):

```bash
cd miniproject
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 📚 Backend File Structure

```
backend/
├── main.py              # Main server file with API endpoints
├── database.py          # SQLAlchemy models & database config
├── schemas.py           # Pydantic validation schemas
├── auth.py              # Password hashing & JWT functions
├── requirements.txt     # Python dependencies
├── env.example          # Environment variables template
└── farmers.db           # SQLite database (auto-created)
```

---

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 API Endpoints

### 1. Sign Up (Create Account)

**Endpoint:** `POST /auth/signup`

**Request:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "password": "securePass123",
  "confirm_password": "securePass123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "is_active": true,
    "created_at": "2024-04-05T10:30:00"
  },
  "message": "Account created successfully!"
}
```

**Error Cases:**
- 400: Email already registered
- 400: Phone already registered
- 422: Validation error (invalid email format, weak password, etc.)

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "rajesh@example.com",
  "password": "securePass123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": { ... },
  "message": "Login successful!"
}
```

**Error Cases:**
- 401: Invalid email or password
- 403: Account is inactive

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "is_active": true,
  "created_at": "2024-04-05T10:30:00"
}
```

---

### 4. Verify Token

**Endpoint:** `GET /auth/verify/{token}`

**Response (200 OK):**
```json
{
  "valid": true,
  "user": { ... }
}
```

**Error Cases:**
- 401: Invalid or expired token

---

### 5. Get All Users (Admin)

**Endpoint:** `GET /users/all`

**Response (200 OK):**
```json
{
  "total_users": 5,
  "users": [ ... ]
}
```

---

## 🔑 Authentication Flow

```
1. User Signs Up
   ↓
2. Backend validates data
   ↓
3. Password is hashed with bcrypt
   ↓
4. User saved to database
   ↓
5. JWT token generated
   ↓
6. Token sent to frontend
   ↓
7. Frontend stores token in localStorage
   ↓
8. Token added to all API requests
```

---

## 🛡️ Security Features

✅ **Password Hashing:** bcrypt with salt
✅ **JWT Tokens:** Signed with SECRET_KEY
✅ **Token Expiration:** 30 days by default
✅ **Email Validation:** RFC-compliant email format
✅ **Phone Validation:** 10-digit numbers only
✅ **Database Constraints:** Unique email & phone
✅ **CORS Protection:** Enabled with restrictions
✅ **SQL Injection Prevention:** Using SQLAlchemy ORM

---

## 📱 Frontend Integration

Frontend automatically:
- Sends signup/login requests to backend
- Receives JWT token and stores in localStorage
- Adds token to all API requests
- Handles token verification
- Auto-logs in on page refresh if token valid
- Shows backend error messages to user

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'fastapi'"

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: "Database is locked"

**Solution:**
```bash
# Delete old database
rm farmers.db
# Restart server
python main.py
```

### Issue: "CORS error from frontend"

**Solution:** Ensure backend is running on correct port:
```bash
# Backend should be: http://localhost:8000
# Frontend .env.local: VITE_API_URL=http://localhost:8000
```

### Issue: "Invalid token" error after login

**Solution:** Check SECRET_KEY is same in both places and not changed

### Issue: "SignatureExpired" error

**Solution:** Token expired after 30 days, user needs to login again

---

## 🧪 Testing in Postman/Insomnia

### 1. Signup Request
- Method: POST
- URL: `http://localhost:8000/auth/signup`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "password": "Password123",
  "confirm_password": "Password123"
}
```

### 2. Login Request
- Method: POST
- URL: `http://localhost:8000/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```

### 3. Get User with Token
- Method: GET
- URL: `http://localhost:8000/auth/me`
- Headers:
  - `Authorization: Bearer <access_token_from_login>`

---

## 📈 Production Deployment Notes

Before deploying to production:

1. **Change SECRET_KEY** to a strong random string
2. **Use PostgreSQL** instead of SQLite
3. **Enable HTTPS** for all API calls
4. **Set DEBUG=false** in environment
5. **Use environment-specific configs**
6. **Add rate limiting** to endpoints
7. **Implement email verification**
8. **Add password strength requirements**
9. **Enable logging** for audit trail
10. **Use proper secret management** (AWS Secrets, Vault, etc.)

---

## 📞 Support

For issues or questions:
- Check the error message in browser console
- Check backend logs in terminal
- Verify .env file is configured correctly
- Ensure both frontend and backend are running

---

## 🎉 You're All Set!

Your authentication system is ready to:
- ✅ Register new farmers
- ✅ Securely store passwords
- ✅ Issue JWT tokens
- ✅ Verify user sessions
- ✅ Manage user profiles
