"use client";

import { useState } from "react";
import { FiScissors, FiDollarSign, FiUsers, FiTrendingUp, FiMapPin, FiClock, FiStar, FiShield, FiUpload, FiCheck } from "react-icons/fi";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

export default function BecomeBarberPage() {
  const breadcrumbItems = [
    { label: "Become a Barber" }
  ];

  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    specialties: [] as string[],
    location: "",
    portfolio: null,
    certifications: null,
    availability: ""
  });

  const benefits = [
    {
      icon: FiDollarSign,
      title: "Earn More",
      description: "Increase your income with flexible scheduling and premium service rates",
      stat: "₦45,000+ avg monthly"
    },
    {
      icon: FiUsers,
      title: "More Customers",
      description: "Access a growing customer base without spending on marketing",
      stat: "500+ active customers"
    },
    {
      icon: FiClock,
      title: "Flexible Schedule",
      description: "Work when you want, where you want with complete schedule control",
      stat: "100% schedule flexibility"
    },
    {
      icon: FiTrendingUp,
      title: "Grow Your Business",
      description: "Build your reputation and expand your client base with our platform",
      stat: "4.8★ average rating"
    }
  ];

  const requirements = [
    "Minimum 2 years professional barbering experience",
    "Valid barbering license or certification",
    "Professional portfolio with recent work examples",
    "Clean background check (we'll help with this)",
    "Reliable transportation and mobile equipment",
    "Professional appearance and customer service skills"
  ];

  const specialtyOptions = [
    "Classic Haircuts",
    "Modern/Trendy Cuts",
    "Beard Trimming & Styling",
    "Hair Washing & Treatment",
    "Razor Shaves",
    "Hair Styling",
    "Eyebrow Trimming",
    "Mustache Grooming"
  ];

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleNextStep = () => {
    setFormStep(formStep + 1);
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Barber application:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-50 to-secondary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-secondary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiScissors className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Become a cutdash Barber
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join Nigeria's premier mobile barbering platform. Grow your business, 
              reach more customers, and earn more with flexible scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors"
              >
                Apply Now
              </button>
              <button className="border border-secondary-600 text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Join cutdash?
            </h2>
            <p className="text-xl text-gray-600">
              Take your barbering business to the next level with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-secondary-600 font-bold text-lg">{benefit.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What We're Looking For
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We maintain high standards to ensure the best experience for our customers.
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="bg-green-100 p-1 rounded-full mt-1">
                      <FiCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <FiShield className="h-24 w-24 text-secondary-700 mx-auto mb-4" />
                <p className="text-secondary-800 font-semibold text-lg">Quality Assured</p>
                <p className="text-secondary-700">Professional Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Form Header */}
            <div className="bg-secondary-600 text-white p-6">
              <h2 className="text-2xl font-bold">Barber Application</h2>
              <p className="text-secondary-100 mt-2">Step {formStep} of 3</p>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-secondary-700 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(formStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {formStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder="+234 808 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location (Primary Service Area)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder="e.g., Lagos Island, Victoria Island"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Information */}
                {formStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Professional Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      >
                        <option value="">Select experience level</option>
                        <option value="2-3">2-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialties (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {specialtyOptions.map((specialty) => (
                          <label key={specialty} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.specialties.includes(specialty)}
                              onChange={() => handleSpecialtyToggle(specialty)}
                              className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Working Hours
                      </label>
                      <textarea
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        rows={3}
                        placeholder="e.g., Monday-Friday 9AM-6PM, Weekend availability"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {formStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Documents & Portfolio</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio (Photos of your work)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Drag and drop your portfolio images, or click to browse</p>
                        <input type="file" multiple accept="image/*" className="hidden" />
                        <button
                          type="button"
                          className="mt-4 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors"
                        >
                          Choose Files
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certifications/Licenses
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Upload your barbering license and certifications</p>
                        <input type="file" multiple accept=".pdf,.jpg,.png" className="hidden" />
                        <button
                          type="button"
                          className="mt-4 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors"
                        >
                          Choose Files
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Next Steps:</strong> After submitting your application, we'll review your information 
                        and contact you within 2-3 business days. The verification process includes a background 
                        check and skills assessment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={formStep === 1}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {formStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How much can I earn as a cutdash barber?",
                a: "Earnings vary based on your schedule and service area, but our active barbers average ₦45,000+ per month. You keep 85% of each booking fee plus tips."
              },
              {
                q: "Do I need my own equipment?",
                a: "Yes, you'll need professional mobile barbering equipment including clippers, scissors, and sanitation supplies. We provide a recommended equipment list."
              },
              {
                q: "How does the background check work?",
                a: "We conduct a comprehensive background check including criminal history and identity verification. This typically takes 3-5 business days and is free for approved applicants."
              },
              {
                q: "What areas do you serve?",
                a: "We currently operate in Lagos with plans to expand to Abuja and Port Harcourt. Priority is given to barbers in high-demand areas."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}