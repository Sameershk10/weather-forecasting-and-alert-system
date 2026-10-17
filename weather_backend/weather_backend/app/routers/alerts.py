from fastapi import APIRouter
from app.ml.load_model import load_model

router = APIRouter(prefix="/alerts", tags=["alerts"])
model = load_model()

@router.get("/")
def check_alerts(days: int = 3, temp_threshold: float = 40.0):
    future = model.make_future_dataframe(periods=days)
    fc = model.predict(future).tail(days)
    alerts = []
    for r in fc.itertuples():
        if r.yhat > temp_threshold:
            alerts.append({"date": r.ds, "type":"heatwave", "message": f"Predicted {r.yhat:.1f}°C"})
    return {"alerts": alerts}
