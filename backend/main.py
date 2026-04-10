from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import projects, skills, experience, contact
from database import database, create_tables

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    create_tables()
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(skills.router, prefix="/skills", tags=["skills"])
app.include_router(experience.router, prefix="/experience", tags=["experience"])
app.include_router(contact.router, prefix="/contact", tags=["contact"])


@app.get("/health")
async def health():
    return {"status": "ok"}
