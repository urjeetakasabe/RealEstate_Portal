import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Search, Calendar, MessageSquare, Star, Menu, X, User, BookMarked } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/buyer/dashboard", icon: Home },
  { name: "Search Properties", path: "/buyer/search", icon: Search },
  { name: "My Bookings", path: "/buyer/my-bookings", icon: BookMarked },
  { name: "Book a Visit", path: "/buyer/bookings", icon: Calendar },
  { name: "Inquiries", path: "/buyer/inquiries", icon: MessageSquare },
  { name: "Reviews", path: "/buyer/reviews", icon: Star },
  { name: "Profile", path: "/buyer/profile", icon: User },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-sage-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[hsl(var(--sidebar-sage))] text-background w-64 shadow-sage-lg z-40 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-[hsl(var(--sidebar-sage-light))]">
          <h1 className="text-2xl font-bold tracking-tight">EstateFlow</h1>
          <p className="text-sm opacity-90 mt-1">Buyer Portal</p>
        </div>

        {/* Navigation Menu */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 px-4 py-6 space-y-2"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.path} variants={itemVariants}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-background text-primary shadow-sage-sm"
                        : "hover:bg-[hsl(var(--sidebar-sage-light))] text-background/90 hover:text-background"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Footer */}
        <div className="p-4 border-t border-[hsl(var(--sidebar-sage-light))] text-sm opacity-75">
          <p>© 2025 EstateFlow</p>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};