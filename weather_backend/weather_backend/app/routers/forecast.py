from fastapi import APIRouter
from app.ml.load_model import load_model
from datetime import timedelta

router = APIRouter(prefix="/forecast", tags=["forecast"])
model = load_model()  # cached

@router.get("/")
def forecast(days: int = 7):
    future = model.make_future_dataframe(periods=days, freq='D')
    fc = model.predict(future)
    return fc[['ds','yhat','yhat_lower','yhat_upper']].tail(days).to_dict(orient='records')
