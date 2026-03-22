"use client";

import { motion } from "framer-motion";

export default function TerminalCursor() {
  return (
    <motion.span
      className="text-accent-green inline-block ml-1"
      animate={{ opacity: [1, 1, 0, 0, 1] }}
      transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.49, 0.5, 0.99, 1] }}
    >
      _
    </motion.span>
  );
}
