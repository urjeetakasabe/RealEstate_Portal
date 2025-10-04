import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Star, TrendingUp, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/buyer/Button";

const quickLinks = [
  {
    title: "Search Properties",
    description: "Find your perfect home",
    icon: Search,
    path: "/buyer/search",
    color: "bg-primary",
  },
  {
    title: "My Bookings",
    description: "View scheduled visits",
    icon: Calendar,
    path: "/buyer/bookings",
    color: "bg-accent",
  },
  {
    title: "My Reviews",
    description: "Share your experience",
    icon: Star,
    path: "/buyer/reviews",
    color: "bg-secondary",
  },
  {
    title: "Send Inquiry",
    description: "Ask about properties",
    icon: MessageSquare,
    path: "/buyer/inquiries",
    color: "bg-muted",
  },
];

const stats = [
  { label: "Properties Viewed", value: "12", icon: Home },
  { label: "Scheduled Visits", value: "3", icon: Calendar },
  { label: "Inquiries Sent", value: "8", icon: MessageSquare },
  { label: "Reviews Written", value: "2", icon: Star },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function BuyerDashboard() {
  const navigate = useNavigate();

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
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground text-lg">Ready to find your dream property?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-sage-md"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-primary" size={24} />
                <TrendingUp className="text-muted-foreground" size={20} />
              </div>
              <p className="text-3xl font-bold text-card-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(link.path)}
                className="bg-card p-6 rounded-xl shadow-sage-md cursor-pointer hover:shadow-sage-lg transition-shadow"
              >
                <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary to-accent p-8 rounded-xl shadow-sage-lg text-white"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">Start Your Property Search Today</h2>
          <p className="text-white/90 mb-6">
            Browse through thousands of verified properties and find the perfect home that matches your needs.
          </p>
          <Button
            onClick={() => navigate("/buyer/search")}
            variant="outline"
            className="bg-white text-primary border-white hover:bg-white/90"
          >
            Browse Properties
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}