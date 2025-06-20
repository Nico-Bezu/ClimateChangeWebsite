"use client"

import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer } from '@deck.gl/layers'
import Map from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Open-source Carto Positron tiles (no token needed)
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

// Sample data (replace with real data)
const DATA = [
  { position: [-74.006, 40.7128], temperature: 15.2, co2: 420 },
  { position: [-0.1276, 51.5074], temperature: 11.8, co2: 405 },
  { position: [2.3522, 48.8566], temperature: 12.5, co2: 410 },
  { position: [139.6917, 35.6895], temperature: 16.3, co2: 415 },
  { position: [-122.4194, 37.7749], temperature: 14.7, co2: 425 }
]

const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5,
  bearing: 0,
  pitch: 0
}

export function ClimateMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const [layerType, setLayerType] = useState<'temperature' | 'co2'>('temperature')

  const layer = new ScatterplotLayer({
    id: 'points',
    data: DATA,
    getPosition: (d: any) => d.position,
    getRadius: (d: any) => 3,
    getFillColor: (d: any) => {
      const val = layerType === 'temperature' ? d.temperature : d.co2
      if (layerType === 'temperature') {
        return val < 10 ? [59, 130, 246] : val < 20 ? [34, 197, 94] : val < 25 ? [251, 191, 36] : [239, 68, 68]
      }
      return val < 400 ? [34,197,94] : val < 420 ? [251,191,36] : val < 430 ? [249,115,22] : [239,68,68]
    },
    pickable: true,
    radiusScale: 20000,
    radiusMinPixels: 3,
    radiusMaxPixels: 10,
    opacity: 0.8
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Climate Data</CardTitle>
        <CardDescription>Real map with climate overlays</CardDescription>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">5 Cities</Badge>
          <Tabs value={layerType} onValueChange={v=>setLayerType(v as any)}>
            <TabsList className="grid grid-cols-2 w-40">
              <TabsTrigger value="temperature">Temp</TabsTrigger>
              <TabsTrigger value="co2">CO₂</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-16">
        <div className="relative w-full h-72 p-4">{/* 18rem ~ 288px to fit attribution */}
          <DeckGL
            viewState={viewState}
            controller={true}
            onViewStateChange={({viewState: vs})=>setViewState(vs as any)}
            layers={[layer]}
          >
            <Map
              mapLib={maplibregl}
              mapStyle={MAP_STYLE}
              {...viewState}
              style={{width:'100%', height:'100%'}}
              onMove={evt=>setViewState(evt.viewState)}
            />
          </DeckGL>
        </div>
      </CardContent>
    </Card>
  )
} 