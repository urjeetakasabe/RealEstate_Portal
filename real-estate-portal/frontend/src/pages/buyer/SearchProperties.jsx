import { motion } from "framer-motion";
import { useState } from "react";
import { PropertyCard } from "@/components/buyer/PropertyCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/buyer/Button";

// Dummy data
const dummyProperties = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 8500,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    type: "Villa",
  },
  {
    id: "2",
    title: "Cozy Downtown Apartment",
    location: "Manhattan, NY",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    type: "Apartment",
  },
  {
    id: "3",
    title: "Suburban Family House",
    location: "Austin, TX",
    price: 4200,
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    type: "House",
  },
  {
    id: "4",
    title: "Beachfront Condo",
    location: "Miami, FL",
    price: 5800,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    type: "Condo",
  },
  {
    id: "5",
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: 7200,
    bedrooms: 5,
    bathrooms: 4,
    area: 4000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    type: "Villa",
  },
  {
    id: "6",
    title: "Urban Loft Studio",
    location: "Portland, OR",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    type: "Studio",
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SearchProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState("all");

  const filteredProperties = dummyProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceRange === "all" ||
      (priceRange === "low" && property.price < 3000) ||
      (priceRange === "mid" && property.price >= 3000 && property.price < 6000) ||
      (priceRange === "high" && property.price >= 6000);
    
    const matchesType = propertyType === "all" || property.type.toLowerCase() === propertyType.toLowerCase();

    return matchesSearch && matchesPrice && matchesType;
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Search Properties</h1>
        <p className="text-muted-foreground text-lg">Find your perfect home from our curated collection</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-card p-6 rounded-xl shadow-sage-md mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by location or property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-muted-foreground" />
            <span className="font-semibold text-foreground">Filters:</span>
          </div>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="all">All Prices</option>
            <option value="low">Under $3,000</option>
            <option value="mid">$3,000 - $6,000</option>
            <option value="high">Above $6,000</option>
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
            <option value="studio">Studio</option>
          </select>

          <Button
            onClick={() => {
              setSearchTerm("");
              setPriceRange("all");
              setPropertyType("all");
            }}
            variant="outline"
            className="ml-auto"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No properties found matching your criteria</p>
          <Button onClick={() => {
            setSearchTerm("");
            setPriceRange("all");
            setPropertyType("all");
          }} variant="primary" className="mt-4">
            Clear All Filters
          </Button>
        </div>
      )}
    </motion.div>
  );
}