"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FiUsers, FiDollarSign, FiTrendingUp, FiActivity, FiBarChart, FiCalendar, FiMapPin, FiStar, FiLogOut } from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else if (user?.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Show loading while checking authentication
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const stats = {
    totalUsers: 1247,
    totalBarbers: 89,
    totalBookings: 3456,
    totalRevenue: "₦1,234,500",
    monthlyGrowth: "+23%",
    activeBookings: 45
  };

  const recentBookings = [
    {
      id: 1,
      customer: "John Doe",
      barber: "Ahmed Hassan",
      service: "Haircut",
      amount: "₦3,000",
      status: "completed",
      date: "2024-01-20"
    },
    {
      id: 2,
      customer: "Mike Johnson",
      barber: "David Okonkwo",
      service: "Beard Trim",
      amount: "₦2,000",
      status: "in-progress",
      date: "2024-01-20"
    },
    {
      id: 3,
      customer: "Sarah Williams",
      barber: "Samuel Adebayo",
      service: "Full Service",
      amount: "₦5,000",
      status: "confirmed",
      date: "2024-01-21"
    }
  ];

  const topBarbers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      rating: 4.9,
      totalJobs: 127,
      earnings: "₦45,600",
      status: "active"
    },
    {
      id: 2,
      name: "David Okonkwo",
      rating: 4.8,
      totalJobs: 89,
      earnings: "₦32,400",
      status: "active"
    },
    {
      id: 3,
      name: "Samuel Adebayo",
      rating: 4.9,
      totalJobs: 156,
      earnings: "₦58,900",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">cutdash Platform Management - Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Export Data
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors border border-gray-300 px-4 py-2 rounded-lg hover:border-red-300"
              >
                <FiLogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiBarChart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyGrowth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiActivity className="h-5 w-5 mr-2 text-primary-600" />
                  Recent Bookings
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barber
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.barber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                          {booking.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiBarChart className="h-5 w-5 mr-2 text-primary-600" />
                  Revenue Analytics
                </h2>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FiBarChart className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                    <p className="text-primary-600 font-medium">Revenue Chart</p>
                    <p className="text-primary-500 text-sm">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Top Barbers */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiStar className="h-5 w-5 mr-2 text-primary-600" />
                  Top Barbers
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {topBarbers.map((barber, index) => (
                  <div key={barber.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{barber.name}</p>
                        <div className="flex items-center space-x-1">
                          <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{barber.rating} ({barber.totalJobs} jobs)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{barber.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Stats</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Barbers</span>
                  <span className="font-semibold text-green-600">{stats.totalBarbers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Bookings</span>
                  <span className="font-semibold text-blue-600">{stats.activeBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission Rate</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-semibold">₦200</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Add New Barber
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Manage Users
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  View Reports
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Platform Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}