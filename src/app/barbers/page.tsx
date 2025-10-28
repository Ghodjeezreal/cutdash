"use client";

import { useState } from "react";
import { FiStar, FiMapPin, FiClock, FiDollarSign, FiHeart, FiUser } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchAndFilters, SearchFilters } from "@/components/SearchAndFilters";
import { Barber } from "@/types";

// Mock barbers data
const mockBarbers: Barber[] = [
  {
    id: "1",
    email: "ahmed@example.com",
    firstName: "Ahmed",
    lastName: "Hassan",
    role: 'barber',
    businessName: "Ahmed's Premium Cuts",
    bio: "Professional barber with 8+ years experience. Specializing in modern cuts and classic styles.",
    experience: 8,
    specialties: ["modern cuts", "classic styles", "beard styling"],
    serviceAreas: ["Victoria Island", "Ikoyi", "Lekki"],
    hourlyRate: 4500,
    rating: 4.8,
    totalReviews: 156,
    completedJobs: 89,
    isAvailable: true,
    portfolio: [
      { 
        id: "1", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Modern cut",
        serviceType: "haircut",
        uploadedAt: new Date()
      },
      { 
        id: "2", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Beard styling",
        serviceType: "beard_trim",
        uploadedAt: new Date()
      }
    ],
    certifications: [],
    workingHours: {
      monday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
      tuesday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
      wednesday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
      thursday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
      friday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
      saturday: { isAvailable: true, startTime: "10:00", endTime: "16:00" },
      sunday: { isAvailable: false, startTime: "00:00", endTime: "00:00" }
    },
    commissionRate: 15,
    phone: "+234-803-456-7890",
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    email: "david@example.com",
    firstName: "David",
    lastName: "Okonkwo",
    role: 'barber',
    businessName: "David's Mobile Barbershop",
    bio: "Expert in traditional and contemporary cuts. Mobile service across Lagos mainland.",
    experience: 5,
    specialties: ["traditional cuts", "contemporary styles", "mobile service"],
    serviceAreas: ["Surulere", "Yaba", "Maryland"],
    hourlyRate: 3500,
    rating: 4.6,
    totalReviews: 89,
    completedJobs: 67,
    isAvailable: true,
    phone: "+234-801-234-5678",
    isActive: true,
    portfolio: [
      { 
        id: "1", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Classic cut",
        serviceType: "haircut",
        uploadedAt: new Date()
      }
    ],
    certifications: [],
    workingHours: {
      monday: { isAvailable: true, startTime: "08:00", endTime: "19:00" },
      tuesday: { isAvailable: true, startTime: "08:00", endTime: "19:00" },
      wednesday: { isAvailable: true, startTime: "08:00", endTime: "19:00" },
      thursday: { isAvailable: true, startTime: "08:00", endTime: "19:00" },
      friday: { isAvailable: true, startTime: "08:00", endTime: "19:00" },
      saturday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
      sunday: { isAvailable: true, startTime: "12:00", endTime: "16:00" }
    },
    commissionRate: 15,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    email: "kemi@example.com",
    firstName: "Kemi",
    lastName: "Adebayo",
    role: 'barber',
    businessName: "Kemi's Style Studio",
    bio: "Specializing in modern cuts, braids, and styling. 5+ years professional experience.",
    experience: 5,
    specialties: ["modern cuts", "braids", "styling", "coloring"],
    serviceAreas: ["Lekki", "Victoria Island", "Ajah"],
    hourlyRate: 5000,
    rating: 4.9,
    totalReviews: 234,
    completedJobs: 178,
    isAvailable: true,
    portfolio: [
      { 
        id: "1", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Style 1",
        serviceType: "haircut",
        uploadedAt: new Date()
      },
      { 
        id: "2", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Style 2",
        serviceType: "styling",
        uploadedAt: new Date()
      },
      { 
        id: "3", 
        imageUrl: "/api/placeholder/200/200", 
        description: "Style 3",
        serviceType: "coloring",
        uploadedAt: new Date()
      }
    ],
    certifications: [],
    workingHours: {
      monday: { isAvailable: false, startTime: "", endTime: "" },
      tuesday: { isAvailable: true, startTime: "10:00", endTime: "18:00" },
      wednesday: { isAvailable: true, startTime: "10:00", endTime: "18:00" },
      thursday: { isAvailable: true, startTime: "10:00", endTime: "18:00" },
      friday: { isAvailable: true, startTime: "10:00", endTime: "18:00" },
      saturday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
      sunday: { isAvailable: false, startTime: "", endTime: "" }
    },
    commissionRate: 15,
    phone: "+234-802-345-6789",
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function BarberCard({ barber }: { barber: Barber }) {
  const [isFavorited, setIsFavorited] = useState(false);

  // Use hourlyRate as base price since pricing array doesn't exist
  const basePrice = barber.hourlyRate;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src="/api/placeholder/400/200"
          alt={barber.businessName}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            isFavorited 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <FiHeart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
        {barber.isVerified && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Verified
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {barber.businessName}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{barber.rating}</span>
            <span className="text-gray-500">({barber.totalReviews})</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {barber.bio}
        </p>

        {/* Location */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FiMapPin className="w-4 h-4" />
            <span>{barber.serviceAreas[0]}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FiClock className="w-4 h-4 text-gray-600" />
            <span className="text-green-600">Available today</span>
          </div>
        </div>

        {/* Services */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {barber.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {specialty.replace('_', ' ')}
              </span>
            ))}
            {barber.specialties.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{barber.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm">
            <FiDollarSign className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">
              From ₦{basePrice.toLocaleString()}
            </span>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BarbersPage() {
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>(mockBarbers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBarbers(query, { query });
  };

  const handleFiltersChange = (filters: SearchFilters) => {
    filterBarbers(searchQuery, filters);
  };

  const filterBarbers = (query: string, filters: SearchFilters) => {
    let filtered = [...mockBarbers];

    // Text search
    if (query.trim()) {
      filtered = filtered.filter(barber =>
        barber.businessName?.toLowerCase().includes(query.toLowerCase()) ||
        (barber.businessName || '').toLowerCase().includes(query.toLowerCase()) ||
        barber.serviceAreas.some(area => 
          area.toLowerCase().includes(query.toLowerCase())
        ) ||
        barber.specialties.some(specialty =>
          specialty.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(barber =>
        barber.serviceAreas.some(area => 
          area.toLowerCase().includes(filters.location!.toLowerCase())
        )
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(barber => {
        // Use hourlyRate for price filtering
        const minPrice = barber.hourlyRate;
        return minPrice >= filters.priceRange!.min && minPrice <= filters.priceRange!.max;
      });
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(barber => barber.rating >= filters.rating!);
    }

    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'distance':
          // In a real app, this would sort by actual distance
          filtered.sort(() => Math.random() - 0.5);
          break;
        default:
          // Relevance (keep original order)
          break;
      }
    }

    setFilteredBarbers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Barber
          </h1>
          <p className="text-gray-600">
            Discover skilled barbers in your area and book your next appointment
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchAndFilters
            onSearch={handleSearch}
            onFiltersChange={handleFiltersChange}
            placeholder="Search barbers, services, or locations..."
          />
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredBarbers.length} barber{filteredBarbers.length !== 1 ? 's' : ''} found
            </h2>
            {searchQuery && (
              <p className="text-gray-600 text-sm mt-1">
                Showing results for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>

        {/* Barbers Grid */}
        {filteredBarbers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBarbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No barbers found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find more results
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredBarbers(mockBarbers);
              }}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Load More (for pagination) */}
        {filteredBarbers.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Barbers
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}