"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function StatusIndicator() {
  const t = useTranslations();

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 font-ibm text-xs text-accent-green">
      <motion.div
        className="w-2 h-2 rounded-full bg-accent-green"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <span>{t("status")}</span>
    </div>
  );
}
