from sqlalchemy import Column, Integer, Float, String, DateTime
from app.database import Base

class Weather(Base):
    __tablename__ = "weather_data"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    lat = Column(Float)
    lon = Column(Float)
    timestamp = Column(DateTime, index=True)
    temperature = Column(Float)
    humidity = Column(Float)
    rainfall = Column(Float)
    windspeed = Column(Float)
    source = Column(String)
