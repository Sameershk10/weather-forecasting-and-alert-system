import pandas as pd
def clean_merge(dfs):
    df = pd.concat(dfs, ignore_index=True)
    df['temperature_c'] = df['temperature_k'] - 273.15
    df.sort_values(['city','timestamp'], inplace=True)
    df = df.groupby('city').apply(lambda g: g.interpolate(limit=3))
    return df
