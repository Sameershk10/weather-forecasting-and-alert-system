import pickle, os
from functools import lru_cache

@lru_cache()
def load_model(path="app/ml/forecast_model_mumbai.pkl"):
    with open(path,'rb') as f:
        return pickle.load(f)
