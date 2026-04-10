from fastapi import APIRouter
from database import database, experience_table
from models import ExperienceResponse, EducationItem, CertificationItem

router = APIRouter()


@router.get("/", response_model=ExperienceResponse)
async def get_experience():
    rows = await database.fetch_all(experience_table.select())

    education = []
    certifications = []

    for row in rows:
        r = dict(row)
        if r["type"] == "education":
            education.append(
                EducationItem(
                    id=r["id"],
                    degree=r["title"],
                    institution=r["institution"],
                    period=r["period"],
                    description=r.get("description"),
                )
            )
        elif r["type"] == "certification":
            certifications.append(
                CertificationItem(
                    id=r["id"],
                    title=r["title"],
                    issuer=r["institution"],
                    year=r["period"],
                )
            )

    return ExperienceResponse(education=education, certifications=certifications)
