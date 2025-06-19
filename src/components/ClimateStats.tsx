'use client';

import React from 'react';
import { Thermometer, Cloud, Waves, Snowflake, Trees, TrendingUp } from 'lucide-react';
import { ClimateData } from '@/types/climate';

interface ClimateStatsProps {
  data: ClimateData;
}

const StatCard: React.FC<{
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  description: string;
}> = ({ title, value, unit, icon, trend = 'stable', description }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-red-500';
      case 'down':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 rotate-180" />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg text-white">
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          {getTrendIcon()}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-lg text-gray-600">{unit}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ClimateStats: React.FC<ClimateStatsProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Global Climate Data</h2>
        <p className="text-gray-600">Last updated: {formatDate(data.lastUpdated)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Global Temperature"
          value={data.globalTemp.toFixed(1)}
          unit="°C above baseline"
          icon={<Thermometer className="h-6 w-6" />}
          trend="up"
          description="Temperature increase since pre-industrial times"
        />

        <StatCard
          title="CO₂ Concentration"
          value={data.globalCO2.toFixed(1)}
          unit="ppm"
          icon={<Cloud className="h-6 w-6" />}
          trend="up"
          description="Current atmospheric CO₂ levels"
        />

        <StatCard
          title="Sea Level Rise"
          value={data.seaLevelRise.toFixed(1)}
          unit="mm/year"
          icon={<Waves className="h-6 w-6" />}
          trend="up"
          description="Annual rate of sea level increase"
        />

        <StatCard
          title="Arctic Ice Extent"
          value={data.arcticIceExtent.toFixed(2)}
          unit="million km²"
          icon={<Snowflake className="h-6 w-6" />}
          trend="down"
          description="Current Arctic sea ice coverage"
        />

        <StatCard
          title="Deforestation Rate"
          value={data.deforestation.toFixed(1)}
          unit="million hectares/year"
          icon={<Trees className="h-6 w-6" />}
          trend="up"
          description="Annual global forest loss"
        />

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Climate Alert</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              <span className="text-sm">High CO₂ levels detected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Critical regions identified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Sea level acceleration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateStats; 