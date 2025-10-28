import { FiMail, FiPhone, FiMapPin, FiScissors } from "react-icons/fi";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiScissors className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">cutdash</span>
            </div>
            <p className="text-gray-300">
              Professional mobile barbers bringing quality grooming services directly to your location.
            </p>
            <div className="flex space-x-4">
              <FiFacebook className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <FiInstagram className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <FiTwitter className="h-5 w-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services/haircuts" className="hover:text-primary-400 transition-colors">Haircuts</a></li>
              <li><a href="/services/beard-trim" className="hover:text-primary-400 transition-colors">Beard Trim</a></li>
              <li><a href="/services/styling" className="hover:text-primary-400 transition-colors">Hair Styling</a></li>
              <li><a href="/services/grooming" className="hover:text-primary-400 transition-colors">Full Grooming</a></li>
              <li><a href="/services/corporate" className="hover:text-primary-400 transition-colors">Corporate Services</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>
              <li><a href="/become-barber" className="hover:text-primary-400 transition-colors">Become a Barber</a></li>
              <li><a href="/careers" className="hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-primary-400 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <FiPhone className="h-4 w-4 text-primary-400" />
                <span>+234 (0) 808 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="h-4 w-4 text-primary-400" />
                <span>hello@cutdash.ng</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="h-4 w-4 text-primary-400" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 cutdash. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/support" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}