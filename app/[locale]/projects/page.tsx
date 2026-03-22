import { getProjects } from "@/lib/contentful";
import { Link } from "@/routing";
import { getTranslations } from "next-intl/server";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const projects = await getProjects(locale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  return (
    <main className="min-h-screen text-text-primary font-fira relative overflow-hidden pt-24 pb-12 px-6 md:px-16 lg:px-32">

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-accent-green hover:underline font-ibm text-sm">
            &lt; {navT("home")}
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-accent-amber font-ibm uppercase text-3xl md:text-4xl">
            [{t("title")}]
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.slug} className="h-full">
                <ProjectCard project={project} locale={locale} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-text-muted py-12">
              No projects found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
