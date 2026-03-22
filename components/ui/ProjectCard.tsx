"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { cardHoverVariant } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { Link } from "@/routing";

interface ProjectCardProps {
  project: Project;
  locale: string;
}

const scannerVariant = {
  initial: { top: "0%", opacity: 0 },
  hover: { top: "100%", opacity: 0.6, transition: { duration: 0.6, ease: "linear" } }
};

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <motion.div
      variants={cardHoverVariant}
      initial="initial"
      whileHover="hover"
      className="relative bg-bg-card border border-border-dim p-6 flex flex-col h-full overflow-hidden group"
    >
      <motion.div variants={scannerVariant} className="absolute left-0 w-full h-px bg-accent-green" />
      
      <h3 className="text-accent-amber font-ibm uppercase text-lg mb-3">
        [{project.title}]
      </h3>
      
      <p className="font-fira text-text-muted text-sm mb-6 flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techTags.map((tag) => (
          <span key={tag} className="border border-border-dim font-ibm text-xs px-2 py-1 text-text-muted">
            |{tag}|
          </span>
        ))}
      </div>
      
      <div className="flex gap-4 font-ibm text-sm">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">
            {t("viewCode")}
          </a>
        )}
        <Link 
          href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }} 
          className="text-accent-green hover:underline"
        >
          {t("viewLive")}
        </Link>
      </div>
    </motion.div>
  );
}
