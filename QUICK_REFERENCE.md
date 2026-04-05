# 🚀 Backend Authentication - Quick Reference Card

## Start Services (Choose One)

### Option 1: One Command (Windows)
```bash
cd AI-Farming-Assistant
START.bat
```

### Option 2: One Command (macOS/Linux)
```bash
cd AI-Farming-Assistant
./start.sh
```

### Option 3: Manual (Two terminals)
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend
cd miniproject
npm run dev
```

---

## URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React app |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Redoc | http://localhost:8000/redoc | Alternative docs |

---

## Environment Files

### Create frontend/.env.local
```bash
cp miniproject/.env.example miniproject/.env.local
```

### Create backend/.env
```bash
cp backend/env.example backend/.env
# Edit the file to add your API keys
```

---

## First Setup

```bash
# 1. Install dependencies
cd backend
pip install -r requirements.txt

# 2. Create .env file
cp env.example .env

# 3. Run backend
python main.py

# 4. In new terminal, run frontend
cd miniproject
npm run dev
```

---

## Test Authentication

### 1. Signup
Open http://localhost:5173 → Click "Sign Up"
```
Name: Farmer Test
Email: test@example.com
Phone: 9876543210
State: Tamil Nadu
District: Chennai
Password: Test123456
```

### 2. Check Database
```bash
# View data stored
cd backend
python -c "
from database import SessionLocal, User
db = SessionLocal()
users = db.query(User).all()
for user in users:
    print(f'{user.name} - {user.email}')
"
```

### 3. Login
Go home → Click "Sign In" → Use same email/password

### 4. View Token
```bash
# In browser console
localStorage.getItem('token')
```

---

## File Locations

```
AI-Farming-Assistant/
├── backend/
│   ├── main.py              ← API endpoints
│   ├── database.py          ← User model
│   ├── schemas.py           ← Validation
│   ├── auth.py              ← Security
│   ├── requirements.txt      ← Dependencies
│   ├── .env                 ← Config (create from env.example)
│   └── farmers.db           ← Database (auto-created)
│
├── miniproject/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Header.jsx
│   │   ├── services/
│   │   │   └── authAPI.js
│   │   └── App.jsx
│   ├── .env.local           ← Config (create from .env.example)
│   └── package.json
│
├── START.bat                ← Windows quick start
├── start.sh                 ← macOS/Linux quick start
└── COMPLETE_AUTH_SUMMARY.md ← Complete docs
```

---

## Common Commands

```bash
# Backend
cd backend
pip install -r requirements.txt    # Install dependencies
python main.py                     # Start server
python -c "import database"        # Check installation

# Frontend
cd miniproject
npm install                        # Install dependencies
npm run dev                        # Start development server
npm run build                      # Build for production

# Database
cd backend
python -c "from database import engine, Base; print('Database OK')"
```

---

## API Endpoints Cheat Sheet

```
POST   /auth/signup     - Register new user
POST   /auth/login      - Login user
GET    /auth/me         - Get user profile
GET    /auth/verify/:token - Verify token
GET    /users/all       - Get all users
GET    /docs            - View swagger docs
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| ModuleNotFoundError | Run: `pip install -r requirements.txt` |
| Port 8000 in use | Close other apps or change port in main.py |
| Database error | Delete `farmers.db` and restart |
| CORS error | Check VITE_API_URL in .env.local |
| Login fails | Verify email/password are correct |
| Token invalid | Check SECRET_KEY in .env |

---

## Data Stored Per User

```
✓ name              (User's full name)
✓ email             (Unique email address)
✓ phone             (10-digit unique number)
✓ state             (Indian state)
✓ district          (Optional, district name)
✓ password_hash     (Bcrypt hashed, never plaintext)
✓ is_active         (Account status)
✓ created_at        (Registration timestamp)
✓ updated_at        (Last update timestamp)
```

⚠️ NOTE: Passwords are **NEVER** stored in plaintext. Only bcrypt hash is saved.

---

## Security Notes

🔒 **Always**
- Change SECRET_KEY in production
- Use HTTPS in production
- Use PostgreSQL (not SQLite) in production
- Keep .env files secret
- Never commit .env to git

---

## Quick Checks

```bash
# Is backend running?
curl http://localhost:8000/health

# Is database working?
curl http://localhost:8000/users/all

# Check API docs
Open: http://localhost:8000/docs

# View all users (development only)
curl http://localhost:8000/users/all
```

---

**Everything is set up and ready! Start servers and start registering farmers! 🌾**
