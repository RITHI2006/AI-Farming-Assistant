# 🧪 Backend Authentication - Testing Guide

## Unit Test Examples

### Test Case 1: Successful Signup

**Test Name:** `test_signup_success`

**Request:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "password": "Password123",
    "confirm_password": "Password123"
  }'
```

**Expected Status:** 200 OK

**Expected Response:**
```json
{
  "access_token": "eyJ...",
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

**Verification:**
- ✅ Token is a valid JWT
- ✅ Token can be decoded
- ✅ User is created in database
- ✅ Password is hashed (not plaintext)

---

### Test Case 2: Duplicate Email Signup

**Test Name:** `test_signup_duplicate_email`

**Request:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "rajesh@example.com",
    "phone": "9876543211",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "password": "Password123",
    "confirm_password": "Password123"
  }'
```

**Expected Status:** 400 Bad Request

**Expected Response:**
```json
{
  "detail": "Email already registered. Please login or use a different email."
}
```

---

### Test Case 3: Successful Login

**Test Name:** `test_login_success`

**Prerequisite:** User exists with email "rajesh@example.com"

**Request:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rajesh@example.com",
    "password": "Password123"
  }'
```

**Expected Status:** 200 OK

**Expected Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": { ... },
  "message": "Login successful!"
}
```

---

### Test Case 4: Wrong Password Login

**Test Name:** `test_login_wrong_password`

**Request:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rajesh@example.com",
    "password": "WrongPassword123"
  }'
```

**Expected Status:** 401 Unauthorized

**Expected Response:**
```json
{
  "detail": "Invalid email or password"
}
```

---

### Test Case 5: Non-existent Email Login

**Test Name:** `test_login_nonexistent_user`

**Request:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "Password123"
  }'
```

**Expected Status:** 401 Unauthorized

**Expected Response:**
```json
{
  "detail": "Invalid email or password"
}
```

---

### Test Case 6: Get Current User

**Test Name:** `test_get_current_user`

**Request:**
```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer eyJ..."
```

**Expected Status:** 200 OK

**Expected Response:**
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

### Test Case 7: Access Protected Route Without Token

**Test Name:** `test_protected_route_no_token`

**Request:**
```bash
curl -X GET http://localhost:8000/auth/me
```

**Expected Status:** 401 Unauthorized

**Expected Response:**
```json
{
  "detail": "Authorization header missing"
}
```

---

### Test Case 8: Invalid Token

**Test Name:** `test_invalid_token`

**Request:**
```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer invalid.token.here"
```

**Expected Status:** 401 Unauthorized

**Expected Response:**
```json
{
  "detail": "Invalid or expired token"
}
```

---

### Test Case 9: Verify Token

**Test Name:** `test_verify_token`

**Request:**
```bash
curl -X GET http://localhost:8000/auth/verify/eyJ...
```

**Expected Status:** 200 OK

**Expected Response:**
```json
{
  "valid": true,
  "user": { ... }
}
```

---

### Test Case 10: Validation Errors

**Test Name:** `test_signup_validation_errors`

**Request (Invalid Email):**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User",
    "email": "invalid-email",
    "phone": "9876543210",
    "state": "Tamil Nadu",
    "password": "Pass123",
    "confirm_password": "Pass123"
  }'
```

**Expected Status:** 422 Unprocessable Entity

**Expected Response:**
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "invalid email format",
      "type": "value_error.email"
    }
  ]
}
```

---

## Integration Testing in Browser

### 1. Open DevTools Console

Press `F12` → Go to **Console** tab

### 2. Test Signup

```javascript
// 1. Signup
const signupData = {
  name: "Browser Test",
  email: "browsertest@example.com",
  phone: "9876543212",
  state: "Tamil Nadu",
  district: "Chennai",
  password: "Test123456",
  confirm_password: "Test123456"
};

fetch('http://localhost:8000/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(signupData)
})
.then(r => r.json())
.then(data => {
  console.log('Signup Success:', data);
  localStorage.setItem('test_token', data.access_token);
})
.catch(e => console.error('Signup Error:', e));
```

### 3. Test Login

```javascript
// 2. Login
fetch('http://localhost:8000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "browsertest@example.com",
    password: "Test123456"
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login Success:', data);
  localStorage.setItem('test_token', data.access_token);
})
.catch(e => console.error('Login Error:', e));
```

### 4. Test Get Current User

```javascript
// 3. Get User
const token = localStorage.getItem('test_token');
fetch('http://localhost:8000/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('User:', data))
.catch(e => console.error('Error:', e));
```

### 5. View Stored Data

```javascript
// View token
console.log('Token:', localStorage.getItem('test_token'));

// View user
console.log('User:', localStorage.getItem('user'));

// Decode token (install jwt-decode for full decode)
const token = localStorage.getItem('test_token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token Payload:', payload);
```

---

## Postman/Insomnia Testing

### Create Collection

1. **New Collection** → "Auth Testing"

### Requests

#### 1. Signup
- **Name:** Signup
- **Method:** POST
- **URL:** `{{base_url}}/auth/signup`
- **Body:**
```json
{
  "name": "Test Farmer",
  "email": "farmer@test.com",
  "phone": "9876543213",
  "state": "Tamil Nadu",
  "district": "Chennai",
  "password": "Test123456",
  "confirm_password": "Test123456"
}
```

#### 2. Login
- **Name:** Login
- **Method:** POST
- **URL:** `{{base_url}}/auth/login`
- **Body:**
```json
{
  "email": "farmer@test.com",
  "password": "Test123456"
}
```
- **Post-request Script:**
```javascript
var jsonData = pm.response.json();
pm.environment.set("access_token", jsonData.access_token);
```

#### 3. Get Current User
- **Name:** Get Me
- **Method:** GET
- **URL:** `{{base_url}}/auth/me`
- **Headers:**
```
Authorization: Bearer {{access_token}}
```

#### 4. Verify Token
- **Name:** Verify Token
- **Method:** GET
- **URL:** `{{base_url}}/auth/verify/{{access_token}}`

#### 5. Get All Users
- **Name:** Get All Users
- **Method:** GET
- **URL:** `{{base_url}}/users/all`

### Environment Variables

Create environment with:
```
base_url: http://localhost:8000
access_token: (auto-filled after login)
```

---

## Load Testing

### Using Apache Bench

```bash
# Test signup endpoint
ab -n 10 -c 5 -p signup_data.json \
  -T "application/json" \
  http://localhost:8000/auth/signup
```

### Using wrk

```bash
# Install wrk (if not installed)
# Windows: choco install wrk

wrk -t4 -c100 -d30s \
  -s script.lua \
  http://localhost:8000/auth/login
```

---

## Database Verification

### View All Users

```bash
cd backend
python << 'EOF'
from database import SessionLocal, User

db = SessionLocal()
users = db.query(User).all()

print(f"\nTotal Users: {len(users)}\n")
for user in users:
    print(f"ID: {user.id}")
    print(f"Name: {user.name}")
    print(f"Email: {user.email}")
    print(f"Phone: {user.phone}")
    print(f"State: {user.state}")
    print(f"Active: {user.is_active}")
    print(f"Created: {user.created_at}")
    print("---")

db.close()
EOF
```

### Count Users

```bash
python << 'EOF'
from database import SessionLocal, User
db = SessionLocal()
count = db.query(User).count()
print(f"Total users: {count}")
db.close()
EOF
```

### Delete All Test Data

```bash
python << 'EOF'
from database import SessionLocal, User
db = SessionLocal()
db.query(User).delete()
db.commit()
print("All users deleted")
db.close()
EOF
```

---

## Security Testing

### Test Password Hashing

```bash
python << 'EOF'
from auth import hash_password, verify_password

password = "MySecurePassword123"
hashed = hash_password(password)

print(f"Original: {password}")
print(f"Hashed: {hashed}")
print(f"Verified: {verify_password(password, hashed)}")
print(f"Wrong password: {verify_password('WrongPassword', hashed)}")
EOF
```

### Test JWT Token

```bash
python << 'EOF'
from auth import create_access_token, decode_token
import time

token = create_access_token(user_id=1, email="test@example.com")
print(f"Token: {token}")

decoded = decode_token(token)
print(f"Decoded: {decoded}")

# Verify signature
try:
    decode_token(token + "tampered")
except:
    print("Invalid signature detected ✓")
EOF
```

---

## Checklist for Complete Testing

- [ ] Signup with valid data
- [ ] Signup with duplicate email
- [ ] Signup with duplicate phone
- [ ] Signup with invalid email format
- [ ] Signup with weak password
- [ ] Password confirmation mismatch
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Login with non-existent email
- [ ] Access protected route with valid token
- [ ] Access protected route without token
- [ ] Access protected route with invalid token
- [ ] Access protected route with expired token
- [ ] Verify token returns valid status
- [ ] Get all users endpoint works
- [ ] User data is persisted in database
- [ ] Passwords are hashed (not plaintext)
- [ ] Token can be used across requests
- [ ] Auto-login works on page refresh
- [ ] Logout clears token from localStorage

---

**All tests passing? Great! Your authentication system is production-ready! 🚀**
