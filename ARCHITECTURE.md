# 🏗️ Backend Authentication Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     🌐 FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Home.jsx    │  │ Signin.jsx   │  │ Signup.jsx   │          │
│  │ (Landing)    │  │ (Login Form) │  │ (Reg Form)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┼──────────────────┘                   │
│                           │                                      │
│                    ┌──────▼──────┐                               │
│                    │ authAPI.js   │                              │
│                    │ (HTTP calls) │                              │
│                    └──────┬───────┘                              │
│                           │                                      │
│                    ┌──────▼──────────┐                           │
│                    │ AuthContext.jsx  │                          │
│                    │ (State + JWT)    │                          │
│                    └──────┬───────────┘                          │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTP/JSON
                            │
        ┌───────────────────▼─────────────────┐
        │                                      │
    ┌───▼────────────────────────────────────────┐
    │       🔵 BACKEND (FastAPI - Python)       │
    ├──────────────────────────────────────────┤
    │                                           │
    │  ┌────────────────────────────────────┐  │
    │  │      FASTAPI ENDPOINTS             │  │
    │  │                                    │  │
    │  │  📝 POST /auth/signup              │  │
    │  │     └─→ Validate data              │  │
    │  │     └─→ Hash password              │  │
    │  │     └─→ Save to DB                 │  │
    │  │     └─→ Generate JWT               │  │
    │  │     └─→ Return token               │  │
    │  │                                    │  │
    │  │  🔐 POST /auth/login               │  │
    │  │     └─→ Find user                  │  │
    │  │     └─→ Verify password            │  │
    │  │     └─→ Generate JWT               │  │
    │  │     └─→ Return token               │  │
    │  │                                    │  │
    │  │  👤 GET /auth/me                   │  │
    │  │     └─→ Verify token               │  │
    │  │     └─→ Return user data           │  │
    │  │                                    │  │
    │  │  ✅ GET /auth/verify/{token}       │  │
    │  │     └─→ Decode JWT                 │  │
    │  │     └─→ Check validity             │  │
    │  │                                    │  │
    │  └────────────────────────────────────┘  │
    │                   │                       │
    │  ┌────────────────▼────────────────────┐  │
    │  │   SECURITY LAYER (auth.py)         │  │
    │  │                                    │  │
    │  │  🔐 hash_password()                │  │
    │  │     └─→ bcrypt hashing             │  │
    │  │                                    │  │
    │  │  ✔️ verify_password()              │  │
    │  │     └─→ bcrypt verification        │  │
    │  │                                    │  │
    │  │  🎫 create_access_token()          │  │
    │  │     └─→ JWT generation             │  │
    │  │     └─→ 30-day expiration          │  │
    │  │                                    │  │
    │  │  🔍 decode_token()                 │  │
    │  │     └─→ JWT verification           │  │
    │  │                                    │  │
    │  └────────────────┬────────────────────┘  │
    │                   │                       │
    │  ┌────────────────▼────────────────────┐  │
    │  │  VALIDATION LAYER (schemas.py)     │  │
    │  │                                    │  │
    │  │  ✓ SignupRequest                   │  │
    │  │    - name (2-100 chars)            │  │
    │  │    - email (valid format)          │  │
    │  │    - phone (10 digits)             │  │
    │  │    - state (required)              │  │
    │  │    - password (6+ chars)           │  │
    │  │                                    │  │
    │  │  ✓ LoginRequest                    │  │
    │  │    - email (valid format)          │  │
    │  │    - password (6+ chars)           │  │
    │  │                                    │  │
    │  │  ✓ UserResponse                    │  │
    │  │    - Safe user data output         │  │
    │  │                                    │  │
    │  └────────────────┬────────────────────┘  │
    │                   │                       │
    │  ┌────────────────▼────────────────────┐  │
    │  │  DATA MODEL LAYER (database.py)    │  │
    │  │                                    │  │
    │  │  User (SQLAlchemy Model)           │  │
    │  │  ├─ id (Primary Key)               │  │
    │  │  ├─ name (String)                  │  │
    │  │  ├─ email (Unique)                 │  │
    │  │  ├─ phone (Unique)                 │  │
    │  │  ├─ state (String)                 │  │
    │  │  ├─ district (String)              │  │
    │  │  ├─ password_hash (String)         │  │
    │  │  ├─ is_active (Boolean)            │  │
    │  │  ├─ created_at (DateTime)          │  │
    │  │  └─ updated_at (DateTime)          │  │
    │  │                                    │  │
    │  └────────────────┬────────────────────┘  │
    │                   │                       │
    └───────────────────┼───────────────────────┘
                        │ SQL
        ┌───────────────▼──────────────┐
        │  💾 DATABASE LAYER           │
        ├──────────────────────────────┤
        │                              │
        │  SQLite (Development)        │
        │  ├─ farmers.db               │
        │  └─ Auto-created on startup  │
        │                              │
        │  PostgreSQL (Production)     │
        │  ├─ External server          │
        │  └─ Better performance       │
        │                              │
        │  📊 Users Table              │
        │  ├─ id                       │
        │  ├─ name                     │
        │  ├─ email                    │
        │  ├─ phone                    │
        │  ├─ state                    │
        │  ├─ district                 │
        │  ├─ password_hash (Bcrypt)   │
        │  ├─ is_active                │
        │  ├─ created_at               │
        │  └─ updated_at               │
        │                              │
        └──────────────────────────────┘
```

---

## Data Flow Diagrams

### Sign Up Flow

```
User fills signup form
        │
        ▼
Frontend validates
        │
        ▼
POST /auth/signup
        │
        ▼
Backend validates data
        │
        ▼
Check email unique ─No─→ Return error
        │
       Yes
        │
        ▼
Check phone unique ─No─→ Return error
        │
       Yes
        │
        ▼
Hash password (bcrypt)
        │
        ▼
Save to database
        │
        ▼
Generate JWT token
        │
        ▼
Return token + user
        │
        ▼
Frontend stores token
        │
        ▼
Auto-login user
        │
        ▼
Redirect to dashboard
```

### Login Flow

```
User enters credentials
        │
        ▼
Frontend validates
        │
        ▼
POST /auth/login
        │
        ▼
Find user by email ─Not found─→ Return error
        │
      Found
        │
        ▼
Verify password ─Fail─→ Return error
        │
      Success
        │
        ▼
Generate JWT token
        │
        ▼
Return token + user
        │
        ▼
Frontend stores token
        │
        ▼
Add to all API headers
        │
        ▼
Access protected routes
```

### Auto-Login on Refresh

```
Page loads
        │
        ▼
Check localStorage
        │
        ├─ No token ─→ Show home page
        │
        └─ Has token ─→ GET /auth/verify
                        │
                        ├─ Invalid ─→ Clear storage ─→ Home page
                        │
                        └─ Valid ─→ Load user data ─→ Dashboard
```

---

## File Dependency Graph

```
Frontend
├── App.jsx
│   ├── AuthContext.jsx
│   │   └── authAPI.js
│   │       └── axios
│   ├── Home.jsx
│   │   ├── Signin.jsx
│   │   │   └── useAuth()
│   │   └── Signup.jsx
│   │       └── useAuth()
│   ├── Header.jsx
│   │   └── useAuth()
│   └── Dashboard components

Backend
├── main.py
│   ├── database.py
│   │   └── SQLAlchemy
│   ├── schemas.py
│   │   └── Pydantic
│   ├── auth.py
│   │   ├── passlib (bcrypt)
│   │   └── PyJWT
│   └── FastAPI middleware
├── requirements.txt
└── .env
```

---

## Request/Response Format

### Sign Up Request
```json
{
  "name": "John Farmer",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "password": "SecurePass123",
  "confirm_password": "SecurePass123"
}
```

### Sign Up Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

---

## Authentication Header Format

```
GET /auth/me HTTP/1.1
Host: localhost:8000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## Token Structure (JWT)

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJleHAiOjE3MjM4MjU4MDB9.signature...

│ HEADER     │ PAYLOAD                                  │ SIGNATURE  │
│ Algorithm  │ user_id, email, expiration timestamp    │ Secret key │
```

---

## 🎯 Summary

- **Frontend** sends user data via HTTPS to backend
- **Backend** validates, secures, and stores data
- **Database** persists user information
- **JWT tokens** enable stateless authentication
- **Security layers** ensure passwords are hashed
- **Auto-login** checks token validity on each load
