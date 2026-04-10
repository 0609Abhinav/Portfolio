from fastapi import APIRouter, HTTPException
from typing import List, Optional
from database import database, projects_table
from models import Project

router = APIRouter()


@router.get("/", response_model=List[Project])
async def get_projects(category: Optional[str] = None, featured: Optional[bool] = None):
    query = projects_table.select().order_by(projects_table.c.order)
    rows = await database.fetch_all(query)

    results = [dict(r) for r in rows]

    if category and category != "All":
        results = [p for p in results if p["category"] == category]
    if featured is not None:
        results = [p for p in results if p["featured"] == featured]

    return results


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    query = projects_table.select().where(projects_table.c.id == project_id)
    row = await database.fetch_one(query)
    if not row:
        raise HTTPException(status_code=404, detail="Project not found")
    return dict(row)
