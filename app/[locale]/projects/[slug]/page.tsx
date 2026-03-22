import { getProjectBySlug, getProjectAlternateSlug } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Link } from "@/routing";
import { getTranslations } from "next-intl/server";
import { AlternateSlugSetter } from "@/components/SlugProvider";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const alternateLocale = locale === 'tr' ? 'en' : 'tr';
  const alternateSlug = await getProjectAlternateSlug(project.id, alternateLocale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  return (
    <main className="min-h-screen text-text-primary font-fira relative overflow-hidden pt-24 pb-12 px-6 md:px-16 lg:px-32">
      <AlternateSlugSetter slug={alternateSlug} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-accent-green hover:underline font-ibm text-sm">
            &lt; {navT("home")}
          </Link>
        </div>

        <div className="bg-bg-surface border border-border-dim p-8 md:p-12">
          <div className="mb-8 border-b border-border-dim pb-8">
            <h1 className="text-accent-amber font-ibm uppercase text-3xl md:text-4xl mb-4">
              [{project.title}]
            </h1>
            <div className="flex flex-wrap gap-3">
              {project.techTags.map((tag) => (
                <span key={tag} className="border border-accent-blue/30 bg-accent-blue/5 font-ibm text-xs px-3 py-1 text-accent-blue">
                  |{tag}|
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-text-muted leading-relaxed whitespace-pre-wrap">{project.description}</p>

            {project.resourceLinks && project.resourceLinks.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-4">
                {project.resourceLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-amber hover:text-accent-green transition-colors font-jetbrains text-sm"
                  >
                    [ {link.title} ]
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 font-ibm text-sm border-t border-border-dim pt-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent-green text-accent-green px-6 py-3 hover:bg-accent-green hover:text-bg-base transition-colors duration-200"
              >
                {t("viewCode")}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
