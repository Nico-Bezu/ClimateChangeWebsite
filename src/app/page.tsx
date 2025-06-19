'use client';

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Globe, Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react';
import { mockClimateLocations, globalClimateData } from '@/lib/climate-data';
import { ClimateLocation } from '@/types/climate';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-110m.json";

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<ClimateLocation | null>(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const handleMarkerClick = (location: ClimateLocation) => {
    setSelectedLocation(location);
  };

  const handleMouseEnter = (event: React.MouseEvent<SVGElement>, location: ClimateLocation) => {
    setTooltip({
      show: true,
      x: event.clientX,
      y: event.clientY,
      content: `${location.name}, ${location.country} - ${location.riskLevel.toUpperCase()} Risk`
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Global Climate Monitor</h1>
                <p className="text-blue-200 text-sm">Interactive world climate risk assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white">
              <div className="text-center">
                <div className="text-sm text-blue-200">Global Temp</div>
                <div className="text-lg font-bold text-red-400">+{globalClimateData.globalTemp}°C</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-200">CO₂ Level</div>
                <div className="text-lg font-bold text-orange-400">{globalClimateData.globalCO2} ppm</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Map Area */}
        <div className="flex-1 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [0, 20],
            }}
            width={800}
            height={600}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#334155' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {mockClimateLocations.map((location) => (
                <Marker
                  key={location.id}
                  coordinates={[location.longitude, location.latitude]}
                  onClick={() => handleMarkerClick(location)}
                  onMouseEnter={(e) => handleMouseEnter(e, location)}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle
                    r={6}
                    fill={getRiskColor(location.riskLevel)}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-125 transition-transform duration-200"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3))' }}
                  />
                  <circle
                    r={12}
                    fill={getRiskColor(location.riskLevel)}
                    opacity={0.3}
                    className="animate-pulse"
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className="absolute z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm pointer-events-none backdrop-blur-sm"
              style={{
                left: tooltip.x + 10,
                top: tooltip.y - 10,
                transform: 'translateY(-100%)',
              }}
            >
              {tooltip.content}
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-3 text-sm">Climate Risk Levels</h3>
            <div className="space-y-2">
              {[
                { level: 'Critical', color: '#ef4444', count: mockClimateLocations.filter(l => l.riskLevel === 'critical').length },
                { level: 'High', color: '#f97316', count: mockClimateLocations.filter(l => l.riskLevel === 'high').length },
                { level: 'Medium', color: '#eab308', count: mockClimateLocations.filter(l => l.riskLevel === 'medium').length },
                { level: 'Low', color: '#22c55e', count: mockClimateLocations.filter(l => l.riskLevel === 'low').length },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.level} ({item.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-black/20 backdrop-blur-md border-l border-white/10 overflow-y-auto">
          {selectedLocation ? (
            <div className="p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <h2 className="text-lg font-semibold">Location Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
                  <p className="text-blue-200">{selectedLocation.country}</p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        selectedLocation.riskLevel === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        selectedLocation.riskLevel === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                        selectedLocation.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                        'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}
                    >
                      {selectedLocation.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="h-4 w-4 text-red-400" />
                      <span className="text-xs text-blue-200">Temperature</span>
                    </div>
                    <div className="text-lg font-bold">{selectedLocation.temperature}°C</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-blue-200">Humidity</span>
                    </div>
                    <div className="text-lg font-bold">{selectedLocation.humidity}%</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-blue-200">CO₂ Level</span>
                    </div>
                    <div className="text-lg font-bold">{selectedLocation.co2Level} ppm</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs text-blue-200">Sea Level</span>
                    </div>
                    <div className="text-lg font-bold">{selectedLocation.seaLevel} mm</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-sm">Environmental Impact</h4>
                  <p className="text-sm text-blue-200 leading-relaxed">
                    This location shows {selectedLocation.riskLevel} climate risk with current temperature at {selectedLocation.temperature}°C 
                    and CO₂ levels at {selectedLocation.co2Level} ppm. Monitor closely for environmental changes.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-white">
              <div className="text-center py-12">
                <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Location</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Click on any marker on the map to view detailed climate information for that location.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-sm border-b border-white/20 pb-2">Global Overview</h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 rounded p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{mockClimateLocations.length}</div>
                    <div className="text-blue-200">Locations</div>
                  </div>
                  <div className="bg-white/5 rounded p-3 text-center">
                    <div className="text-lg font-bold text-red-400">
                      {mockClimateLocations.filter(l => l.riskLevel === 'critical').length}
                    </div>
                    <div className="text-blue-200">Critical</div>
                  </div>
                  <div className="bg-white/5 rounded p-3 text-center">
                    <div className="text-lg font-bold text-orange-400">
                      {mockClimateLocations.filter(l => l.riskLevel === 'high').length}
                    </div>
                    <div className="text-blue-200">High Risk</div>
                  </div>
                  <div className="bg-white/5 rounded p-3 text-center">
                    <div className="text-lg font-bold text-green-400">
                      {(mockClimateLocations.reduce((sum, loc) => sum + loc.temperature, 0) / mockClimateLocations.length).toFixed(1)}°C
                    </div>
                    <div className="text-blue-200">Avg Temp</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 