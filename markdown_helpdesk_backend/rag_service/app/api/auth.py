from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta

router = APIRouter()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
USER_DB = {"user@example.com": "password123"}

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(request: LoginRequest):
    if USER_DB.get(request.email) == request.password:
        payload = {"sub": request.email, "exp": datetime.utcnow() + timedelta(hours=1)}
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")