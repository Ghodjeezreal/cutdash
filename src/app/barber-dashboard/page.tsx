"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiScissors, FiDollarSign, FiClock, FiTrendingUp, FiCalendar, FiMapPin, FiStar, FiUser, FiBell, FiMessageCircle, FiBarChart, FiCamera, FiSettings, FiNavigation, FiCheck, FiX, FiEye, FiEdit, FiLogOut } from "react-icons/fi";

export default function BarberDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAvailable, setIsAvailable] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New booking request from Sarah Johnson", time: "2 min ago", type: "booking" },
    { id: 2, message: "Payment received for completed service", time: "15 min ago", type: "payment" },
    { id: 3, message: "Customer review: 5 stars", time: "1 hour ago", type: "review" }
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("overview"); // overview, calendar, analytics, customers
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [availableHours, setAvailableHours] = useState({
    monday: { start: "09:00", end: "18:00", enabled: true },
    tuesday: { start: "09:00", end: "18:00", enabled: true },
    wednesday: { start: "09:00", end: "18:00", enabled: true },
    thursday: { start: "09:00", end: "18:00", enabled: true },
    friday: { start: "09:00", end: "18:00", enabled: true },
    saturday: { start: "10:00", end: "16:00", enabled: true },
    sunday: { start: "10:00", end: "16:00", enabled: false }
  });

  const stats = {
    totalEarnings: "₦45,600",
    completedJobs: 23,
    rating: 4.8,
    responseTime: "5 min"
  };

  const upcomingBookings = [
    {
      id: 1,
      customer: "John Doe",
      service: "Haircut + Beard Trim",
      time: "2:00 PM",
      date: "Today",
      location: "Victoria Island",
      price: "₦4,500"
    },
    {
      id: 2,
      customer: "Michael Smith",
      service: "Haircut",
      time: "4:30 PM",
      date: "Today",
      location: "Ikoyi",
      price: "₦3,000"
    },
    {
      id: 3,
      customer: "David Johnson",
      service: "Full Service",
      time: "10:00 AM",
      date: "Tomorrow",
      location: "Lekki",
      price: "₦5,000"
    }
  ];

  const recentJobs = [
    {
      id: 1,
      customer: "Ahmed Hassan",
      service: "Haircut",
      date: "Yesterday",
      rating: 5,
      price: "₦3,000",
      status: "completed"
    },
    {
      id: 2,
      customer: "Samuel Adebayo",
      service: "Beard Trim",
      date: "2 days ago",
      rating: 4,
      price: "₦2,000",
      status: "completed"
    }
  ];

  const customers = [
    {
      id: 1,
      name: "John Doe",
      totalBookings: 12,
      lastService: "3 days ago",
      preferredService: "Haircut + Beard",
      rating: 5,
      notes: "Prefers morning appointments, likes minimal beard styling"
    },
    {
      id: 2,
      name: "Michael Smith",
      totalBookings: 8,
      lastService: "1 week ago",
      preferredService: "Haircut",
      rating: 4.8,
      notes: "Regular customer, very punctual"
    },
    {
      id: 3,
      name: "David Johnson",
      totalBookings: 5,
      lastService: "2 weeks ago",
      preferredService: "Full Service",
      rating: 4.9,
      notes: "New customer, appreciates detailed consultation"
    }
  ];

  const monthlyEarnings = {
    January: 45600,
    February: 52300,
    March: 48900,
    April: 55200,
    May: 49800,
    June: 53400
  };

  const servicePopularity = [
    { name: "Haircut", bookings: 145, revenue: 435000 },
    { name: "Beard Trim", bookings: 89, revenue: 178000 },
    { name: "Haircut + Beard", bookings: 67, revenue: 301500 },
    { name: "Full Service", bookings: 23, revenue: 115000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <FiScissors className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Barber Dashboard</h1>
                <p className="text-gray-600">Welcome back, David!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <FiBell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">Available Status</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                    {isAvailable ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isAvailable 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAvailable ? 'Set Unavailable' : 'Set Available'}
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={async () => {
                  if (confirm('Are you sure you want to logout?')) {
                    try {
                      // Clear any stored authentication data
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('userType');
                        localStorage.removeItem('barberId');
                        localStorage.removeItem('authToken');
                        sessionStorage.clear();
                        
                        // Clear cookies if any
                        document.cookie.split(";").forEach(function(c) { 
                          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                        });
                      }
                      
                      // Force complete redirect (replaces current history entry)
                      window.location.replace('/login');
                    } catch (error) {
                      console.error('Logout error:', error);
                      // Fallback redirect
                      window.location.replace('/');
                    }
                  }
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <FiLogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: FiTrendingUp },
                { id: 'calendar', name: 'Calendar', icon: FiCalendar },
                { id: 'analytics', name: 'Analytics', icon: FiBarChart },
                { id: 'customers', name: 'Customers', icon: FiUser }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    viewMode === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Content based on view mode */}
        {viewMode === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiScissors className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiStar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiClock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
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
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.customer}</h3>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                        </div>
                        <span className="text-lg font-bold text-primary-600">{booking.price}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FiClock className="h-4 w-4 mr-1" />
                          {booking.date} at {booking.time}
                        </span>
                        <span className="flex items-center">
                          <FiMapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          Accept
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                          Decline
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiTrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                  Recent Jobs
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.customer}</h3>
                        <p className="text-sm text-gray-600">{job.service} • {job.date}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < job.rating 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{job.price}</p>
                        <p className="text-sm text-green-600 capitalize">{job.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  onClick={() => setShowAvailabilityModal(true)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Set Availability
                </button>
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Update Profile
                </button>
                <button 
                  onClick={() => setShowEarningsModal(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Earnings
                </button>
                <button 
                  onClick={() => setShowReviewsModal(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Customer Reviews
                </button>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">This Week</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jobs Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-semibold text-green-600">₦18,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-semibold">4.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Worked</span>
                  <span className="font-semibold">24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FiCalendar className="h-5 w-5 mr-2 text-primary-600" />
                Schedule Calendar
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="border border-gray-200 h-24 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm text-gray-600">{((i % 30) + 1)}</div>
                    {(i + 3) % 7 === 0 && (
                      <div className="text-xs bg-primary-100 text-primary-800 p-1 rounded mt-1">
                        2:00 PM - John D.
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex space-x-4">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg">
                  Set Available Hours
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Block Time Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <div className="space-y-6">
            {/* Monthly Earnings Chart */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiBarChart className="h-5 w-5 mr-2 text-primary-600" />
                  Monthly Earnings
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-6 gap-4 h-64">
                  {Object.entries(monthlyEarnings).map(([month, amount]) => (
                    <div key={month} className="flex flex-col items-center justify-end">
                      <div 
                        className="bg-primary-600 w-8 rounded-t"
                        style={{ height: `${(amount / 60000) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{month.slice(0, 3)}</span>
                      <span className="text-xs font-semibold">₦{(amount / 1000).toFixed(0)}k</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Performance */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Service Performance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {servicePopularity.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₦{service.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers View */}
        {viewMode === 'customers' && (
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FiUser className="h-5 w-5 mr-2 text-primary-600" />
                Customer Management
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <FiUser className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.totalBookings} total bookings</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(customer.rating) 
                                    ? "text-yellow-400 fill-current" 
                                    : "text-gray-300"
                                }`} 
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{customer.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-primary-600">
                          <FiMessageCircle className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-primary-600">
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-primary-600">
                          <FiEdit className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Last Service:</span>
                        <span className="ml-2 font-medium">{customer.lastService}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Preferred:</span>
                        <span className="ml-2 font-medium">{customer.preferredService}</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Notes:</strong> {customer.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg">
                  Add Customer Note
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Export Customer Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Set Your Availability</h3>
              <button 
                onClick={() => setShowAvailabilityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(availableHours).map(([day, times]) => (
                <div key={day} className="border-b pb-3">
                  <h4 className="font-medium text-gray-700 mb-2 capitalize">{day}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm text-gray-600">Start Time</label>
                      <input 
                        type="time" 
                        value={times.start}
                        onChange={(e) => setAvailableHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof prev], start: e.target.value }
                        }))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">End Time</label>
                      <input 
                        type="time" 
                        value={times.end}
                        onChange={(e) => setAvailableHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof prev], end: e.target.value }
                        }))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>
                  <label className="flex items-center mt-2">
                    <input 
                      type="checkbox" 
                      checked={times.enabled}
                      onChange={(e) => setAvailableHours(prev => ({
                        ...prev,
                        [day]: { ...prev[day as keyof typeof prev], enabled: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Available this day</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAvailabilityModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Here you would typically save to backend
                  setShowAvailabilityModal(false);
                  alert('Availability updated successfully!');
                }}
                className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  defaultValue="Marcus Johnson"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  rows={3}
                  defaultValue="Professional barber with 8+ years experience. Specializing in modern cuts and classic styles."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
                <div className="space-y-2">
                  {['Haircut', 'Beard Trim', 'Hot Shave', 'Hair Wash'].map(service => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowProfileModal(false);
                  alert('Profile updated successfully!');
                }}
                className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Earnings Modal */}
      {showEarningsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Earnings Details</h3>
              <button 
                onClick={() => setShowEarningsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$2,847</div>
                  <div className="text-sm text-green-700">This Month</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$8,241</div>
                  <div className="text-sm text-blue-700">This Quarter</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Recent Transactions</h4>
                <div className="space-y-2">
                  {[
                    { date: '2024-01-15', customer: 'John Smith', amount: '$45', service: 'Haircut + Beard' },
                    { date: '2024-01-14', customer: 'Mike Johnson', amount: '$35', service: 'Haircut' },
                    { date: '2024-01-14', customer: 'David Wilson', amount: '$55', service: 'Full Service' },
                    { date: '2024-01-13', customer: 'Alex Brown', amount: '$40', service: 'Haircut + Wash' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <div className="font-medium">{transaction.customer}</div>
                        <div className="text-sm text-gray-600">{transaction.service}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{transaction.amount}</div>
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Payout Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Available Balance:</span>
                    <span className="font-semibold">$347.50</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Next Payout:</span>
                    <span className="text-sm">Friday, Jan 19</span>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
                    Request Instant Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <button 
                onClick={() => setShowReviewsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">4.9</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-sm text-gray-600">Based on 127 reviews</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm w-3">{stars}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: stars === 5 ? '85%' : stars === 4 ? '12%' : '3%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {stars === 5 ? '108' : stars === 4 ? '15' : '4'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Recent Reviews</h4>
              <div className="space-y-4">
                {[
                  { name: 'John Smith', rating: 5, date: '2024-01-15', comment: 'Excellent service! Marcus was professional and gave me exactly the cut I wanted.' },
                  { name: 'Mike Johnson', rating: 5, date: '2024-01-14', comment: 'Great experience, very convenient and high quality work.' },
                  { name: 'David Wilson', rating: 4, date: '2024-01-13', comment: 'Good haircut, arrived on time. Would book again.' },
                  { name: 'Alex Brown', rating: 5, date: '2024-01-12', comment: 'Amazing attention to detail. Best barber experience I\'ve had!' }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}