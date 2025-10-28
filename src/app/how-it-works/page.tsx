import { FiUser, FiSearch, FiCalendar, FiCheckCircle, FiMapPin, FiStar, FiShield } from "react-icons/fi";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

export default function HowItWorksPage() {
  const breadcrumbItems = [
    { label: "How It Works" }
  ];

  const customerSteps = [
    {
      icon: FiSearch,
      title: "Browse & Select",
      description: "Browse verified barber profiles, read reviews, and choose the perfect professional for your style preferences.",
      details: ["View barber portfolios", "Read customer reviews", "Check availability", "Compare prices"]
    },
    {
      icon: FiMapPin,
      title: "Choose Location",
      description: "Select your preferred location - home, office, or one of our convenient pickup points throughout the city.",
      details: ["Home service (+travel fee)", "Office visits", "Pickup points (no travel fee)", "Custom locations"]
    },
    {
      icon: FiCalendar,
      title: "Book Instantly",
      description: "Pick your preferred date and time slot. Get instant confirmation with real-time availability.",
      details: ["Real-time scheduling", "Instant confirmation", "Calendar integration", "Flexible rescheduling"]
    },
    {
      icon: FiCheckCircle,
      title: "Get Styled",
      description: "Your barber arrives with professional tools and equipment. Relax and enjoy your premium grooming experience.",
      details: ["Professional equipment", "High-quality products", "Safe and hygienic", "Payment on completion"]
    }
  ];

  const barberSteps = [
    {
      icon: FiUser,
      title: "Apply & Verify",
      description: "Submit your application with portfolio, certifications, and undergo our verification process.",
      details: ["Upload portfolio", "Provide certifications", "Background check", "Skills assessment"]
    },
    {
      icon: FiCalendar,
      title: "Set Schedule",
      description: "Control your availability, set your service areas, and manage your booking preferences.",
      details: ["Flexible scheduling", "Service area selection", "Price control", "Availability management"]
    },
    {
      icon: FiMapPin,
      title: "Accept Bookings",
      description: "Receive booking requests, accept jobs that work for you, and navigate to client locations.",
      details: ["Smart job matching", "GPS navigation", "Client communication", "Flexible acceptance"]
    },
    {
      icon: FiCheckCircle,
      title: "Earn & Grow",
      description: "Complete services, receive payments instantly, and build your reputation through customer reviews.",
      details: ["Instant payouts", "Performance tracking", "Customer reviews", "Business growth tools"]
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: "Safety First",
      description: "All barbers are background-checked and insured for your peace of mind."
    },
    {
      icon: FiStar,
      title: "Quality Guaranteed",
      description: "Only verified professionals with proven track records and customer satisfaction."
    },
    {
      icon: FiMapPin,
      title: "Convenient Locations",
      description: "Service at your preferred location - home, office, or pickup points."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How cutdash Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional barbering services made simple. Whether you're a customer looking for convenience 
            or a barber wanting to grow your business, we've got you covered.
          </p>
        </div>
      </section>

      {/* For Customers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              For Customers
            </h2>
            <p className="text-xl text-gray-600">
              Get professional grooming services in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary-100 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {/* Details */}
                  <ul className="space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector Line */}
                {index < customerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-16 w-full h-0.5 bg-primary-200 transform translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Barbers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              For Barbers
            </h2>
            <p className="text-xl text-gray-600">
              Grow your business and reach more customers with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {barberSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="text-6xl font-bold text-secondary-100 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="bg-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {/* Details */}
                  <ul className="space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector Line */}
                {index < barberSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-16 w-full h-0.5 bg-secondary-200 transform translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose cutdash?
            </h2>
            <p className="text-xl text-gray-600">
              We prioritize safety, quality, and convenience in every interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and professional barbers on our platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book a Service
            </a>
            <a
              href="/become-barber"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Become a Barber
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}