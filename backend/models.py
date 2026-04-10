from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List


class Project(BaseModel):
    id: int
    title: str
    description: str
    category: str
    tech: List[str]
    github: Optional[str] = None
    live: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False


class SkillItem(BaseModel):
    name: str
    level: int


class SkillCategory(BaseModel):
    id: str
    label: str
    icon: str
    skills: List[SkillItem]


class EducationItem(BaseModel):
    id: int
    degree: str
    institution: str
    period: str
    description: Optional[str] = None


class CertificationItem(BaseModel):
    id: int
    title: str
    issuer: str
    year: str


class ExperienceResponse(BaseModel):
    education: List[EducationItem]
    certifications: List[CertificationItem]


class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    message: str

    @validator("name", "message")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    message: str = "Message received"
