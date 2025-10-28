import { FiUser, FiSearch, FiCalendar, FiCheckCircle } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: FiSearch,
      title: "Find Your Barber",
      description: "Browse profiles, read reviews, and choose the perfect barber for your style",
      stepNumber: "01"
    },
    {
      icon: FiCalendar,
      title: "Book Instantly",
      description: "Select your preferred time and location - home, office, or pickup point",
      stepNumber: "02"
    },
    {
      icon: FiUser,
      title: "Get Styled",
      description: "Your barber arrives with professional tools and gives you the perfect cut",
      stepNumber: "03"
    },
    {
      icon: FiCheckCircle,
      title: "Rate & Review",
      description: "Share your experience and help other customers find great barbers",
      stepNumber: "04"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting a professional haircut has never been easier. Book, relax, and enjoy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="text-6xl font-bold text-primary-100 mb-4">
                {step.stepNumber}
              </div>
              
              {/* Icon */}
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-16 w-full h-0.5 bg-primary-200 transform translate-x-8"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who have made the switch to convenient mobile barbering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Book Your First Cut
              </a>
              <a
                href="/become-barber"
                className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Become a Barber
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}