export interface HistoricalPoint {
  year: number;
  avgTemp: number;
  precipitation: number;
  events: number;
}

export interface DailyForecast {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  precipitationChance: number;
}

export interface Alert {
  id: string;
  type: 'hurricane' | 'flood' | 'drought' | 'wildfire' | 'earthquake' | 'storm';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  description: string;
  daysUntilImpact: number;
  probability: number;
  recommendedActions: string[];
}

export interface WeatherAnalysis {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  forecast: DailyForecast[];
  historicalAnalysis: HistoricalPoint[];
  alerts: Alert[];
  summary: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}