'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { ClimateLocation } from '@/types/climate';
import { getRiskLevelColor } from '@/lib/climate-data';

interface ClimateMapProps {
  locations: ClimateLocation[];
  onLocationSelect?: (location: ClimateLocation) => void;
}

const ClimateMap: React.FC<ClimateMapProps> = ({ locations, onLocationSelect }) => {
  const defaultPosition: LatLngExpression = [20, 0];
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mapId] = useState(`map-${Date.now()}-${Math.random()}`);
  const [isMapReady, setIsMapReady] = useState(false);

  const cleanupMap = useCallback(() => {
    if (mapRef.current) {
      try {
        mapRef.current.remove();
        mapRef.current = null;
      } catch (error) {
        console.warn('Error cleaning up map:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current && isMapReady) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupMap();
    };
  }, [cleanupMap, isMapReady]);

  const handleMapCreated = useCallback((map: L.Map) => {
    mapRef.current = map;
    setIsMapReady(true);
  }, []);

  return (
    <div 
      ref={containerRef} 
      id={mapId}
      style={{ height: '100%', width: '100%' }}
    >
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={handleMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            eventHandlers={{
              click: () => onLocationSelect?.(location),
            }}
          >
            <Popup>
              <div className="p-3 min-w-[250px]">
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  {location.name}, {location.country}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-semibold text-blue-600">{location.temperature}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-semibold text-cyan-600">{location.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CO₂ Level:</span>
                    <span className="font-semibold text-orange-600">{location.co2Level} ppm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sea Level:</span>
                    <span className="font-semibold text-teal-600">{location.seaLevel} mm</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-600">Risk Level:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskLevelColor(
                        location.riskLevel
                      )}`}
                    >
                      {location.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Simple Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-10 border">
        <h4 className="font-semibold mb-3 text-sm text-gray-800">Climate Risk Levels</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Critical Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateMap; 