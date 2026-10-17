from fastapi import FastAPI
from app.routers import historical, forecast, alerts

app = FastAPI(title="Weather Portal API")
app.include_router(historical.router)
app.include_router(forecast.router)
app.include_router(alerts.router)
