'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Globe, Activity, MessageSquare, BarChart3 } from 'lucide-react';
import { ClimateLocation } from '@/types/climate';
import { mockClimateLocations, globalClimateData } from '@/lib/climate-data';
import ClimateStats from '@/components/ClimateStats';
import AIClimateChat from '@/components/AIClimateChat';

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<ClimateLocation | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'stats' | 'chat'>('map');

  // Dynamically import the map to avoid SSR issues (recommended best practice)
  const ClimateMap = useMemo(() => dynamic(
    () => import('@/components/ClimateMap'),
    {
      loading: () => (
        <div className="h-full w-full bg-gradient-to-br from-blue-100 to-green-100 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="text-blue-600 mb-2">🌍</div>
            <div className="text-gray-600">Loading interactive climate map...</div>
          </div>
        </div>
      ),
      ssr: false // This is critical for Leaflet compatibility
    }
  ), []); // Empty dependency array to prevent re-creation

  const handleLocationSelect = (location: ClimateLocation) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg text-white">
                <Globe className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Climate Dashboard</h1>
                <p className="text-gray-600">Real-time climate monitoring with AI insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Global Temperature</div>
                <div className="text-xl font-bold text-red-600">+{globalClimateData.globalTemp}°C</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">CO₂ Level</div>
                <div className="text-xl font-bold text-orange-600">{globalClimateData.globalCO2} ppm</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('map')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Globe className="h-4 w-4" />
              Interactive Map
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Global Statistics
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-280px)]">
            {/* Map */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Climate Monitoring
                </h2>
                <p className="text-sm opacity-90">Click on markers to view detailed climate data</p>
              </div>
              <div className="h-full">
                <ClimateMap
                  locations={mockClimateLocations}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Selected Location Info */}
              {selectedLocation ? (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Location Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-xl">{selectedLocation.name}</h4>
                      <p className="text-gray-600">{selectedLocation.country}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Temperature</span>
                        <p className="font-semibold text-lg">{selectedLocation.temperature}°C</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Humidity</span>
                        <p className="font-semibold text-lg">{selectedLocation.humidity}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">CO₂ Level</span>
                        <p className="font-semibold text-lg">{selectedLocation.co2Level} ppm</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Sea Level</span>
                        <p className="font-semibold text-lg">{selectedLocation.seaLevel} mm</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <span className="text-gray-500 text-sm">Risk Level</span>
                      <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                        selectedLocation.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                        selectedLocation.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                        selectedLocation.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedLocation.riskLevel.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Select a Location
                  </h3>
                  <p className="text-gray-600">Click on any marker on the map to view detailed climate information for that location.</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Locations Monitored</span>
                    <span className="font-bold text-blue-600">{mockClimateLocations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Critical Risk Areas</span>
                    <span className="font-bold text-red-600">
                      {mockClimateLocations.filter(loc => loc.riskLevel === 'critical').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">High Risk Areas</span>
                    <span className="font-bold text-orange-600">
                      {mockClimateLocations.filter(loc => loc.riskLevel === 'high').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Temperature</span>
                    <span className="font-bold text-green-600">
                      {(mockClimateLocations.reduce((acc, loc) => acc + loc.temperature, 0) / mockClimateLocations.length).toFixed(1)}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="animate-fade-in">
            <ClimateStats data={globalClimateData} />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto h-[calc(100vh-280px)] animate-fade-in">
            <AIClimateChat selectedLocation={selectedLocation} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Climate Change Dashboard</h3>
            <p className="text-gray-300 mb-4">
              Monitoring our planet's climate with real-time data and AI-powered insights
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
              <span>Data updated every hour</span>
              <span>•</span>
              <span>Powered by AI</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 