# Helpdesk-management
# 🧠 Markdown Helpdesk Assistant

A full-stack intelligent helpdesk chatbot that uses *FastAPI, **LangChain, **FAISS/Chroma, and **React* to answer queries from local markdown (*.md) documents using natural language.

---

## 🏗 Project Structure

- *Backend*: Python (FastAPI, LangChain, JWT)
- *Frontend*: React + React Router v6

---

## 📦 Features

### 🔙 Backend (FastAPI, Python)

1. Indexes all *.md files in the /docs folder into a *local FAISS or Chroma vector store*.
2. Exposes a POST /chat endpoint that accepts:
   ```json
   {
     "session_id": "optional-string",
     "message": "your-question-here"
   }
