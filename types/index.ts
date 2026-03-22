export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techTags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  resourceLinks?: { title: string; url: string }[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Profile {
  heroTitle: string;
  heroRole: string;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  email: string;
  experienceYears: number;
  bio: string;
  skills: Skill[];
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}
