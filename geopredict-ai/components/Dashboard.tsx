import React from 'react';
import { WeatherAnalysis } from '../types';
import { AlertBadge } from './AlertBadge';
import { HistoricalChart } from './HistoricalChart';
import { Thermometer, Droplets, Wind, Calendar, ShieldAlert } from 'lucide-react';

interface DashboardProps {
  data: WeatherAnalysis;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Current Weather Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{data.location}</h2>
              <p className="text-slate-400">{data.current.condition}</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-bold text-white">{data.current.temp}°</span>
              <span className="text-xl text-slate-400 ml-1">C</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
              <Thermometer className="text-blue-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Feels Like</p>
                <p className="font-semibold">{data.current.temp + 2}°</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
              <Droplets className="text-cyan-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Humidity</p>
                <p className="font-semibold">{data.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
              <Wind className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Wind</p>
                <p className="font-semibold">{data.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="bg-indigo-900/30 rounded-xl p-6 border border-indigo-500/30 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-indigo-300">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-semibold uppercase tracking-wider text-xs">System Analysis</span>
            </div>
            <p className="text-sm leading-relaxed text-indigo-100 italic">
                "{data.summary}"
            </p>
        </div>
      </div>

      {/* Alerts Section - Sticky or Prominent */}
      {data.alerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <ShieldAlert className="text-red-500" />
            Active Threats Detected
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.alerts.map(alert => (
              <AlertBadge key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Historical Trends & Forecast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Historical Data Analysis (5 Years)
          </h3>
          <HistoricalChart data={data.historicalAnalysis} />
          <p className="mt-4 text-xs text-slate-400 text-center">
            * Comparison of average temperature and precipitation levels for this season over the last 5 years to identify anomalies.
          </p>
        </div>

        {/* 5 Day Forecast */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-6">5-Day Prediction</h3>
          <div className="space-y-4">
            {data.forecast.map((day, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded hover:bg-slate-700/50 transition-colors">
                <span className="w-16 font-medium text-slate-300">{day.day}</span>
                <div className="flex flex-col items-center flex-1 px-4">
                    <span className="text-xs text-slate-400">{day.condition}</span>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${day.precipitationChance}%`}}
                        />
                    </div>
                </div>
                <div className="flex gap-3 text-sm font-mono">
                  <span className="text-white">{day.tempHigh}°</span>
                  <span className="text-slate-500">{day.tempLow}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};