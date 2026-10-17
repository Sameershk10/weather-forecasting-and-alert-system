import React from 'react';
import { AlertTriangle, Info, Wind, CloudRain, Flame, Waves } from 'lucide-react';
import { Alert } from '../types';

interface AlertBadgeProps {
  alert: Alert;
}

export const AlertBadge: React.FC<AlertBadgeProps> = ({ alert }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'hurricane': return <Wind className="w-5 h-5" />;
      case 'storm': return <Wind className="w-5 h-5" />;
      case 'flood': return <Waves className="w-5 h-5" />;
      case 'wildfire': return <Flame className="w-5 h-5" />;
      case 'drought': return <CloudRain className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getColor = () => {
    switch (alert.severity) {
      case 'critical': return 'bg-red-500/20 text-red-200 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-200 border-orange-500/50';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-200 border-blue-500/50';
      default: return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getColor()} mb-4 transition-all duration-300 hover:scale-[1.01]`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-tight">{alert.title}</h3>
            <span className="text-xs font-mono px-2 py-1 rounded bg-black/20 uppercase tracking-wider">
              {alert.severity}
            </span>
          </div>
          <p className="text-sm mt-1 opacity-90">{alert.description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
             <div className="bg-black/20 p-2 rounded">
                <span className="block text-xs opacity-60 uppercase">Impact In</span>
                <span className="font-mono text-lg font-bold">{alert.daysUntilImpact} Days</span>
             </div>
             <div className="bg-black/20 p-2 rounded">
                <span className="block text-xs opacity-60 uppercase">Probability</span>
                <span className="font-mono text-lg font-bold">{alert.probability}%</span>
             </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase opacity-70 mb-2">Recommended Actions</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {alert.recommendedActions.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};