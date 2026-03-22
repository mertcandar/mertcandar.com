import { getProjects, getProfile } from '@/lib/contentful';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const [projects, profile] = await Promise.all([
    getProjects(locale),
    getProfile(locale)
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} locale={locale} limit={6} />
      <ContactSection profile={profile} />
    </>
  );
}
