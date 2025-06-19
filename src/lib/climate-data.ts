import { ClimateLocation, ClimateData, AIInsight } from '@/types/climate';

export const mockClimateLocations: ClimateLocation[] = [
  {
    id: '1',
    name: 'New York',
    country: 'USA',
    latitude: 40.7128,
    longitude: -74.0060,
    temperature: 15.2,
    humidity: 68,
    co2Level: 415,
    seaLevel: 2.3,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'London',
    country: 'UK',
    latitude: 51.5074,
    longitude: -0.1278,
    temperature: 12.1,
    humidity: 75,
    co2Level: 412,
    seaLevel: 1.8,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'medium',
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    temperature: 18.5,
    humidity: 72,
    co2Level: 418,
    seaLevel: 3.1,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'high',
  },
  {
    id: '4',
    name: 'Sydney',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    temperature: 22.1,
    humidity: 65,
    co2Level: 420,
    seaLevel: 2.8,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'high',
  },
  {
    id: '5',
    name: 'Mumbai',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
    temperature: 28.3,
    humidity: 82,
    co2Level: 425,
    seaLevel: 4.2,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'critical',
  },
  {
    id: '6',
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    temperature: 25.7,
    humidity: 45,
    co2Level: 422,
    seaLevel: 1.2,
    lastUpdated: new Date().toISOString(),
    riskLevel: 'high',
  },
];

export const globalClimateData: ClimateData = {
  globalTemp: 1.2,
  globalCO2: 421.4,
  seaLevelRise: 3.3,
  arcticIceExtent: 4.72,
  deforestation: 15.3,
  lastUpdated: new Date().toISOString(),
};

export const sampleAIInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Rising Sea Levels in Coastal Cities',
    description: 'Analysis shows accelerating sea level rise in major coastal cities, with Mumbai and Sydney showing concerning trends.',
    severity: 'critical',
    confidence: 0.89,
    category: 'sea-level',
    generatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'CO2 Concentration Spike',
    description: 'Recent data indicates a significant spike in CO2 levels across monitored locations, exceeding 420 ppm in most urban areas.',
    severity: 'warning',
    confidence: 0.92,
    category: 'co2',
    generatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Temperature Anomalies',
    description: 'Regional temperature variations suggest increasing climate instability, particularly in tropical and subtropical regions.',
    severity: 'warning',
    confidence: 0.76,
    category: 'temperature',
    generatedAt: new Date().toISOString(),
  },
];

export const getRiskLevelColor = (riskLevel: ClimateLocation['riskLevel']): string => {
  switch (riskLevel) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getSeverityColor = (severity: AIInsight['severity']): string => {
  switch (severity) {
    case 'info':
      return 'text-blue-600 bg-blue-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}; 