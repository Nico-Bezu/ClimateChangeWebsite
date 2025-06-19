# Climate Change Dashboard

A modern, interactive climate change monitoring dashboard built with Next.js, featuring real-time data visualization, interactive maps, and AI-powered climate insights.

## Features

🌍 **Interactive Global Map**
- Real-time climate data visualization
- Color-coded risk levels for different locations
- Detailed location-specific information

📊 **Global Climate Statistics**
- Temperature trends and anomalies
- CO₂ concentration monitoring
- Sea level rise tracking
- Arctic ice extent data
- Deforestation rates

🤖 **AI Climate Assistant**
- Intelligent climate data analysis
- Location-specific insights
- Climate trend explanations
- Actionable recommendations

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet with OpenStreetMap
- **Icons**: Lucide React
- **AI**: OpenAI GPT integration (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ClimateChangeWebsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. (Optional) Add your API keys to `.env.local`:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Interactive Map
- Navigate through the global map to explore different regions
- Click on markers to view detailed climate data for specific locations
- Use the legend to understand risk level color coding

### Global Statistics
- View comprehensive climate data including temperature, CO₂, sea levels
- Monitor trends and changes over time
- Access real-time environmental alerts

### AI Assistant
- Ask questions about climate data and trends
- Get location-specific analysis by selecting areas on the map
- Receive explanations about climate phenomena

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main dashboard page
├── components/         # React components
│   ├── AIClimateChat.tsx    # AI chatbot component

│   └── ClimateStats.tsx     # Statistics dashboard
├── lib/                # Utility functions and data
│   └── climate-data.ts # Mock climate data and helpers
└── types/              # TypeScript type definitions
    └── climate.ts      # Climate data interfaces
```

## Data Sources

The application currently uses simulated climate data for demonstration purposes. In a production environment, you would integrate with:

- NASA Climate Data
- NOAA Weather APIs
- OpenWeatherMap
- Climate.gov APIs
- Satellite imaging services

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Climate data visualization inspired by NASA's climate monitoring tools
- Map functionality powered by OpenStreetMap and Leaflet
- Icons provided by Lucide React
- AI capabilities enhanced by OpenAI's GPT models 