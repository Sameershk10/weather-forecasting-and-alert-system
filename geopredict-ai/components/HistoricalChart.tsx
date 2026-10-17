import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { HistoricalPoint } from '../types';

interface HistoricalChartProps {
  data: HistoricalPoint[];
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="avgTemp" 
            name="Avg Temp (°C)"
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorTemp)" 
          />
          <Area 
            type="monotone" 
            dataKey="precipitation" 
            name="Precipitation (mm)"
            stroke="#82ca9d" 
            fillOpacity={1} 
            fill="url(#colorPrecip)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};