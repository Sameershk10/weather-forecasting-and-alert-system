import { GoogleGenAI, Type } from "@google/genai";
import { WeatherAnalysis } from "../types";

// Helper to initialize Gemini
const getGenAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeWeatherPattern = async (location: string): Promise<WeatherAnalysis> => {
  const ai = getGenAI();

  const prompt = `
    Act as an advanced Meteorological AI Backend. 
    Analyze the location: "${location}".
    
    Task:
    1. Estimate current weather conditions based on typical climate data for this region.
    2. Predict a 5-day forecast.
    3. SIMULATE a potential natural disaster scenario (e.g., storm, flood, heatwave) that might happen in 2-3 days based on "historical data patterns" you generate.
    4. Generate synthetic historical data for the last 5 years for this season to compare against current trends.
    5. Provide specific early warning alerts.

    Note: This is for a disaster prevention dashboard. Make the "alerts" realistic but dramatic enough to demonstrate the system's early warning capability (2-3 days early).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          location: { type: Type.STRING },
          current: {
            type: Type.OBJECT,
            properties: {
              temp: { type: Type.NUMBER },
              condition: { type: Type.STRING },
              humidity: { type: Type.NUMBER },
              windSpeed: { type: Type.NUMBER },
            },
            required: ["temp", "condition", "humidity", "windSpeed"]
          },
          forecast: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                tempHigh: { type: Type.NUMBER },
                tempLow: { type: Type.NUMBER },
                condition: { type: Type.STRING },
                precipitationChance: { type: Type.NUMBER },
              },
              required: ["day", "tempHigh", "tempLow", "condition", "precipitationChance"]
            }
          },
          historicalAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                avgTemp: { type: Type.NUMBER },
                precipitation: { type: Type.NUMBER },
                events: { type: Type.NUMBER, description: "Number of extreme events" },
              },
              required: ["year", "avgTemp", "precipitation", "events"]
            }
          },
          alerts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["hurricane", "flood", "drought", "wildfire", "earthquake", "storm"] },
                severity: { type: Type.STRING, enum: ["low", "moderate", "high", "critical"] },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                daysUntilImpact: { type: Type.NUMBER },
                probability: { type: Type.NUMBER },
                recommendedActions: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["id", "type", "severity", "title", "description", "daysUntilImpact", "probability", "recommendedActions"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["location", "current", "forecast", "historicalAnalysis", "alerts", "summary"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as WeatherAnalysis;
};