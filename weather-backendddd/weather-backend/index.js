
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const historicalMonthly = [
  { month: "Jan", avg: 12, high: 18, low: 5 },
  { month: "Feb", avg: 14, high: 20, low: 7 },
  { month: "Mar", avg: 17, high: 23, low: 10 },
  { month: "Apr", avg: 21, high: 27, low: 14 },
  { month: "May", avg: 25, high: 31, low: 18 },
  { month: "Jun", avg: 28, high: 34, low: 21 },
  { month: "Jul", avg: 30, high: 36, low: 23 },
  { month: "Aug", avg: 29, high: 35, low: 22 },
  { month: "Sep", avg: 26, high: 32, low: 19 },
  { month: "Oct", avg: 21, high: 26, low: 15 },
  { month: "Nov", avg: 16, high: 21, low: 10 },
  { month: "Dec", avg: 13, high: 18, low: 7 }
];

function generatePredictions() {
  const baseTemp = 24;
  const baseHumidity = 60;

  const hours = [
    "00:00","02:00","04:00","06:00","08:00","10:00",
    "12:00","14:00","16:00","18:00","20:00","22:00"
  ];

  return hours.map((time, index) => {
    const tempVariation = Math.sin((index / hours.length) * Math.PI * 2) * 5;
    const humidityVariation = Math.cos((index / hours.length) * Math.PI * 2) * 7;

    return {
      time,
      temp: Math.round(baseTemp + tempVariation),
      humidity: Math.round(baseHumidity + humidityVariation),
      rainfall_mm: Math.max(0, Math.round(5 + Math.sin((index / hours.length) * Math.PI) * 10)),
      wind_speed: Math.round(10 + Math.random() * 25)
    };
  });
}

function generateAlerts(predictions) {
  const alerts = [];

  const heavyRain = predictions.some((p) => p.rainfall_mm >= 40);
  if (heavyRain) {
    alerts.push({
      type: "severe",
      title: "Severe Rainfall Warning",
      description: "Very heavy rain expected. Risk of waterlogging and flash floods.",
      time: "Next 24 hours"
    });
  }

  const strongWinds = predictions.some((p) => p.wind_speed >= 50);
  if (strongWinds) {
    alerts.push({
      type: "moderate",
      title: "High Wind Alert",
      description: "Strong winds predicted. Secure loose outdoor objects.",
      time: "Next 24 hours"
    });
  }

  const heat = predictions.some((p) => p.temp >= 40);
  if (heat) {
    alerts.push({
      type: "moderate",
      title: "Heatwave Conditions",
      description: "High temperature expected. Stay hydrated and avoid direct sunlight.",
      time: "Afternoon hours"
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "low",
      title: "No Severe Alerts",
      description: "Weather conditions are stable. No immediate natural disaster risk.",
      time: "Next 24 hours"
    });
  }

  return alerts;
}

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Weather backend running" });
});

app.get("/api/history", (req, res) => {
  res.json({ location: "Demo City", data: historicalMonthly });
});

app.get("/api/predict", (req, res) => {
  const predictions = generatePredictions();
  res.json({ location: "Demo City", horizon_hours: 24, data: predictions });
});

app.get("/api/alerts", (req, res) => {
  const predictions = generatePredictions();
  const alerts = generateAlerts(predictions);
  res.json({ location: "Demo City", alerts });
});

app.listen(PORT, () => {
  console.log(`Weather backend listening on http://localhost:${PORT}`);
});
