"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-px bg-border-dim z-50">
      <motion.div
        className="w-full bg-accent-green"
        style={{ height }}
      />
    </div>
  );
}
