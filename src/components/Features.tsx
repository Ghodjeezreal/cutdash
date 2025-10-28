import { FiScissors, FiMapPin, FiStar, FiShield, FiClock, FiDollarSign } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: FiScissors,
      title: "Professional Service",
      description: "Experienced barbers with verified portfolios and customer reviews"
    },
    {
      icon: FiMapPin,
      title: "Flexible Locations",
      description: "Home, office, or designated pickup points - your choice"
    },
    {
      icon: FiClock,
      title: "Instant Booking",
      description: "Real-time availability and immediate confirmation"
    },
    {
      icon: FiStar,
      title: "Quality Guaranteed",
      description: "Rated barbers with money-back satisfaction guarantee"
    },
    {
      icon: FiShield,
      title: "Safe & Insured",
      description: "Background-checked barbers with full insurance coverage"
    },
    {
      icon: FiDollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees - see total cost upfront including travel"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose cutdash?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve reimagined the barbering experience to be convenient, professional, and tailored to your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}