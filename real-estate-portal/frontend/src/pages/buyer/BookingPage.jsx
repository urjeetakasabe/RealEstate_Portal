import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/buyer/Button";
import { Calendar, Clock, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    propertyId: "",
    date: "",
    time: "",
    visitors: "1",
    notes: "",
    paymentMethod: "cash",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Booking Confirmed!",
      description: "You will receive a confirmation email shortly.",
    });
    setFormData({
      propertyId: "",
      date: "",
      time: "",
      visitors: "1",
      notes: "",
      paymentMethod: "cash",
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Book a Visit</h1>
        <p className="text-muted-foreground text-lg">Schedule a property viewing at your convenience</p>
      </div>

      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card p-8 rounded-xl shadow-sage-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  placeholder="Enter property ID"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Visit Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Clock className="inline mr-2" size={16} />
                  Preferred Time *
                </label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Number of Visitors */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Number of Visitors
                </label>
                <select
                  value={formData.visitors}
                  onChange={(e) => setFormData({ ...formData, visitors: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4+ People</option>
                </select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific areas you'd like to focus on?"
                  rows={3}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <CreditCard className="inline mr-2" size={16} />
                  Payment Method (Booking Fee: $50)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <input
                      type="radio"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">Cash on Visit</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <input
                      type="radio"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">Credit/Debit Card (Online)</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" variant="primary" fullWidth>
                Confirm Booking
              </Button>
            </form>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Booking Info */}
            <div className="bg-card p-6 rounded-xl shadow-sage-md">
              <h3 className="font-bold text-foreground mb-4">Booking Information</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Viewing duration: 30-45 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Booking fee is refundable if canceled 24h in advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>An agent will accompany you during the visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Bring valid ID for verification</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-primary/10 p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our support team for assistance with your booking.
              </p>
              <p className="text-sm font-semibold text-primary">
                📞 1-800-ESTATE-1<br />
                📧 support@estateflow.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}