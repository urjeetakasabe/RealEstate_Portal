import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/buyer/Button";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SendInquiry() {
  const [formData, setFormData] = useState({
    propertyId: "",
    subject: "",
    message: "",
    contactPreference: "email",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending inquiry
    toast({
      title: "Inquiry Sent!",
      description: "The property owner will contact you soon.",
    });
    setFormData({
      propertyId: "",
      subject: "",
      message: "",
      contactPreference: "email",
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Send Inquiry</h1>
        <p className="text-muted-foreground text-lg">Have questions? Send us a message</p>
      </div>

      <div className="max-w-3xl">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-8 rounded-xl shadow-sage-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property ID */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Property ID (Optional)
              </label>
              <input
                type="text"
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                placeholder="Enter property ID if inquiring about specific property"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What is your inquiry about?"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your inquiry..."
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              />
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Preferred Contact Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="email"
                    checked={formData.contactPreference === "email"}
                    onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="phone"
                    checked={formData.contactPreference === "phone"}
                    onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Phone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="both"
                    checked={formData.contactPreference === "both"}
                    onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Both</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth>
              <Send className="mr-2" size={20} />
              Send Inquiry
            </Button>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 bg-secondary rounded-xl"
        >
          <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
          <p className="text-muted-foreground text-sm">
            We typically respond to inquiries within 24 hours during business days. For urgent matters,
            please call our office directly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}