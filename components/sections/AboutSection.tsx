"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Profile } from "@/types";
import OscilloscopeBar from "@/components/ui/OscilloscopeBar";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const t = useTranslations("about");

  const bioParagraphs = profile.bio.split('\n').filter(p => p.trim() !== '');

  return (
    <section id="about" className="relative min-h-screen py-24 px-6 md:px-16 lg:px-32 flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="diagonal-stripes" width="40" height="40" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#00FF88" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-accent-amber font-ibm text-xs">{t("sectionLabel")}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-bg-surface rounded-sm border border-border-dim overflow-hidden flex flex-col"
          >
            <div className="h-8 bg-border-dim flex items-center px-4 gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="p-6 font-fira text-text-muted leading-relaxed flex-grow">
              <motion.div variants={fadeUpVariant} className="mb-8 font-mono text-sm md:text-base">
                <div>
                  <span className="text-accent-amber">{t("structName")}</span> <span className="text-text-primary">{t("instanceName")}</span> <span className="text-accent-blue">=</span> <span className="text-text-muted">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.name")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-green">"{profile.firstName}"</span><span className="text-text-muted">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.surname")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-green">"{profile.lastName}"</span><span className="text-text-muted">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.role")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-green">"{profile.role}"</span><span className="text-text-muted">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.location")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-green">"{profile.location}"</span><span className="text-text-muted">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.email")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-green">"{profile.email}"</span><span className="text-text-muted">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-text-muted">.</span><span className="text-text-primary">{t("fields.experience")}</span> <span className="text-accent-blue">=</span> <span className="text-accent-amber">{profile.experienceYears}</span>
                </div>
                <div>
                  <span className="text-text-muted">{"};"}</span>
                </div>
              </motion.div>

              {bioParagraphs.map((p, i) => (
                <motion.p key={i} variants={fadeUpVariant} className="mb-4">
                  <span className="text-border-dim">/*</span> {p} <span className="text-border-dim">*/</span>
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center"
          >
            <motion.h2 variants={fadeUpVariant} className="text-accent-amber font-ibm uppercase text-2xl mb-12">
              SYSTEM_INFO
            </motion.h2>
            
            <div className="space-y-6">
              {profile.skills.map((skill, i) => (
                <motion.div key={skill.name} variants={fadeUpVariant}>
                  <OscilloscopeBar value={skill.level} label={skill.name} />
                </motion.div>
              ))}
            </div>

            {profile.resumeUrl && (
              <motion.div variants={fadeUpVariant} className="mt-12">
                <a 
                  href={profile.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-accent-amber text-accent-amber font-jetbrains text-sm px-6 py-3 hover:bg-accent-amber hover:text-bg-base transition-colors duration-200"
                >
                  {t("downloadCV")}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
