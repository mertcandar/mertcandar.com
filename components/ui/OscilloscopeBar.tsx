"use client";

import { motion } from "framer-motion";

interface OscilloscopeBarProps {
  value: number; // 0-100
  label: string;
}

export default function OscilloscopeBar({ value, label }: OscilloscopeBarProps) {
  const blocks = 20;
  const filledBlocks = Math.round((value / 100) * blocks);

  return (
    <div className="mb-6">
      <div className="font-ibm text-xs text-text-muted uppercase tracking-widest mb-2">
        {label}
      </div>
      <div className="flex gap-1 h-4">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 ${i < filledBlocks ? "bg-accent-green" : "bg-border-dim"}`}
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
          />
        ))}
      </div>
    </div>
  );
}
