"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import { Profile } from "@/types";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{name?: boolean; email?: boolean; message?: boolean}>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors = {
      name: !name?.trim(),
      email: !email?.trim(),
      message: !message?.trim(),
    };

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    
    const data = { name, email, message };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-16 lg:px-32 flex flex-col justify-center">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] hidden lg:block z-0">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00FF88" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#00FF88" strokeWidth="1" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#00FF88" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#00FF88" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-accent-amber font-ibm text-xs">{t("sectionLabel")}</span>
        </div>

        <motion.form
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-8"
        >
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-accent-green font-jetbrains whitespace-nowrap">{t("nameLabel")}</span>
              <div className="flex-grow flex items-center text-text-primary font-fira">
                <span className="text-border-dim mr-2">[</span>
                <input 
                  type="text" 
                  name="name"
                  placeholder={t("namePlaceholder")}
                  onChange={() => setErrors(prev => ({ ...prev, name: false }))}
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-border-dim focus:border-accent-green'} outline-none py-1 placeholder-text-muted/50 transition-colors`}
                />
                <span className="text-border-dim ml-2">]</span>
              </div>
            </div>
            {errors.name && <span className="text-red-500 font-mono text-xs md:ml-[88px]">{t("validationError")}</span>}
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-accent-green font-jetbrains whitespace-nowrap">{t("emailLabel")}</span>
              <div className="flex-grow flex items-center text-text-primary font-fira">
                <span className="text-border-dim mr-2">[</span>
                <input 
                  type="email" 
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  onChange={() => setErrors(prev => ({ ...prev, email: false }))}
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-border-dim focus:border-accent-green'} outline-none py-1 placeholder-text-muted/50 transition-colors`}
                />
                <span className="text-border-dim ml-2">]</span>
              </div>
            </div>
            {errors.email && <span className="text-red-500 font-mono text-xs md:ml-[88px]">{t("validationError")}</span>}
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <span className="text-accent-green font-jetbrains whitespace-nowrap">{t("messageLabel")}</span>
              <div className="flex-grow flex text-text-primary font-fira">
                <span className="text-border-dim mr-2 mt-1">[</span>
                <textarea 
                  name="message"
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  onChange={() => setErrors(prev => ({ ...prev, message: false }))}
                  className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-border-dim focus:border-accent-green'} outline-none py-1 placeholder-text-muted/50 resize-none transition-colors`}
                />
                <span className="text-border-dim ml-2 mt-1">]</span>
              </div>
            </div>
            {errors.message && <span className="text-red-500 font-mono text-xs">{t("validationError")}</span>}
          </motion.div>

          <motion.div variants={fadeUpVariant} className="pt-4">
            <button 
              type="submit"
              disabled={status === "loading"}
              className="border border-accent-green text-accent-green font-jetbrains text-sm px-6 py-3 hover:bg-accent-green hover:text-bg-base transition-colors duration-200 disabled:opacity-50"
            >
              {status === "loading" ? "[ ... ]" : t("submit")}
            </button>
            
            {status === "success" && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-accent-green font-fira text-sm mt-4"
              >
                {t("success")}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-500 font-fira text-sm mt-4"
              >
                {t("error")}
              </motion.p>
            )}
          </motion.div>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex flex-col gap-4"
        >
          <span className="text-text-muted font-ibm text-xs uppercase">{t("socials")}</span>
          <div className="flex gap-6 font-fira text-sm">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-blue transition-colors hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
              #include &lt;github.h&gt;
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-blue transition-colors hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
              #include &lt;linkedin.h&gt;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
