'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, AlertCircle, Lightbulb } from 'lucide-react';
import { ChatMessage, ClimateLocation, AIInsight } from '@/types/climate';
import { sampleAIInsights, getSeverityColor } from '@/lib/climate-data';

interface AIClimateChatProps {
  selectedLocation?: ClimateLocation | null;
}

const AIClimateChat: React.FC<AIClimateChatProps> = ({ selectedLocation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>(sampleAIInsights);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: 'Hello! I\'m your AI climate assistant. I can help you understand climate data, explain trends, and answer questions about our changing planet. Try asking me about global warming, sea level rise, or any specific location!',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Location-specific responses
    if (selectedLocation && (message.includes('here') || message.includes('this location'))) {
      return `Based on the data for ${selectedLocation.name}, ${selectedLocation.country}:

Temperature: ${selectedLocation.temperature}°C
Risk Level: ${selectedLocation.riskLevel}
CO₂ Levels: ${selectedLocation.co2Level} ppm

${selectedLocation.riskLevel === 'critical' 
  ? 'This location shows critical climate risks. The high CO₂ levels and temperature indicate urgent need for climate action.'
  : selectedLocation.riskLevel === 'high'
  ? 'This location shows concerning climate trends that require attention and monitoring.'
  : 'While this location shows some climate impacts, the risk level is currently manageable with proper planning.'
}`;
    }

    // Topic-based responses
    if (message.includes('temperature') || message.includes('warming')) {
      return 'Global temperatures have risen by approximately 1.2°C since pre-industrial times. This warming is primarily caused by increased greenhouse gas concentrations. The impacts include more frequent extreme weather events, melting ice caps, and shifting weather patterns that affect agriculture and ecosystems worldwide.';
    }

    if (message.includes('sea level') || message.includes('ocean')) {
      return 'Sea levels are rising at an accelerating rate of about 3.3mm per year globally. This is caused by thermal expansion of warming oceans and melting of land-based ice. Coastal cities face increasing flood risks, with some areas experiencing over 4mm of rise annually.';
    }

    if (message.includes('co2') || message.includes('carbon')) {
      return 'Atmospheric CO₂ levels have reached 421.4 ppm, the highest in over 3 million years. Pre-industrial levels were around 280 ppm. This rapid increase is primarily from fossil fuel burning and deforestation. The rate of increase is accelerating, requiring immediate action to reduce emissions.';
    }

    if (message.includes('ice') || message.includes('arctic')) {
      return 'Arctic sea ice is declining at a rate of about 13% per decade. Current extent is around 4.72 million km², well below historical averages. This creates a feedback loop as less ice means more heat absorption by dark ocean waters, accelerating warming.';
    }

    if (message.includes('forest') || message.includes('deforestation')) {
      return 'Global deforestation continues at about 15.3 million hectares per year. Forests are crucial carbon sinks, and their loss accelerates climate change while reducing biodiversity. Protecting existing forests and reforestation are critical climate solutions.';
    }

    if (message.includes('solution') || message.includes('what can') || message.includes('help')) {
      return 'Climate solutions include: 1) Transition to renewable energy, 2) Improve energy efficiency, 3) Protect and restore forests, 4) Sustainable transportation, 5) Climate-smart agriculture, 6) Individual actions like reducing consumption and supporting climate policies. Every action matters at this critical time.';
    }

    // Default response
    return 'That\'s an interesting question about climate change. I can provide information about temperature trends, sea level rise, CO₂ concentrations, ice extent, and deforestation. I can also analyze specific locations if you select them on the map. What specific aspect would you like to explore?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try asking your question again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-xl">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Climate Assistant
        </h3>
        <p className="text-sm opacity-90">Get insights about climate data and trends</p>
      </div>

      {/* AI Insights */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
          <Lightbulb className="h-4 w-4" />
          Latest AI Insights
        </h4>
        <div className="space-y-2">
          {insights.slice(0, 2).map((insight) => (
            <div
              key={insight.id}
              className={`p-2 rounded text-xs ${getSeverityColor(insight.severity)}`}
            >
              <div className="font-semibold">{insight.title}</div>
              <div className="mt-1">{insight.description}</div>
              <div className="mt-1 text-xs opacity-75">
                Confidence: {(insight.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.type === 'assistant' && (
                  <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
                {message.type === 'user' && (
                  <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
              <div className="text-xs opacity-75 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about climate data, trends, or specific locations..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {selectedLocation && `Selected: ${selectedLocation.name}, ${selectedLocation.country}`}
        </p>
      </div>
    </div>
  );
};

export default AIClimateChat; 