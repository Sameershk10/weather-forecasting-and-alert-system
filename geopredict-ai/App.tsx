import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { analyzeWeatherPattern } from './services/weatherAIService';
import { WeatherAnalysis, LoadingState } from './types';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState<WeatherAnalysis | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setStatus(LoadingState.LOADING);
    setError(null);
    setData(null);

    try {
      const result = await analyzeWeatherPattern(location);
      setData(result);
      setStatus(LoadingState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze weather data. Please try again.");
      setStatus(LoadingState.ERROR);
    }
  };

  const handleGeoLocation = () => {
    if ("geolocation" in navigator) {
      setStatus(LoadingState.LOADING);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          // In a real app we'd reverse geocode here, but for this demo 
          // we'll pass coordinates string to the AI which understands it.
          const coordString = `${position.coords.latitude}, ${position.coords.longitude}`;
          setLocation("Current Location");
          const result = await analyzeWeatherPattern(coordString);
          setData(result);
          setStatus(LoadingState.SUCCESS);
        } catch (err) {
          setError("Failed to get location-based weather.");
          setStatus(LoadingState.ERROR);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-12">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">GeoPredict<span className="text-blue-500">AI</span></span>
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Historical Pattern Analysis & Early Warning System
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Predictive Weather Intelligence
          </h1>
          <p className="text-slate-400 mb-8">
            Enter a region to generate a real-time risk assessment, 5-day forecast, and detect potential disaster anomalies up to 3 days in advance.
          </p>
          
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, state, or region..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-full py-4 pl-6 pr-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all"
            />
            <div className="absolute right-2 flex gap-2">
                <button 
                  type="button"
                  onClick={handleGeoLocation}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                  title="Use my location"
                >
                  <MapPin className="w-5 h-5" />
                </button>
                <button
                type="submit"
                disabled={status === LoadingState.LOADING}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                {status === LoadingState.LOADING ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Search className="w-4 h-4" />
                )}
                Analyze
                </button>
            </div>
          </form>
        </div>

        {/* Content Area */}
        {status === LoadingState.LOADING && (
           <div className="flex flex-col items-center justify-center py-20 animate-pulse">
             <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
             <p className="text-slate-400 text-lg">Analyzing historical data patterns...</p>
             <p className="text-slate-500 text-sm mt-2">Correlating weather vectors for prediction</p>
           </div>
        )}

        {status === LoadingState.ERROR && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-6 rounded-xl text-center max-w-lg mx-auto">
            <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
            <p>{error}</p>
          </div>
        )}

        {status === LoadingState.SUCCESS && data && (
          <Dashboard data={data} />
        )}
        
        {status === LoadingState.IDLE && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-50">
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <div className="h-4 w-12 bg-slate-800 rounded mb-4"></div>
                    <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <div className="h-4 w-12 bg-slate-800 rounded mb-4"></div>
                    <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <div className="h-4 w-12 bg-slate-800 rounded mb-4"></div>
                    <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}