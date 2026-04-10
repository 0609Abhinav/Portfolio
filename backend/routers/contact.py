import os
from fastapi import APIRouter, HTTPException
from database import database, messages_table
from models import ContactPayload, ContactResponse

router = APIRouter()


@router.post("/", response_model=ContactResponse)
async def submit_contact(payload: ContactPayload):
    try:
        query = messages_table.insert().values(
            name=payload.name,
            email=payload.email,
            message=payload.message,
        )
        await database.execute(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to save message")

    # Optional: send email notification via SMTP
    # await send_notification_email(payload)

    return ContactResponse(success=True)
