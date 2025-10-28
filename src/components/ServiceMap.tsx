"use client";

import { useState, useEffect } from "react";
import { FiMapPin, FiUser, FiClock, FiNavigation, FiZoomIn, FiZoomOut, FiStar } from "react-icons/fi";

interface ServiceLocation {
  id: string;
  name: string;
  type: 'barber' | 'pickup' | 'service-area';
  lat: number;
  lng: number;
  availability: 'available' | 'busy' | 'offline';
  rating: number;
  eta?: string;
}

export default function ServiceMap() {
  const [selectedLocation, setSelectedLocation] = useState<ServiceLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
  const [zoomLevel, setZoomLevel] = useState(12);

  // Mock service locations
  const serviceLocations: ServiceLocation[] = [
    {
      id: '1',
      name: 'John\'s Mobile Cuts',
      type: 'barber',
      lat: 6.5244,
      lng: 3.3792,
      availability: 'available',
      rating: 4.8,
      eta: '15 min'
    },
    {
      id: '2',
      name: 'Pro Barber Services',
      type: 'barber',
      lat: 6.4474,
      lng: 3.3903,
      availability: 'busy',
      rating: 4.9,
      eta: '45 min'
    },
    {
      id: '3',
      name: 'Victoria Island Pickup',
      type: 'pickup',
      lat: 6.4281,
      lng: 3.4219,
      availability: 'available',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Ikeja Pickup Point',
      type: 'pickup',
      lat: 6.6018,
      lng: 3.3515,
      availability: 'available',
      rating: 4.6
    },
    {
      id: '5',
      name: 'Express Cuts Mobile',
      type: 'barber',
      lat: 6.5795,
      lng: 3.3211,
      availability: 'available',
      rating: 4.5,
      eta: '20 min'
    }
  ];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  const getLocationIcon = (type: string, availability: string) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg";
    
    if (type === 'barber') {
      return availability === 'available' 
        ? `${baseClasses} bg-green-500` 
        : availability === 'busy' 
        ? `${baseClasses} bg-yellow-500`
        : `${baseClasses} bg-gray-500`;
    } else if (type === 'pickup') {
      return `${baseClasses} bg-blue-500`;
    }
    return `${baseClasses} bg-primary-500`;
  };

  const handleLocationClick = (location: ServiceLocation) => {
    setSelectedLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
  };

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel + 1, 18));
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel - 1, 8));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Professional Services Coming to You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find available barbers and pickup points near your location. Real-time availability and instant booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Map Header */}
              <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5" />
                  <span className="font-semibold">Service Area Map</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={zoomOut} className="p-1 hover:bg-primary-700 rounded">
                    <FiZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm">Zoom: {zoomLevel}</span>
                  <button onClick={zoomIn} className="p-1 hover:bg-primary-700 rounded">
                    <FiZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Simplified Map Visualization */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden">
                {/* Map Grid Lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`h-${i}`} className="absolute w-full border-t border-gray-400" style={{ top: `${i * 10}%` }} />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`v-${i}`} className="absolute h-full border-l border-gray-400" style={{ left: `${i * 10}%` }} />
                  ))}
                </div>

                {/* Roads/Streets */}
                <div className="absolute inset-0">
                  <div className="absolute bg-gray-300 h-1" style={{ top: '30%', left: '0%', width: '100%' }} />
                  <div className="absolute bg-gray-300 h-1" style={{ top: '60%', left: '0%', width: '100%' }} />
                  <div className="absolute bg-gray-300 w-1" style={{ left: '25%', top: '0%', height: '100%' }} />
                  <div className="absolute bg-gray-300 w-1" style={{ left: '75%', top: '0%', height: '100%' }} />
                </div>

                {/* User Location */}
                {userLocation && (
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ 
                      left: '50%', 
                      top: '50%'
                    }}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-900 bg-white px-2 py-1 rounded shadow">
                        You
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Locations */}
                {serviceLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-10"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${25 + (index % 3) * 25}%`
                    }}
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className={getLocationIcon(location.type, location.availability)}>
                      {location.type === 'barber' ? (
                        <FiUser className="h-4 w-4" />
                      ) : (
                        <FiMapPin className="h-4 w-4" />
                      )}
                    </div>
                    {selectedLocation?.id === location.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                        {location.name}
                      </div>
                    )}
                  </div>
                ))}

                {/* Service Coverage Areas */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute rounded-full border-2 border-primary-300 border-dashed opacity-30" 
                       style={{ 
                         left: '35%', 
                         top: '35%', 
                         width: '30%', 
                         height: '30%', 
                         transform: 'translate(-50%, -50%)' 
                       }} 
                  />
                  <div className="absolute rounded-full border-2 border-green-300 border-dashed opacity-30" 
                       style={{ 
                         left: '65%', 
                         top: '45%', 
                         width: '25%', 
                         height: '25%', 
                         transform: 'translate(-50%, -50%)' 
                       }} 
                  />
                </div>
              </div>

              {/* Map Legend */}
              <div className="bg-white p-4 border-t">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Available Barbers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Busy Barbers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Pickup Points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>Your Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Services</h3>
              <div className="space-y-4">
                {serviceLocations
                  .filter(loc => loc.availability === 'available')
                  .sort((a, b) => (a.eta || '0').localeCompare(b.eta || '0'))
                  .map((location) => (
                    <div
                      key={location.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedLocation?.id === location.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{location.name}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FiStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(location.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {location.rating}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 capitalize">
                            {location.type === 'barber' ? 'Mobile Barber' : 'Pickup Point'}
                          </p>
                        </div>
                        <div className="text-right">
                          {location.eta && (
                            <div className="flex items-center space-x-1 text-sm text-green-600">
                              <FiClock className="h-4 w-4" />
                              <span>{location.eta}</span>
                            </div>
                          )}
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            location.availability === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {location.availability}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <FiNavigation className="h-4 w-4" />
                  <span>Find Nearest Barber</span>
                </button>
                <button className="w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  View All Pickup Points
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Set Home Location
                </button>
              </div>
            </div>

            {/* Service Coverage Info */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Coverage</h3>
              <p className="text-sm text-gray-600 mb-4">
                We currently serve Lagos Island, Victoria Island, Ikeja, and surrounding areas.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average Response Time:</span>
                  <span className="font-semibold">15-20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Barbers:</span>
                  <span className="font-semibold">12 available</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Points:</span>
                  <span className="font-semibold">8 locations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}