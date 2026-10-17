from pydantic import BaseModel
from datetime import datetime

class WeatherOut(BaseModel):
    id: int
    city: str
    timestamp: datetime
    temperature: float
    humidity: float
    rainfall: float
    windspeed: float

    class Config:
        orm_mode = True
