"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState, useEffect } from "react";

import TerminalCursor from "@/components/ui/TerminalCursor";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import { Profile } from "@/types";

const snippets = [
  { text: "int main(){", top: "15%", left: "10%", duration: 8 },
  { text: "#include <signal.h>", top: "25%", left: "80%", duration: 10 },
  { text: "while(1){...}", top: "60%", left: "5%", duration: 7 },
  { text: "return 0;", top: "75%", left: "85%", duration: 9 },
  { text: "#define TRUE 1", top: "40%", left: "15%", duration: 11 },
  { text: "volatile uint8_t", top: "50%", left: "75%", duration: 6 },
];

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const t = useTranslations("hero");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const path1 = useMemo(() => {
    return Array.from({ length: 401 }).reduce<string>((path, _, index) => {
      const i = index * 5;
      const y = 100
        + Math.sin(i * 2 * Math.PI / 500) * 35
        + Math.sin(i * 2 * Math.PI / 250) * 20
        + Math.sin(i * 2 * Math.PI / 100) * 15
        + Math.sin(i * 2 * Math.PI / 50) * 10
        + Math.sin(i * 2 * Math.PI / 25) * 5;
      return path + (index === 0 ? `M ${i} ${y} ` : `L ${i} ${y} `);
    }, "");
  }, []);

  const path2 = useMemo(() => {
    return Array.from({ length: 401 }).reduce<string>((path, _, index) => {
      const i = index * 5;
      const y = 100
        + Math.sin((i + 40) * 2 * Math.PI / 500) * 35
        + Math.sin((i + 20) * 2 * Math.PI / 250) * 20
        + Math.sin((i + 10) * 2 * Math.PI / 100) * 15
        + Math.sin((i + 5) * 2 * Math.PI / 50) * 10
        + Math.sin((i + 2.5) * 2 * Math.PI / 25) * 5;
      return path + (index === 0 ? `M ${i} ${y} ` : `L ${i} ${y} `);
    }, "");
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-16 lg:px-32 overflow-hidden">


      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5 text-accent-green font-mono text-sm hidden md:block"
          style={{ top: snippet.top, left: snippet.left }}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: snippet.duration, ease: "linear" }}
        >
          {snippet.text}
        </motion.div>
      ))}

      {isMounted && (
        <div className="absolute bottom-0 left-0 w-full h-48 opacity-70 overflow-hidden pointer-events-none">
          <svg width="200%" height="100%" viewBox="0 0 2000 200" preserveAspectRatio="none">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d={path1}
              fill="none"
              stroke="#00FF88"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ x: 0 }}
              animate={{ x: -1000 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />
            <motion.path
              d={path2}
              fill="none"
              stroke="#00FF88"
              strokeWidth="1"
              opacity="0.3"
              filter="url(#glow)"
              initial={{ x: 0 }}
              animate={{ x: -1000 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </svg>
        </div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.p variants={fadeUpVariant} className="text-text-muted text-sm font-ibm mb-6">
          {t("init")}
        </motion.p>

        <motion.h1 variants={fadeUpVariant} className="font-jetbrains font-bold text-[clamp(2.5rem,8vw,7rem)] text-text-primary leading-tight mb-4">
          {profile.heroTitle}<TerminalCursor />
        </motion.h1>

        <motion.p variants={fadeUpVariant} className="text-accent-green font-fira text-lg mb-12">
          {profile.heroRole}
        </motion.p>

        <motion.button
          variants={fadeUpVariant}
          onClick={scrollToAbout}
          className="border border-accent-green text-accent-green font-jetbrains text-sm px-6 py-3 hover:bg-accent-green hover:text-bg-base transition-colors duration-200"
        >
          {t("cta")}
        </motion.button>
      </motion.div>
    </section>
  );
}
