from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
import jwt
from app.utils.retriever import get_answer

router = APIRouter()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

@router.post("")
def chat(req: ChatRequest, authorization: str = Header(default=None, convert_underscores=False)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token = authorization.split(" ")[1]
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    answer, sources = get_answer(req.message)
    return {
        "session_id": req.session_id or "new_session",
        "answer": answer,
        "sources": sources
    }
