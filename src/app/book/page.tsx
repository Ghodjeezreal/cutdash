"use client";

import { useState } from "react";
import { FiMapPin, FiCalendar, FiClock, FiUser, FiScissors, FiStar } from "react-icons/fi";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    { id: "haircut", name: "Haircut", price: "₦3,000", duration: "30 min" },
    { id: "beard-trim", name: "Beard Trim", price: "₦2,000", duration: "20 min" },
    { id: "full-service", name: "Haircut + Beard", price: "₦4,500", duration: "45 min" },
    { id: "styling", name: "Hair Styling", price: "₦2,500", duration: "25 min" },
  ];

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const breadcrumbItems = [
    { label: "Book Service" }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 text-white p-6">
            <h1 className="text-3xl font-bold">Book Your Service</h1>
            <p className="text-primary-100 mt-2">Choose your service and preferred details</p>
          </div>

          {/* Booking Form */}
          <div className="p-6 space-y-8">
            {/* Service Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiScissors className="h-5 w-5 mr-2 text-primary-600" />
                Select Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">{service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiMapPin className="h-5 w-5 mr-2 text-primary-600" />
                Choose Location
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="home"
                    name="location"
                    value="home"
                    className="h-4 w-4 text-primary-600"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                  <label htmlFor="home" className="ml-3 text-gray-900">
                    At Home (₦500 travel fee)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="office"
                    name="location"
                    value="office"
                    className="h-4 w-4 text-primary-600"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                  <label htmlFor="office" className="ml-3 text-gray-900">
                    At Office (₦800 travel fee)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pickup"
                    name="location"
                    value="pickup"
                    className="h-4 w-4 text-primary-600"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                  <label htmlFor="pickup" className="ml-3 text-gray-900">
                    Pickup Point (No travel fee)
                  </label>
                </div>
              </div>
              {selectedLocation && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiCalendar className="h-5 w-5 mr-2 text-primary-600" />
                  Select Date
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiClock className="h-5 w-5 mr-2 text-primary-600" />
                  Select Time
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? "bg-primary-600 text-white border-primary-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Barbers */}
            {selectedService && selectedDate && selectedTime && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiUser className="h-5 w-5 mr-2 text-primary-600" />
                  Available Barbers
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((barber) => (
                    <div key={barber} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                          <FiUser className="h-8 w-8 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Barber {barber}</h3>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">4.9 (127 reviews)</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">5+ years experience</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">5 min away</p>
                          <button className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Summary & CTA */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{selectedService ? services.find(s => s.id === selectedService)?.name : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>{selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{selectedLocation || "Not selected"}</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₦4,500</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400"
                disabled={!selectedService || !selectedLocation || !selectedDate || !selectedTime}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}