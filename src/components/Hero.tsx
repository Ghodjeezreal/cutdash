"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMapPin, FiClock, FiStar, FiArrowRight, FiPlay, FiPause, FiImage, FiVideo } from "react-icons/fi";
import HeroMap from "./HeroMap";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {showVideo ? (
          <>
            {/* Video Background */}
            <video
              id="hero-video"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/haircutvideo.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300" />
            </video>
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </>
        ) : (
          <>
            {/* Image Background */}
            <img 
              src="/haircut.jpg" 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </>
        )}
      </div>

      {/* Media Controls */}
      <div className="absolute top-6 right-6 z-20 flex space-x-2">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-opacity-30 transition-all"
          title={showVideo ? "Switch to Image" : "Switch to Video"}
        >
          {showVideo ? <FiImage className="h-5 w-5" /> : <FiVideo className="h-5 w-5" />}
        </button>
        {showVideo && (
          <button
            onClick={toggleVideoPlayback}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-opacity-30 transition-all"
            title={isVideoPlaying ? "Pause Video" : "Play Video"}
          >
            {isVideoPlaying ? <FiPause className="h-5 w-5" /> : <FiPlay className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Professional Barbers
                <span className="text-yellow-300 block">Come to You</span>
              </h1>
              <p className="text-xl text-gray-100 max-w-lg drop-shadow-md">
                Book experienced mobile barbers for haircuts, beard trims, and grooming services at your home, office, or preferred location.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-lg">
                  <FiMapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your Location</p>
                  <p className="text-sm text-gray-200">Home, office, or pickup</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-lg">
                  <FiClock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Instant Booking</p>
                  <p className="text-sm text-gray-200">Available 7 days a week</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-lg">
                  <FiStar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Vetted Barbers</p>
                  <p className="text-sm text-gray-200">Experienced & insured</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Book Now</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/barbers"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center backdrop-blur-sm"
              >
                Browse Barbers
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6 border-t border-white border-opacity-30">
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-md">500+</p>
                <p className="text-sm text-gray-200">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-md">50+</p>
                <p className="text-sm text-gray-200">Professional Barbers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-md">4.9</p>
                <p className="text-sm text-gray-200">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Map */}
          <div className="relative">
            <div className="rounded-2xl h-96 lg:h-[500px] overflow-hidden shadow-2xl">
              <HeroMap />
            </div>
            
            {/* Floating testimonial card - smaller and repositioned - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-xl shadow-2xl max-w-xs transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start space-x-3 mb-3">
                <div className="relative">
                  <img
                    src="/api/placeholder/36/36"
                    alt="John D."
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50 shadow-lg"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900 text-sm">John D.</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="h-3 w-3 text-yellow-400 fill-current drop-shadow-sm" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">Verified Customer</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 border border-white/20">
                <p className="text-gray-900 text-xs leading-relaxed">
                  &quot;Best haircut I&apos;ve had in years. The barber came to my office and did an amazing job. So convenient!&quot;
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
                <span>2 days ago</span>
                <span className="flex items-center space-x-1">
                  <FiMapPin className="h-3 w-3" />
                  <span>Lagos</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}