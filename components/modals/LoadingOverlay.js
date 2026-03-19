"use client";
import { AnimatePresence, motion } from "motion/react";

const LoadingOverlay = () => (
  <AnimatePresence>
    <motion.div
      key="loading"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="flex items-center justify-center"
      >
        <svg
          className="animate-spin h-14 w-14 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeOpacity="0.25"
          />
          <path
            d="M22 12a10 10 0 00-10-10"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </svg>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default LoadingOverlay;
