from fastapi import APIRouter
from typing import List
from database import database, skills_table
from models import SkillCategory, SkillItem

router = APIRouter()


@router.get("/", response_model=List[SkillCategory])
async def get_skills():
    rows = await database.fetch_all(skills_table.select())

    # Group by category
    categories: dict = {}
    for row in rows:
        cid = row["category_id"]
        if cid not in categories:
            categories[cid] = {
                "id": cid,
                "label": row["category_label"],
                "icon": row["category_icon"],
                "skills": [],
            }
        categories[cid]["skills"].append(
            SkillItem(name=row["name"], level=row["level"])
        )

    return list(categories.values())
