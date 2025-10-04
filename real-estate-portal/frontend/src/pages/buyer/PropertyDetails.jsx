import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/buyer/Button";

// Dummy property data
const propertyData = {
  "1": {
    id: "1",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 8500,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: "Villa",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    ],
    description: "Experience luxury living at its finest in this stunning modern villa. Featuring an open-concept design, high ceilings, and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen is equipped with top-of-the-line appliances, perfect for entertaining. Step outside to your private oasis with a sparkling pool, landscaped gardens, and outdoor dining area.",
    features: ["Swimming Pool", "Smart Home System", "Garage", "Garden", "Security System", "Central AC"],
  },
  "2": {
    id: "2",
    title: "Cozy Downtown Apartment",
    location: "Manhattan, NY",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    description: "Live in the heart of Manhattan in this beautifully renovated apartment. Modern finishes throughout, with an open kitchen, hardwood floors, and plenty of natural light. Located within walking distance of parks, restaurants, and public transportation.",
    features: ["Doorman", "Elevator", "Hardwood Floors", "Washer/Dryer", "Pet Friendly", "Gym"],
  },
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData[id || "1"] || propertyData["1"];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/buyer/search")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Search</span>
      </button>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-96 rounded-xl overflow-hidden shadow-sage-lg"
        >
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className="h-[184px] rounded-xl overflow-hidden shadow-sage-md"
            >
              <img src={img} alt={`View ${idx + 2}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-4xl font-bold text-foreground">{property.title}</h1>
              <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold">
                {property.type}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-lg">
              <MapPin size={20} className="mr-2" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-8 p-6 bg-card rounded-xl shadow-sage-sm">
            <div className="flex items-center gap-2">
              <Bed size={24} className="text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={24} className="text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Square size={24} className="text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{property.area}</p>
                <p className="text-sm text-muted-foreground">Sq Ft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature) => (
                <div
                  key={feature}
                  className="px-4 py-3 bg-secondary rounded-lg text-secondary-foreground font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-xl shadow-sage-lg sticky top-8">
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Monthly Rent</p>
              <p className="text-4xl font-bold text-primary">${property.price.toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              <Button
                fullWidth
                variant="primary"
                onClick={() => navigate("/buyer/bookings")}
              >
                <Calendar className="mr-2" size={20} />
                Schedule Visit
              </Button>
              <Button
                fullWidth
                variant="outline"
                onClick={() => navigate("/buyer/inquiries")}
              >
                <MessageSquare className="mr-2" size={20} />
                Send Inquiry
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Contact Agent</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}