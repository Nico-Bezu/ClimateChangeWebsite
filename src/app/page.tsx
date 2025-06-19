'use client';

import React, { useState } from 'react';
import { Globe, MessageSquare, BarChart3 } from 'lucide-react';
import { mockClimateLocations, globalClimateData } from '@/lib/climate-data';
import ClimateStats from '@/components/ClimateStats';
import AIClimateChat from '@/components/AIClimateChat';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'chat'>('stats');

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
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <ClimateStats data={globalClimateData} />
            
            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Locations Monitored</h3>
                <p className="text-3xl font-bold text-blue-600">{mockClimateLocations.length}</p>
                <p className="text-sm text-gray-500 mt-2">Active monitoring stations</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Critical Risk Areas</h3>
                <p className="text-3xl font-bold text-red-600">
                  {mockClimateLocations.filter(loc => loc.riskLevel === 'critical').length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Immediate attention needed</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">High Risk Areas</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {mockClimateLocations.filter(loc => loc.riskLevel === 'high').length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Close monitoring required</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Average Temperature</h3>
                <p className="text-3xl font-bold text-green-600">
                  {(mockClimateLocations.reduce((sum, loc) => sum + loc.temperature, 0) / mockClimateLocations.length).toFixed(1)}°C
                </p>
                <p className="text-sm text-gray-500 mt-2">Across all locations</p>
              </div>
            </div>

            {/* Location List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Climate Data by Location</h2>
                <p className="text-gray-600 mt-1">Detailed view of all monitored locations</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockClimateLocations.map((location) => (
                      <tr key={location.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {location.temperature}°C
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {location.humidity}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {location.co2Level} ppm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            location.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                            location.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                            location.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {location.riskLevel.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <AIClimateChat />
          </div>
        )}
      </main>
    </div>
  );
} 