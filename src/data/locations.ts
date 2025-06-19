import { ClimateLocation } from '@/types/climate'

export const CLIMATE_LOCATIONS: ClimateLocation[] = [
  {
    id: '1',
    name: 'Venice',
    country: 'Italy',
    latitude: 45.4408,
    longitude: 12.3155,
    region: 'Europe',
    description: 'Historic city facing increasing sea level rise and flooding',
    severity: 'high',
    category: 'sea-level'
  },
  {
    id: '2',
    name: 'Maldives',
    country: 'Maldives',
    latitude: 3.2028,
    longitude: 73.2207,
    region: 'Asia',
    description: 'Island nation threatened by rising seas and coral bleaching',
    severity: 'critical',
    category: 'sea-level'
  },
  {
    id: '3',
    name: 'Great Barrier Reef',
    country: 'Australia',
    latitude: -18.2871,
    longitude: 147.6992,
    region: 'Oceania',
    description: 'Coral reef system experiencing massive bleaching events',
    severity: 'critical',
    category: 'ecosystem'
  },
  {
    id: '4',
    name: 'Amazon Rainforest',
    country: 'Brazil',
    latitude: -3.4653,
    longitude: -62.2159,
    region: 'South America',
    description: 'Rainforest facing deforestation and severe drought',
    severity: 'critical',
    category: 'ecosystem'
  },
  {
    id: '5',
    name: 'Sahel Region',
    country: 'Mali',
    latitude: 17.5707,
    longitude: -3.9962,
    region: 'Africa',
    description: 'Semi-arid region experiencing rapid desertification',
    severity: 'high',
    category: 'drought'
  },
  {
    id: '6',
    name: 'Greenland Ice Sheet',
    country: 'Greenland',
    latitude: 72.0000,
    longitude: -40.0000,
    region: 'North America',
    description: 'Massive ice sheet experiencing accelerated melting',
    severity: 'critical',
    category: 'ice-melt'
  },
  {
    id: '7',
    name: 'Kiribati',
    country: 'Kiribati',
    latitude: -3.3704,
    longitude: -168.7340,
    region: 'Oceania',
    description: 'Pacific island nation at risk of complete submersion',
    severity: 'critical',
    category: 'sea-level'
  },
  {
    id: '8',
    name: 'California Central Valley',
    country: 'United States',
    latitude: 36.7783,
    longitude: -119.4179,
    region: 'North America',
    description: 'Agricultural heartland facing severe drought and water scarcity',
    severity: 'high',
    category: 'drought'
  },
  {
    id: '9',
    name: 'Bangladesh Delta',
    country: 'Bangladesh',
    latitude: 23.6850,
    longitude: 90.3563,
    region: 'Asia',
    description: 'River delta experiencing frequent flooding and cyclones',
    severity: 'high',
    category: 'sea-level'
  },
  {
    id: '10',
    name: 'Arctic Tundra',
    country: 'Alaska',
    latitude: 68.7964,
    longitude: -153.0137,
    region: 'North America',
    description: 'Permafrost melting and ecosystem transformation',
    severity: 'high',
    category: 'ice-melt'
  },
  {
    id: '11',
    name: 'Sahara Desert Edge',
    country: 'Morocco',
    latitude: 31.7917,
    longitude: -7.0926,
    region: 'Africa',
    description: 'Desert expansion affecting agricultural regions',
    severity: 'medium',
    category: 'drought'
  },
  {
    id: '12',
    name: 'Himalayan Glaciers',
    country: 'Nepal',
    latitude: 28.3949,
    longitude: 84.1240,
    region: 'Asia',
    description: 'Mountain glaciers retreating rapidly, affecting water supply',
    severity: 'high',
    category: 'ice-melt'
  }
] 