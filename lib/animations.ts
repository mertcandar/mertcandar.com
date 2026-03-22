import { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const cardHoverVariant: Variants = {
  initial: { y: 0, boxShadow: "0 0 0px rgba(0,255,136,0)" },
  hover: { 
    y: -4, 
    boxShadow: "0 0 24px rgba(0,255,136,0.15)",
    borderColor: "#00FF88",
    transition: { duration: 0.3 }
  }
};

export const scanlineVariant: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: "linear" } }
};
