# 🌾 AI Farming Assistant - Complete Documentation

## 📚 Documentation Index

Start here if you're new to the project:

### 🚀 Quick Start (5 min)
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ⭐ **START HERE**
  - Quick commands to run everything
  - URLs and file locations
  - Common troubleshooting
  - One-page reference

### 📖 Main Guides
- **[COMPLETE_AUTH_SUMMARY.md](./COMPLETE_AUTH_SUMMARY.md)** - Project overview
- **[BACKEND_AUTH_FULL_SETUP.md](./miniproject/backend/AUTH_SETUP.md)** - Backend setup
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing procedures

---

## ⚡ Quick Start (Two Steps)

### Windows
```bash
cd AI-Farming-Assistant
START.bat
```

### macOS/Linux
```bash
cd AI-Farming-Assistant
./start.sh
```

Then open: **http://localhost:5173**

---

## 🎯 What's Implemented

✅ **Authentication System**
- User registration (signup) with validation
- Secure login with password hashing
- JWT token authentication
- Auto-login on page refresh
- Protected routes

✅ **User Interface**
- Beautiful landing page: "WELCOME TO AI-FARMING ASSISTANT"
- Responsive signup form with all important fields
- Login form with validation
- User profile dropdown in header
- Logout functionality

✅ **Data Storage**
- SQLite database (farmers.db)
- User table with all required fields
- Password hashing with bcrypt
- Unique email & phone constraints

✅ **Backend API**
- Python FastAPI server
- 5 main authentication endpoints
- Request validation with Pydantic
- Security with JWT tokens
- CORS enabled for frontend

---

## 📊 Project Structure

```
AI-Farming-Assistant/
├── miniproject/
│   ├── backend/
│   │   ├── main.py              ← FastAPI server
│   │   ├── database.py          ← SQLAlchemy models
│   │   ├── schemas.py           ← Validation
│   │   ├── auth.py              ← Security
│   │   ├── requirements.txt      ← Dependencies
│   │   ├── env.example           ← Config template
│   │   └── farmers.db            ← Database (auto-created)
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx         ← Landing page
│   │   │   ├── Signin.jsx       ← Login form
│   │   │   ├── Signup.jsx       ← Signup form
│   │   │   ├── Header.jsx       ← Header with logout
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx  ← State management
│   │   ├── services/
│   │   │   └── authAPI.js       ← API client
│   │   ├── App.jsx              ← Main app
│   │   └── main.jsx
│   │
│   ├── .env.example              ← Frontend config template
│   ├── package.json
│   └── vite.config.js
│
├── START.bat                      ← Windows auto-start
├── start.sh                       ← macOS/Linux auto-start
├── QUICK_REFERENCE.md             ← One-page guide
├── COMPLETE_AUTH_SUMMARY.md       ← Full overview
├── ARCHITECTURE.md                ← System design
├── TESTING_GUIDE.md               ← Test procedures
└── README.md                      ← This file
```

---

## 🔐 Data Storage

User data stored in SQLite with these fields:
- **id** - Auto-increment ID
- **name** - User's full name
- **email** - Unique email
- **phone** - Unique 10-digit phone
- **state** - Selected Indian state
- **district** - Optional district
- **password_hash** - Bcrypt hashed (never plaintext)
- **is_active** - Account status
- **created_at** - When created
- **updated_at** - When last updated

---

## 📱 User Journey

### First-Time User
1. Opens app → Sees home page
2. Clicks "Sign Up" → Fills form
3. Submits → Account created
4. Auto-logged in → Redirected to dashboard

### Returning User
1. Opens app → Token checked
2. Valid token → Auto-logged in → Dashboard
3. Expired token → Shows home page

### Logout
1. Clicks logout → Token cleared
2. Redirected to home page
3. Can sign in again

---

## 🔌 API Endpoints

### Sign Up
```
POST /auth/signup
Body: name, email, phone, state, district, password, confirm_password
Returns: access_token, user, message
```

### Login
```
POST /auth/login
Body: email, password
Returns: access_token, user, message
```

### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer {token}
Returns: user profile
```

### Verify Token
```
GET /auth/verify/{token}
Returns: valid (true/false), user
```

### Get All Users (Admin)
```
GET /users/all
Returns: total_users, users array
```

---

## 🛠️ Environment Setup

### Frontend (.env.local)
Create file: `miniproject/.env.local`
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Farming Assistant
```

### Backend (.env)
Create file: `backend/.env`
```env
DATABASE_URL=sqlite:///./farmers.db
SECRET_KEY=your-secret-key-here
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

---

## 🚀 Services

### Frontend (React)
- **Port:** 5173
- **URL:** http://localhost:5173
- **Command:** `npm run dev`

### Backend (FastAPI)
- **Port:** 8000
- **URL:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **Command:** `python main.py`

### Database (SQLite)
- **File:** `backend/farmers.db`
- **Auto-created** on first run
- **Portable** - single file

---

## 🧪 Testing

### Test Signup
1. Open http://localhost:5173
2. Click "Sign Up"
3. Fill form with test data
4. Click "Create Account"
5. Should redirect to dashboard

### Test Login
1. Open http://localhost:5173
2. Click "Sign In"
3. Enter same email/password from signup
4. Should redirect to dashboard

### Test Logout
1. Click user name in header
2. Click "Logout"
3. Should see home page

### Test Token
```bash
# In browser console
localStorage.getItem('token')
localStorage.getItem('user')
```

---

## ⚠️ Important Notes

🔒 **Security**
- Passwords are hashed with bcrypt (never plaintext)
- Tokens expire after 30 days
- SECRET_KEY should be changed for production
- Use HTTPS in production

🗄️ **Database**
- SQLite used for development
- Use PostgreSQL for production
- Database file: `farmers.db`
- Auto-created on first run

📦 **Dependencies**
- Python 3.8+ required
- Node.js 14+ required
- All packages listed in requirements.txt and package.json

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Database Locked
```bash
# Delete old database and restart
rm backend/farmers.db
python backend/main.py
```

### ModuleNotFoundError
```bash
# Install dependencies
pip install -r requirements.txt
```

### CORS Error
- Check `VITE_API_URL` in `miniproject/.env.local`
- Should match backend URL: `http://localhost:8000`

### Login Failed
- Verify email/password are correct
- Check backend logs in terminal
- Verify user exists in database

---

## 📈 What's Working

✅ User Registration
- Form validation (client & server)
- Email uniqueness check
- Phone uniqueness check
- Password hashing
- Database storage

✅ User Login
- Email verification
- Password verification
- JWT token generation
- Token storage

✅ Session Management
- Token persistence in localStorage
- Auto-login on page refresh
- Token expiration
- Logout functionality

✅ Security
- Password hashing with bcrypt
- JWT signed tokens
- HTTPS-ready architecture
- Input validation
- CORS protection

---

## 🎓 Technology Stack

### Frontend
- React 18.2
- Vite 5.0
- Tailwind CSS
- Axios
- Lucide Icons

### Backend
- FastAPI 0.104
- Python 3.8+
- SQLAlchemy
- Pydantic
- PyJWT
- Passlib + bcrypt

### Database
- SQLite (dev)
- PostgreSQL (prod)

---

## 📝 Documentation

- **QUICK_REFERENCE.md** - One-page quick lookup (5 min)
- **COMPLETE_AUTH_SUMMARY.md** - Full project summary (10 min)
- **ARCHITECTURE.md** - System design & diagrams (15 min)
- **TESTING_GUIDE.md** - Testing procedures (20 min)
- **BACKEND_AUTH_FULL_SETUP.md** - Backend setup (15 min)

---

## 🎯 Next Steps

1. ✅ Run `START.bat` or `./start.sh`
2. ✅ Open http://localhost:5173
3. ✅ Sign up with test account
4. ✅ Test login/logout
5. 📖 Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for details

---

## 🚀 Production Deployment

Before deploying:
1. Change SECRET_KEY to strong random string
2. Switch from SQLite to PostgreSQL
3. Set DEBUG=false
4. Enable HTTPS
5. Add rate limiting
6. Set up logging
7. Configure environment variables
8. Run security tests

See **BACKEND_AUTH_FULL_SETUP.md** for details.

---

## 📞 Support

**Issue?** Check:
1. Browser console for errors
2. Backend terminal for logs
3. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) Troubleshooting section
4. [TESTING_GUIDE.md](./TESTING_GUIDE.md) for test procedures

---

## 🎉 You're Ready!

Everything is set up and tested. Start the app and begin registering farmers!

```bash
START.bat          # Windows
./start.sh         # macOS/Linux
```

Happy farming! 🌾