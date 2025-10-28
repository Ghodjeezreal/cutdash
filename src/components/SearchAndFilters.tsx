"use client";

import { useState, useCallback, useMemo } from "react";
import { FiSearch, FiFilter, FiX, FiMapPin, FiStar, FiDollarSign, FiClock } from "react-icons/fi";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: SearchFilters) => void;
  placeholder?: string;
  showLocationFilter?: boolean;
  showPriceFilter?: boolean;
  showRatingFilter?: boolean;
  showAvailabilityFilter?: boolean;
}

export interface SearchFilters {
  query: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: 'now' | 'today' | 'tomorrow' | 'this_week';
  services?: string[];
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'distance';
}

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

// Filter Dropdown Container
function FilterDropdown({ isOpen, onClose, children, title }: FilterDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-10" onClick={onClose} />
      
      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}

// Price Range Slider
interface PriceRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

function PriceRange({ min, max, value, onChange }: PriceRangeProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - 1000);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + 1000);
    onChange([value[0], newMax]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
            <input
              type="number"
              value={value[0]}
              onChange={handleMinChange}
              min={min}
              max={max}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
            <input
              type="number"
              value={value[1]}
              onChange={handleMaxChange}
              min={min}
              max={max}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        ₦{value[0].toLocaleString()} - ₦{value[1].toLocaleString()}
      </div>
    </div>
  );
}

// Rating Filter
interface RatingFilterProps {
  value?: number;
  onChange: (rating?: number) => void;
}

function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-2">
      <button
        onClick={() => onChange(undefined)}
        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
          value === undefined
            ? 'bg-primary-50 text-primary-700 border border-primary-200'
            : 'hover:bg-gray-50'
        }`}
      >
        Any Rating
      </button>
      
      {ratings.map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
            value === rating
              ? 'bg-primary-50 text-primary-700 border border-primary-200'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm">{rating}+ stars</span>
        </button>
      ))}
    </div>
  );
}

// Availability Filter
interface AvailabilityFilterProps {
  value?: string;
  onChange: (availability?: string) => void;
}

function AvailabilityFilter({ value, onChange }: AvailabilityFilterProps) {
  const options = [
    { value: 'now', label: 'Available Now', description: 'Can start within 2 hours' },
    { value: 'today', label: 'Available Today', description: 'Available anytime today' },
    { value: 'tomorrow', label: 'Available Tomorrow', description: 'Available tomorrow' },
    { value: 'this_week', label: 'This Week', description: 'Available within 7 days' }
  ];

  return (
    <div className="space-y-2">
      <button
        onClick={() => onChange(undefined)}
        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
          value === undefined
            ? 'bg-primary-50 text-primary-700 border border-primary-200'
            : 'hover:bg-gray-50'
        }`}
      >
        Any Time
      </button>
      
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            value === option.value
              ? 'bg-primary-50 text-primary-700 border border-primary-200'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <FiClock className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500">{option.description}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// Main Search and Filters Component
export function SearchAndFilters({
  onSearch,
  onFiltersChange,
  placeholder = "Search barbers, services...",
  showLocationFilter = true,
  showPriceFilter = true,
  showRatingFilter = true,
  showAvailabilityFilter = true
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    priceRange: { min: 1000, max: 15000 },
    sortBy: 'relevance'
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Debounced search
  const handleSearchChange = useCallback((query: string) => {
    const newFilters = { ...filters, query };
    setFilters(newFilters);
    onSearch(query);
    onFiltersChange(newFilters);
  }, [filters, onSearch, onFiltersChange]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: SearchFilters = {
      query: filters.query, // Keep search query
      sortBy: 'relevance'
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.priceRange && (filters.priceRange.min > 1000 || filters.priceRange.max < 15000)) count++;
    if (filters.rating) count++;
    if (filters.availability) count++;
    if (filters.services && filters.services.length > 0) count++;
    return count;
  }, [filters]);

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={filters.query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {/* Location Filter */}
        {showLocationFilter && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                filters.location
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiMapPin className="w-4 h-4" />
              <span>{filters.location || 'Location'}</span>
            </button>

            <FilterDropdown
              isOpen={activeDropdown === 'location'}
              onClose={() => setActiveDropdown(null)}
              title="Location"
            >
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="space-y-1">
                  {['Current Location', 'Lagos Island', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere'].map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        handleFilterChange('location', location);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </FilterDropdown>
          </div>
        )}

        {/* Price Filter */}
        {showPriceFilter && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                filters.priceRange && (filters.priceRange.min > 1000 || filters.priceRange.max < 15000)
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiDollarSign className="w-4 h-4" />
              <span>Price</span>
            </button>

            <FilterDropdown
              isOpen={activeDropdown === 'price'}
              onClose={() => setActiveDropdown(null)}
              title="Price Range"
            >
              <PriceRange
                min={1000}
                max={15000}
                value={[filters.priceRange?.min || 1000, filters.priceRange?.max || 15000]}
                onChange={(value) => handleFilterChange('priceRange', { min: value[0], max: value[1] })}
              />
            </FilterDropdown>
          </div>
        )}

        {/* Rating Filter */}
        {showRatingFilter && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'rating' ? null : 'rating')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                filters.rating
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiStar className="w-4 h-4" />
              <span>{filters.rating ? `${filters.rating}+ stars` : 'Rating'}</span>
            </button>

            <FilterDropdown
              isOpen={activeDropdown === 'rating'}
              onClose={() => setActiveDropdown(null)}
              title="Minimum Rating"
            >
              <RatingFilter
                value={filters.rating}
                onChange={(rating) => handleFilterChange('rating', rating)}
              />
            </FilterDropdown>
          </div>
        )}

        {/* Availability Filter */}
        {showAvailabilityFilter && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                filters.availability
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiClock className="w-4 h-4" />
              <span>
                {filters.availability
                  ? filters.availability.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                  : 'Availability'
                }
              </span>
            </button>

            <FilterDropdown
              isOpen={activeDropdown === 'availability'}
              onClose={() => setActiveDropdown(null)}
              title="Availability"
            >
              <AvailabilityFilter
                value={filters.availability}
                onChange={(availability) => handleFilterChange('availability', availability)}
              />
            </FilterDropdown>
          </div>
        )}

        {/* Sort By */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="distance">Nearest First</option>
          </select>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex-shrink-0"
          >
            <FiX className="w-4 h-4" />
            <span>Clear ({activeFiltersCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}