# app/ml/train.py (simplified)
import pandas as pd
from prophet import Prophet
import pickle

df = pd.read_csv("data/processed_mumbai.csv")  # example for one location
df = df.rename(columns={"timestamp":"ds","temperature_c":"y"})
model = Prophet()
model.fit(df)
with open("app/ml/forecast_model_mumbai.pkl","wb") as f:
    pickle.dump(model,f)
