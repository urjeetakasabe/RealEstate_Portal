import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/buyer/Button";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Looking for a modern apartment in the downtown area with good access to public transportation.",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: "Properties Viewed", value: "12", icon: MapPin },
    { label: "Bookings Made", value: "8", icon: Calendar },
    { label: "Inquiries Sent", value: "15", icon: Mail },
  ];

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground text-lg">Manage your account information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="primary">
            <Edit2 size={18} className="mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary">
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="max-w-6xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-sage-md hover:shadow-sage-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card p-8 rounded-xl shadow-sage-lg"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
            
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-sm font-semibold text-foreground mb-2">
                  <User className="mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-semibold text-foreground mb-2">
                  <Mail className="mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-semibold text-foreground mb-2">
                  <Phone className="mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center text-sm font-semibold text-foreground mb-2">
                  <MapPin className="mr-2" size={16} />
                  Location
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? editedProfile.location : profile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Bio / Preferences
                </label>
                <textarea
                  disabled={!isEditing}
                  value={isEditing ? editedProfile.bio : profile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Account Info */}
            <div className="bg-card p-6 rounded-xl shadow-sage-md">
              <h3 className="font-bold text-foreground mb-4">Account Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {profile.joinDate}
                  </p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Account Status</p>
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-primary/10 p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-card rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 bg-card rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                  Notification Settings
                </button>
                <button className="w-full text-left px-4 py-2 bg-card rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                  Privacy Settings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}