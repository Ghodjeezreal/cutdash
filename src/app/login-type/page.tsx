"use client";

import { useState } from "react";
import Link from "next/link";
import { FiUser, FiScissors, FiArrowRight, FiShield } from "react-icons/fi";
import Header from "@/components/Header";

export default function LoginTypePage() {
  const [selectedType, setSelectedType] = useState<'customer' | 'barber' | null>(null);

  const loginOptions = [
    {
      type: 'customer' as const,
      title: 'Customer Login',
      description: 'Book professional barbering services at your preferred location',
      icon: FiUser,
      features: [
        'Browse verified barbers',
        'Book instant appointments',
        'Choose your location',
        'Read reviews & ratings'
      ],
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-200',
      selectedColor: 'border-blue-500 bg-blue-50'
    },
    {
      type: 'barber' as const,
      title: 'Barber Login',
      description: 'Manage your mobile barbering business and grow your clientele',
      icon: FiScissors,
      features: [
        'Manage your appointments',
        'Set your availability',
        'Track your earnings',
        'Build your reputation'
      ],
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      borderColor: 'border-green-200',
      selectedColor: 'border-green-500 bg-green-50'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      // Redirect to appropriate login page with user type
      window.location.href = `/login?type=${selectedType}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome to cutdash
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please select how you'd like to log in
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              
              {/* Login Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loginOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedType === option.type;
                  
                  return (
                    <div
                      key={option.type}
                      onClick={() => setSelectedType(option.type)}
                      className={`
                        relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200
                        ${isSelected 
                          ? option.selectedColor 
                          : `${option.borderColor} hover:border-gray-300 bg-white`
                        }
                      `}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`
                          ${option.color} w-16 h-16 rounded-full flex items-center justify-center mb-4
                          ${isSelected ? 'ring-4 ring-offset-2 ring-blue-200' : ''}
                        `}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {option.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4">
                          {option.description}
                        </p>
                        
                        <ul className="text-xs text-gray-500 space-y-1">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <button
                  onClick={handleContinue}
                  disabled={!selectedType}
                  className={`
                    w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors
                    ${selectedType 
                      ? 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' 
                      : 'bg-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  Continue to Login
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}