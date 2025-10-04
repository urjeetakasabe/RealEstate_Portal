import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";

export const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(`/buyer/property/${property.id}`)}
      className="bg-card rounded-xl overflow-hidden shadow-sage-md cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-sage-sm">
          {property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-muted-foreground mb-3 text-sm">
          <MapPin size={16} className="mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-2xl font-bold text-primary">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
      </div>
    </motion.div>
  );
};