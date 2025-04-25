import { motion } from "motion/react";
import React from "react";
function MotionFull({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      exit={{ opacity: 0.99 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default MotionFull;
