"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const Confirmation = ({ setIsConfirmOpen, isConfirmOpen }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="confirm"
        className="fixed inset-0 z-[1002] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="w-auto max-w-[320px] lg:max-w-[480px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-black p-6 sm:px-10 sm:py-8 shadow-lg flex flex-col items-center gap-4 sm:gap-6 lg:gap-7"
        >
          <h2 className="text-center font-bold text-[22px] lg:text-[24px] leading-[1.3] text-black">
            Are you sure you don't want to save your estimate?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
      
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="bg-gradient-to-r from-primary to-[#6E7EFF] text-white hover:to-primary px-10 py-2 font-medium rounded-lg"
            >
               Save Estimate
            </button>
              <button
              onClick={() => (
                sessionStorage.setItem("noEmailEntered", "true"),
                (window.location.href = "/")
              )}
              className="bg-gray-500 text-black border border-gray-100 px-10 py-2 font-medium rounded-lg"
            >
              Leave
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Confirmation;
