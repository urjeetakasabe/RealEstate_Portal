import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/buyer/Button";
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const mockBookings = [
  {
    id: "BK001",
    property: {
      title: "Modern Downtown Apartment",
      location: "123 Main St, San Francisco, CA",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      type: "Apartment"
    },
    date: "2025-10-15",
    time: "10:00 AM",
    visitors: 2,
    status: "confirmed",
    bookingFee: 50,
    notes: "Interested in the balcony view"
  },
  {
    id: "BK002",
    property: {
      title: "Luxury Villa with Pool",
      location: "456 Oak Ave, Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
      type: "Villa"
    },
    date: "2025-10-20",
    time: "02:00 PM",
    visitors: 3,
    status: "pending",
    bookingFee: 50
  },
  {
    id: "BK003",
    property: {
      title: "Cozy Studio Near Beach",
      location: "789 Beach Rd, Santa Monica, CA",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      type: "Studio"
    },
    date: "2025-09-28",
    time: "11:00 AM",
    visitors: 1,
    status: "cancelled",
    bookingFee: 50,
    notes: "Schedule conflict"
  },
  {
    id: "BK004",
    property: {
      title: "Spacious Family Home",
      location: "321 Pine St, San Diego, CA",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
      type: "House"
    },
    date: "2025-10-08",
    time: "03:00 PM",
    visitors: 4,
    status: "confirmed",
    bookingFee: 50
  }
];

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    text: "Confirmed",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  pending: {
    icon: AlertCircle,
    text: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  cancelled: {
    icon: XCircle,
    text: "Cancelled",
    color: "text-red-600",
    bg: "bg-red-50",
  }
};

export default function MyBookings() {
  const [bookings] = useState(mockBookings);
  const [filter, setFilter] = useState("all");

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const handleCancelBooking = (id) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled. Refund will be processed in 3-5 business days.",
    });
  };

  const handleReschedule = (id) => {
    toast({
      title: "Reschedule Request",
      description: "Please contact support to reschedule your booking.",
    });
  };

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
        <h1 className="text-4xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground text-lg">View and manage your property viewing appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-5 rounded-xl shadow-sage-md"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-5 rounded-xl shadow-sage-md"
        >
          <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter(b => b.status === "confirmed").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-5 rounded-xl shadow-sage-md"
        >
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === "pending").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card p-5 rounded-xl shadow-sage-md"
        >
          <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">
            {bookings.filter(b => b.status === "cancelled").length}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "confirmed", "pending", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? "bg-primary text-primary-foreground shadow-sage-sm"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card p-12 rounded-xl shadow-sage-md text-center"
          >
            <Calendar size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all" 
                ? "You haven't made any bookings yet." 
                : `No ${filter} bookings at the moment.`}
            </p>
            <Button variant="primary" onClick={() => window.location.href = "/buyer/search"}>
              Browse Properties
            </Button>
          </motion.div>
        ) : (
          filteredBookings.map((booking, index) => {
            const StatusIcon = statusConfig[booking.status].icon;
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl shadow-sage-md overflow-hidden hover:shadow-sage-lg transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                  {/* Property Image */}
                  <div className="lg:col-span-3">
                    <img
                      src={booking.property.image}
                      alt={booking.property.title}
                      className="w-full h-48 lg:h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{booking.property.title}</h3>
                        <span className="text-xs px-3 py-1 bg-muted text-foreground rounded-full font-semibold">
                          {booking.property.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin size={14} />
                        {booking.property.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Visit Date</p>
                          <p className="font-semibold text-foreground">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-semibold text-foreground">{booking.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Visitors</p>
                          <p className="font-semibold text-foreground">{booking.visitors} {booking.visitors === 1 ? 'Person' : 'People'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Booking ID</p>
                          <p className="font-semibold text-foreground">{booking.id}</p>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm text-foreground italic">{booking.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions & Status */}
                  <div className="lg:col-span-3 flex flex-col justify-between">
                    <div>
                      <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg ${statusConfig[booking.status].bg}`}>
                        <StatusIcon size={18} className={statusConfig[booking.status].color} />
                        <span className={`font-semibold text-sm ${statusConfig[booking.status].color}`}>
                          {statusConfig[booking.status].text}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Booking Fee</p>
                        <p className="text-2xl font-bold text-primary">${booking.bookingFee}</p>
                      </div>
                    </div>

                    {booking.status !== "cancelled" && (
                      <div className="space-y-2">
                        <Button 
                          variant="primary" 
                          fullWidth
                          onClick={() => handleReschedule(booking.id)}
                        >
                          Reschedule
                        </Button>
                        <Button 
                          variant="secondary" 
                          fullWidth
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}