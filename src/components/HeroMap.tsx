"use client";

import { useState, useEffect } from "react";
import { FiMapPin, FiScissors, FiStar, FiNavigation } from "react-icons/fi";

export default function HeroMap() {
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Mock barber data with locations near user
  const nearbyBarbers = [
    { 
      id: 1, 
      name: "Ahmed K.", 
      rating: 4.9, 
      distance: "0.5km",
      position: { top: '45%', left: '52%' },
      specialties: ["Haircut", "Beard Trim"],
      available: true,
      eta: "5 min"
    },
    { 
      id: 2, 
      name: "Chidi O.", 
      rating: 4.8, 
      distance: "0.8km",
      position: { top: '35%', left: '48%' },
      specialties: ["Styling", "Shave"],
      available: true,
      eta: "8 min"
    },
    { 
      id: 3, 
      name: "Ibrahim S.", 
      rating: 4.7, 
      distance: "1.2km",
      position: { top: '60%', left: '45%' },
      specialties: ["Haircut", "Grooming"],
      available: false,
      eta: "Busy"
    },
    { 
      id: 4, 
      name: "Daniel A.", 
      rating: 4.9, 
      distance: "0.7km",
      position: { top: '40%', left: '58%' },
      specialties: ["Premium Cut", "Beard"],
      available: true,
      eta: "7 min"
    },
    { 
      id: 5, 
      name: "Marcus T.", 
      rating: 4.6, 
      distance: "1.5km",
      position: { top: '55%', left: '40%' },
      specialties: ["Fade", "Line up"],
      available: true,
      eta: "12 min"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Glass Background with Map-like Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-gray-100/60 to-green-100/80">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B7280" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </div>
        
        {/* Map Roads/Streets */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
          <path d="M 0 60% L 100% 45%" stroke="#94A3B8" strokeWidth="2" fill="none"/>
          <path d="M 30% 0 L 35% 100%" stroke="#94A3B8" strokeWidth="1.5" fill="none"/>
          <path d="M 60% 0 L 55% 100%" stroke="#94A3B8" strokeWidth="1" fill="none"/>
          <path d="M 0 30% L 100% 35%" stroke="#94A3B8" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"></div>

      {/* Your Location Pin */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Pulsing Ring */}
          <div className="absolute inset-0 bg-primary-500/30 rounded-full animate-ping w-8 h-8"></div>
          <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-pulse scale-150 w-8 h-8"></div>
          
          {/* Location Pin */}
          <div className="relative bg-primary-600 p-3 rounded-full shadow-lg border-2 border-white">
            <FiNavigation className="h-4 w-4 text-white" />
          </div>
          
          {/* Location Label */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800 whitespace-nowrap shadow-sm">
            Your Location
          </div>
        </div>
      </div>

      {/* Barber Pins */}
      {nearbyBarbers.map((barber) => (
        <div
          key={barber.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          style={{ top: barber.position.top, left: barber.position.left }}
          onClick={() => setSelectedBarber(selectedBarber === barber.id ? null : barber.id)}
        >
          {/* Barber Pin */}
          <div className={`relative transition-all duration-200 ${
            selectedBarber === barber.id ? 'scale-110' : 'hover:scale-105'
          }`}>
            {/* Ripple animation for available barbers */}
            {barber.available && (
              <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
                {[0, 1, 2].map((ring) => (
                  <div
                    key={ring}
                    className="absolute w-12 h-12 rounded-full border-2 border-green-400 opacity-30 animate-ping"
                    style={{
                      animationDelay: `${ring * 0.7}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            )}

            <div className={`relative p-2 rounded-full shadow-lg border-2 border-white ${
              barber.available 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-400'
            }`}>
              <FiScissors className="h-3 w-3 text-white" />
            </div>
            
            {/* Distance Badge */}
            <div className="absolute -top-1 -right-1 bg-white/90 backdrop-blur-sm text-xs px-1 py-0.5 rounded-full text-gray-700 font-medium text-[10px]">
              {barber.distance}
            </div>
          </div>

          {/* Barber Info Popup */}
          {selectedBarber === barber.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-3 z-30">
              <div className="text-sm">
                <div className="font-semibold text-gray-800 mb-1">{barber.name}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{barber.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    barber.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {barber.available ? `ETA: ${barber.eta}` : barber.eta}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {barber.specialties.join(", ")}
                </div>
                <div className="text-xs font-medium text-primary-600">
                  {barber.distance} away
                </div>
              </div>
              {/* Popup Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
            </div>
          )}
        </div>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-2 text-xs shadow-lg border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-700">Busy</span>
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/20">
        <div className="text-xs text-gray-600 mb-1">Nearby Barbers</div>
        <div className="text-lg font-bold text-gray-800">{nearbyBarbers.filter(b => b.available).length}</div>
        <div className="text-xs text-green-600">Available now</div>
      </div>
    </div>
  );
}