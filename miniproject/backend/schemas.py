from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ==========================
# ✅ REQUEST SCHEMAS
# ==========================
class SignupRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\d{10}$')  # <-- changed from regex to pattern
    password: str = Field(..., min_length=6)
    confirmPassword: str = Field(..., min_length=6)
    state: str
    district: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


# ==========================
# ✅ RESPONSE SCHEMAS
# ==========================
class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    state: str
    district: Optional[str] = ""
    is_active: bool = True
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # <-- Pydantic v2 replacement for orm_mode


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    message: str