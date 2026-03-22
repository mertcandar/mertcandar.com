"use client";

import { motion } from "framer-motion";
import React from "react";

const CircuitBackground = React.memo(function CircuitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="#00FF88" />
            <motion.path
              d="M 20 0 L 20 40 M 0 20 L 40 20"
              stroke="#00FF88"
              strokeWidth="1"
              fill="none"
              strokeDasharray="40 40"
              animate={{ strokeDashoffset: [80, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
});

export default CircuitBackground;
