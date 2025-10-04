import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/buyer/Button";
import { Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    propertyId: "",
    title: "",
    review: "",
    recommend: "yes",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Click on the stars to rate your experience",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
    setRating(0);
    setFormData({
      propertyId: "",
      title: "",
      review: "",
      recommend: "yes",
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Write a Review</h1>
        <p className="text-muted-foreground text-lg">Share your experience with the property</p>
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
                Property ID *
              </label>
              <input
                type="text"
                required
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                placeholder="Enter the property ID you want to review"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Overall Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={40}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {rating === 5 && "Excellent! 🌟"}
                  {rating === 4 && "Very Good! 👍"}
                  {rating === 3 && "Good 👌"}
                  {rating === 2 && "Fair 🤔"}
                  {rating === 1 && "Poor 😞"}
                </p>
              )}
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Review Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Your Review *
              </label>
              <textarea
                required
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                placeholder="Tell us about your experience with this property..."
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Minimum 50 characters. Be specific and honest.
              </p>
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Would you recommend this property?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.recommend === "yes"}
                    onChange={(e) => setFormData({ ...formData, recommend: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    checked={formData.recommend === "no"}
                    onChange={(e) => setFormData({ ...formData, recommend: e.target.value })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth>
              Submit Review
            </Button>
          </form>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 bg-secondary rounded-xl"
        >
          <h3 className="font-semibold text-foreground mb-3">Review Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Focus on your personal experience with the property</li>
            <li>• Avoid personal attacks or inappropriate language</li>
            <li>• Reviews are public and will help other buyers</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}