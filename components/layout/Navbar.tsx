"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/routing";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSlug } from "@/components/SlugProvider";

const navItems = [
  { id: "hero", label: "[00]" },
  { id: "about", label: "[01]" },
  { id: "projects", label: "[02]" },
  { id: "contact", label: "[03]" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { alternateSlug } = useSlug();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const toggleLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    setIsMobileMenuOpen(false);

    if (pathname === '/') {
      router.replace({ pathname: '/' }, { locale: nextLocale });
    } else if (pathname === '/projects/[slug]') {
      const slug = alternateSlug || (params?.slug as string);
      router.replace(
        { pathname: '/projects/[slug]', params: { slug } },
        { locale: nextLocale }
      );
    } else if (pathname === '/projects') {
      router.replace({ pathname: '/projects' }, { locale: nextLocale });
    } else {
      router.replace({ pathname: '/' }, { locale: nextLocale });
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex flex-col fixed right-6 top-1/2 -translate-y-1/2 z-50 gap-6">
        {isHome ? (
          navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-mono text-sm transition-colors ${
                activeSection === item.id ? "text-accent-green" : "text-text-muted hover:text-text-primary"
              }`}
            >
              {item.label}
            </button>
          ))
        ) : (
          <Link
            href="/"
            className="font-mono text-sm transition-colors text-accent-green hover:text-text-primary"
          >
            [00]
          </Link>
        )}
        <button 
          onClick={toggleLocale}
          className="font-mono text-sm text-text-muted hover:text-accent-green mt-4 pt-4 border-t border-border-dim"
        >
          {locale === 'tr' ? 'EN' : 'TR'}
        </button>
      </nav>

      {/* Mobile Nav Toggle */}
      <button 
        className="md:hidden fixed top-6 right-6 z-[60] text-accent-green"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-bg-surface z-50 flex flex-col items-center justify-center gap-8"
          >
            {isHome ? (
              navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-mono text-2xl ${
                    activeSection === item.id ? "text-accent-green" : "text-text-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))
            ) : (
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-2xl text-accent-green"
              >
                [00] HOME
              </Link>
            )}
            <button 
              onClick={toggleLocale}
              className="font-mono text-xl text-text-muted mt-8 pt-8 border-t border-border-dim w-32"
            >
              {locale === 'tr' ? 'SWITCH TO EN' : 'SWITCH TO TR'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
