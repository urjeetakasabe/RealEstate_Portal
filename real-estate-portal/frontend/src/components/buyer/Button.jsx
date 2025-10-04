import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sage-sm";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-accent shadow-sage-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};