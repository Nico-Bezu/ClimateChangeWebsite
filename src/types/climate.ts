export interface ClimateLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  co2Level: number;
  seaLevel: number;
  lastUpdated: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface ClimateData {
  globalTemp: number;
  globalCO2: number;
  seaLevelRise: number;
  arcticIceExtent: number;
  deforestation: number;
  lastUpdated: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  confidence: number;
  category: 'temperature' | 'co2' | 'sea-level' | 'ice' | 'forest' | 'general';
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}



export interface WeatherApiResponse {
  main: {
    temp: number;
    humidity: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  name: string;
  sys: {
    country: string;
  };
} 