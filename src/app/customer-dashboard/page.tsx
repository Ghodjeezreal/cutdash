"use client";

import { useState } from "react";
import { FiUser, FiCalendar, FiClock, FiMapPin, FiStar, FiEdit, FiBookmark, FiCreditCard, FiSettings } from "react-icons/fi";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock customer data
  const customer = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+234 808 123 4567",
    avatar: null,
    totalBookings: 12,
    favoriteBarbers: 3,
    memberSince: "January 2024"
  };

  const upcomingBookings = [
    {
      id: "1",
      barber: {
        name: "Ahmed Hassan",
        rating: 4.9,
        avatar: null
      },
      service: "Haircut + Beard Trim",
      date: "Today",
      time: "2:00 PM",
      location: "Home",
      address: "123 Victoria Island, Lagos",
      status: "confirmed",
      price: "₦4,500"
    },
    {
      id: "2",
      barber: {
        name: "David Okonkwo",
        rating: 4.8,
        avatar: null
      },
      service: "Haircut",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Office",
      address: "456 Ikoyi Business District",
      status: "pending",
      price: "₦3,800"
    }
  ];

  const recentBookings = [
    {
      id: "3",
      barber: {
        name: "Samuel Adebayo",
        rating: 4.9
      },
      service: "Full Service",
      date: "Jan 15, 2024",
      location: "Pickup Point",
      status: "completed",
      price: "₦5,000",
      rating: 5,
      review: "Excellent service! Very professional and skilled."
    },
    {
      id: "4",
      barber: {
        name: "Ahmed Hassan",
        rating: 4.9
      },
      service: "Haircut",
      date: "Jan 10, 2024",
      location: "Home",
      status: "completed",
      price: "₦3,000",
      rating: 5
    }
  ];

  const favoriteBarbers = [
    {
      id: "1",
      name: "Ahmed Hassan",
      rating: 4.9,
      reviews: 127,
      specialty: "Modern cuts & Beard styling",
      lastVisit: "2 days ago",
      nextAvailable: "Today 3:00 PM"
    },
    {
      id: "2",
      name: "Samuel Adebayo",
      rating: 4.9,
      reviews: 156,
      specialty: "All styles & Hair treatments",
      lastVisit: "1 week ago",
      nextAvailable: "Tomorrow 11:00 AM"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {customer.firstName}!
                </h1>
                <p className="text-gray-600">Member since {customer.memberSince}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Book Service
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FiSettings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiCalendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{customer.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiBookmark className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Favorite Barbers</p>
                <p className="text-2xl font-bold text-gray-900">{customer.favoriteBarbers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiStar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Rating Given</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiCalendar className="h-5 w-5 mr-2 text-primary-600" />
                  Upcoming Bookings
                </h2>
              </div>
              <div className="p-6">
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-gray-600">
                                {booking.barber.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{booking.barber.name}</h3>
                              <div className="flex items-center space-x-1">
                                <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{booking.barber.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <p className="text-lg font-bold text-primary-600 mt-1">{booking.price}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <FiCalendar className="h-4 w-4 mr-1" />
                            {booking.date} at {booking.time}
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{booking.service}</p>
                        <p className="text-sm text-gray-600 mb-4">{booking.address}</p>
                        
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiCalendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                    <p className="text-gray-600 mb-4">Book your next service to get started</p>
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiClock className="h-5 w-5 mr-2 text-primary-600" />
                  Recent Bookings
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.barber.name}</h3>
                        <p className="text-sm text-gray-600">{booking.service} • {booking.date}</p>
                        <p className="text-sm text-gray-600">{booking.location}</p>
                        {booking.rating && (
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < booking.rating 
                                    ? "text-yellow-400 fill-current" 
                                    : "text-gray-300"
                                }`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{booking.price}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.status === 'completed' && !booking.rating && (
                          <button className="block mt-2 text-sm text-primary-600 hover:text-primary-700">
                            Rate & Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Favorite Barbers */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiBookmark className="h-5 w-5 mr-2 text-primary-600" />
                  Favorite Barbers
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {favoriteBarbers.map((barber) => (
                  <div key={barber.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-gray-600">
                          {barber.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{barber.name}</h3>
                        <div className="flex items-center space-x-1">
                          <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{barber.rating} ({barber.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{barber.specialty}</p>
                    <p className="text-xs text-gray-500 mb-3">Last visit: {barber.lastVisit}</p>
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Book Again
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <FiCalendar className="h-4 w-4" />
                  <span>Book New Service</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <FiUser className="h-4 w-4" />
                  <span>Find Barbers</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <FiCreditCard className="h-4 w-4" />
                  <span>Payment Methods</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <FiEdit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}