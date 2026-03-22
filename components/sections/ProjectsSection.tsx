"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Project } from "@/types";
import ProjectCard from "@/components/ui/ProjectCard";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import { Link } from "@/routing";

interface ProjectsSectionProps {
  projects: Project[];
  locale: string;
  limit?: number;
}

export default function ProjectsSection({ projects, locale, limit }: ProjectsSectionProps) {
  const t = useTranslations("projects");

  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  const hasMore = limit ? projects.length > limit : false;

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 md:px-16 lg:px-32 flex flex-col justify-center">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-accent-amber font-ibm text-xs">{t("sectionLabel")}</span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <motion.div key={project.slug} variants={fadeUpVariant} className="h-full">
                <ProjectCard project={project} locale={locale} />
              </motion.div>
            ))
          ) : (
            // Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="h-64 bg-bg-card border border-border-dim animate-pulse" />
            ))
          )}
        </motion.div>

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Link 
              href="/projects" 
              className="inline-block border border-accent-green text-accent-green font-jetbrains text-sm px-8 py-4 hover:bg-accent-green hover:text-bg-base transition-colors duration-200"
            >
              {t("viewMore")}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
