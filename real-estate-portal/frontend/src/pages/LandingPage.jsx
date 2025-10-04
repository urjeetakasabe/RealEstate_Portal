import React, { useState } from 'react';

// Mock property data
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    city: "Mumbai",
    price: 45000000,
    bedrooms: 3,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    description: "Spacious apartment with city views and modern amenities"
  },
  {
    id: 2,
    title: "Luxury Villa with Garden",
    city: "Bangalore",
    price: 85000000,
    bedrooms: 4,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Beautiful villa with private garden and swimming pool"
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    city: "Pune",
    price: 25000000,
    bedrooms: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    description: "Perfect starter home in a prime location"
  },
  {
    id: 4,
    title: "Penthouse Suite",
    city: "Delhi",
    price: 120000000,
    bedrooms: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    description: "Luxurious penthouse with panoramic views"
  }
];

// Toast notification component
const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 sm:max-w-sm bg-green-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg z-50 animate-bounce text-sm sm:text-base">
      {message}
    </div>
  );
};

// Property card component
const PropertyCard = ({ property, onView }) => (
  <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <img 
      src={property.image} 
      alt={property.title}
      className="w-full h-40 sm:h-48 object-cover"
    />
    <div className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
        <span className="mr-1 sm:mr-2">📍</span>{property.city}
      </p>
      <p className="text-xl sm:text-2xl font-bold text-green-700 mb-2 sm:mb-3">
        ₹{(property.price / 10000000).toFixed(2)} Cr
      </p>
      <p className="text-gray-600 text-xs sm:text-sm mb-2 flex items-center">
        <span className="mr-1 sm:mr-2">🛏️</span>{property.bedrooms} BHK
      </p>
      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{property.description}</p>
      <button
        onClick={() => onView(property.id)}
        className="w-full bg-green-700 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-green-800 transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  </article>
);

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Step card component
const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mx-auto shadow-lg">
      {number}
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600">{description}</p>
  </div>
);

// Main landing page component
const LandingPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(MOCK_PROPERTIES);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    let filtered = MOCK_PROPERTIES;

    if (searchLocation) {
      filtered = filtered.filter(prop => 
        prop.city.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(minPrice) * 10000000);
    }

    if (maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(maxPrice) * 10000000);
    }

    setFilteredProperties(filtered);
    setToast(`Found ${filtered.length} properties matching your criteria`);
  };

  const handleViewProperty = (propertyId) => {
    console.log('Viewing property:', propertyId);
    setToast(`Opening details for property #${propertyId}`);
  };

  const handleListProperty = () => {
    console.log('Redirecting to signup with role=owner');
    setToast('Redirecting to owner signup...');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <a href="/" className="text-lg sm:text-2xl font-bold text-green-900 flex items-center">
                <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🏡</span>
                <span className="hidden xs:inline">EstatePortal</span>
                <span className="xs:hidden">Estate</span>
              </a>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#home" className="text-sm xl:text-base text-green-900 hover:text-green-600 transition-colors font-medium">
                Home
              </a>
              <a href="#browse" className="text-sm xl:text-base text-green-900 hover:text-green-600 transition-colors font-medium">
                Browse
              </a>
              <a href="#owners" className="text-sm xl:text-base text-green-900 hover:text-green-600 transition-colors font-medium">
                For Owners
              </a>
              <a href="#brokers" className="text-sm xl:text-base text-green-900 hover:text-green-600 transition-colors font-medium">
                For Brokers
              </a>
              <a href="#contact" className="text-sm xl:text-base text-green-900 hover:text-green-600 transition-colors font-medium">
                Contact
              </a>
            </div>

            <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
              <a 
                href="/login" 
                className="text-sm sm:text-base text-green-900 hover:text-green-600 transition-colors font-medium px-2 sm:px-0"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="bg-green-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-green-800 transition-colors"
              >
                Sign Up
              </a>
            </div>

            <button 
              className="lg:hidden text-green-900 text-2xl sm:text-3xl p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              <a href="#home" className="block py-2 text-green-900 hover:text-green-600 font-medium">Home</a>
              <a href="#browse" className="block py-2 text-green-900 hover:text-green-600 font-medium">Browse</a>
              <a href="#owners" className="block py-2 text-green-900 hover:text-green-600 font-medium">For Owners</a>
              <a href="#brokers" className="block py-2 text-green-900 hover:text-green-600 font-medium">For Brokers</a>
              <a href="#contact" className="block py-2 text-green-900 hover:text-green-600 font-medium">Contact</a>
              <div className="pt-4 space-y-2 sm:hidden">
                <a href="/login" className="block py-2 text-green-900 hover:text-green-600 font-medium">Login</a>
                <a href="/signup" className="block py-2 bg-green-700 text-white text-center rounded-lg hover:bg-green-800">Sign Up</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-24" id="home">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-4 sm:mb-6 leading-tight">
                  Find Your Dream Property
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Connect directly with verified owners and brokers. Secure bookings and transparent payments, all in one platform.
                </p>

                {/* Search Form */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-green-900 mb-1 sm:mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Enter city..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-green-900 mb-1 sm:mb-2">
                        Property Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="studio">Studio</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-green-900 mb-1 sm:mb-2">
                        Min Price (Cr)
                      </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="2.5"
                        step="0.1"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-green-900 mb-1 sm:mb-2">
                        Max Price (Cr)
                      </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="10"
                        step="0.1"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    🔍 Search Properties
                  </button>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop"
                  alt="Featured property showcase"
                  className="rounded-xl sm:rounded-2xl shadow-xl w-full h-48 sm:h-64 md:h-80 lg:h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 text-center mb-8 sm:mb-12">
              Why Choose EstatePortal
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                icon="🔍"
                title="Quick Search"
                description="Find your ideal property with advanced filters for location, price, type, and amenities. Save time with smart search results."
              />
              <FeatureCard
                icon="✅"
                title="Verified Owners & Brokers"
                description="Every property owner and broker is verified through our rigorous KYC process, ensuring trust and transparency."
              />
              <FeatureCard
                icon="🔒"
                title="Secure Payments"
                description="Book properties with confidence using our integrated payment gateway. All transactions are secure and trackable."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8 sm:py-12 md:py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 text-center mb-8 sm:mb-12">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              <StepCard
                number={1}
                title="Register"
                description="Create your account as a buyer, owner, or broker. Complete your profile with verified documents."
              />
              <StepCard
                number={2}
                title="List or Find"
                description="Owners list properties with details and photos. Buyers browse verified listings with transparent pricing."
              />
              <StepCard
                number={3}
                title="Book & Pay"
                description="Schedule viewings, make secure bookings, and complete payments through our integrated platform."
              />
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-8 sm:py-12 md:py-16 bg-white" id="browse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12 gap-4 sm:gap-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
                Featured Properties
              </h2>
              <a 
                href="/browse" 
                className="text-sm sm:text-base text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                View All →
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProperties.slice(0, 3).map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onView={handleViewProperty}
                />
              ))}
            </div>
            {filteredProperties.length === 0 && (
              <p className="text-center text-gray-600 py-8 sm:py-12 text-sm sm:text-base md:text-lg">
                No properties match your search criteria. Try adjusting your filters.
              </p>
            )}
          </div>
        </section>

        {/* Owner/Broker Callout */}
        <section className="py-8 sm:py-12 md:py-16 bg-green-600" id="owners">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Are You a Property Owner or Broker?
            </h2>
            <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              List your properties on EstatePortal and connect with thousands of verified buyers. Manage bookings and payments seamlessly.
            </p>
            <button
              onClick={handleListProperty}
              className="bg-white text-green-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-50 transition-colors duration-200 shadow-lg"
            >
              📋 List Your Property
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 sm:py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">About</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/about" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Careers</a></li>
                <li><a href="/press" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Resources</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/blog" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Blog</a></li>
                <li><a href="/guides" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Buying Guides</a></li>
                <li><a href="/faq" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Legal</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/terms" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Privacy Policy</a></li>
                <li><a href="/cookies" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="mailto:support@estateportal.com" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors break-words">support@estateportal.com</a></li>
                <li><a href="tel:+911234567890" className="text-xs sm:text-sm md:text-base hover:text-green-300 transition-colors">+91 123 456 7890</a></li>
                <li className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                  <a href="#" className="hover:text-green-300 transition-colors text-xl sm:text-2xl">📘</a>
                  <a href="#" className="hover:text-green-300 transition-colors text-xl sm:text-2xl">🐦</a>
                  <a href="#" className="hover:text-green-300 transition-colors text-xl sm:text-2xl">📷</a>
                  <a href="#" className="hover:text-green-300 transition-colors text-xl sm:text-2xl">💼</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
            <p>&copy; 2025 EstatePortal. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default LandingPage;