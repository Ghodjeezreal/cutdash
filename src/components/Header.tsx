"use client";

import Link from "next/link";
import { FiMenu, FiX, FiUser, FiScissors, FiSettings, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { NotificationCenter } from "./Notifications";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'barber':
        return '/barber-dashboard';
      case 'admin':
        return '/admin';
      default:
        return '/customer-dashboard';
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const getDesktopLinkClassName = (path: string) => {
    return isActivePage(path) 
      ? "text-primary-600 font-medium border-b-2 border-primary-600 pb-1 transition-colors" 
      : "text-gray-700 hover:text-primary-600 transition-colors";
  };

  const getMobileLinkClassName = (path: string) => {
    return isActivePage(path) 
      ? "text-primary-600 font-medium transition-colors" 
      : "text-gray-700 hover:text-primary-600 transition-colors";
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FiScissors className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">cutdash</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/book" className={getDesktopLinkClassName('/book')}>
              Book Now
            </Link>
            <Link href="/barbers" className={getDesktopLinkClassName('/barbers')}>
              Find Barbers
            </Link>
            <Link href="/how-it-works" className={getDesktopLinkClassName('/how-it-works')}>
              How It Works
            </Link>
            <Link href="/become-barber" className={getDesktopLinkClassName('/become-barber')}>
              Become a Barber
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationCenter />

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src="/api/placeholder/32/32"
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="w-8 h-8 rounded-full object-cover bg-gray-200"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsUserMenuOpen(false)}
                      />

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20">
                        <div className="p-4 border-b border-gray-200">
                          <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        
                        <div className="p-2">
                          <Link
                            href={getDashboardLink()}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FiUser className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          
                          <Link
                            href="/settings"
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FiSettings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                          
                          <button 
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={handleLogout}
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Auth Buttons for non-authenticated users */}
                <Link
                  href="/login-type"
                  className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
                >
                  <FiUser className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-gray-700" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/book"
                className={getMobileLinkClassName('/book')}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <Link
                href="/barbers"
                className={getMobileLinkClassName('/barbers')}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Barbers
              </Link>
              <Link
                href="/how-it-works"
                className={getMobileLinkClassName('/how-it-works')}
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/become-barber"
                className={getMobileLinkClassName('/become-barber')}
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Barber
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      className="text-gray-700 hover:text-primary-600 transition-colors text-left"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login-type"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}