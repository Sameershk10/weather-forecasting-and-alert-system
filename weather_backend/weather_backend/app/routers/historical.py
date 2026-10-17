from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.weather import Weather
from app.schemas.weather import WeatherOut  # pydantic schemas

router = APIRouter(prefix="/historical", tags=["historical"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[WeatherOut])
def get_history(city: str, start: str=None, end: str=None, db: Session=Depends(get_db)):
    q = db.query(Weather).filter(Weather.city==city)
    if start: q = q.filter(Weather.timestamp >= start)
    if end: q = q.filter(Weather.timestamp <= end)
    return q.order_by(Weather.timestamp.asc()).all()
