import { Project, Profile } from '@/types';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

// Map our app locales to Contentful locales if needed
// Contentful often uses 'en-US' as default. Adjust these if your Contentful uses different codes.
const getContentfulLocale = (locale: string) => {
  if (locale === 'en') return 'en-US';
  if (locale === 'tr') return 'tr-TR';
  return locale;
};

export async function getProjects(locale: string): Promise<Project[]> {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    return getMockProjects();
  }
  try {
    const contentfulLocale = getContentfulLocale(locale);
    const res = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=project&locale=${contentfulLocale}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      next: { revalidate: 60 }
    });
    const data = await res.json();
    
    if (data.sys && data.sys.type === 'Error') {
      console.error("Contentful API Error:", data.message);
      // Fallback to mock data but maybe we should try 'tr' instead of 'tr-TR'
      if (contentfulLocale === 'tr-TR') {
        // Try with 'tr'
        const retryRes = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=project&locale=tr`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          next: { revalidate: 60 }
        });
        const retryData = await retryRes.json();
        if (!retryData.sys || retryData.sys.type !== 'Error') {
          return processContentfulProjects(retryData);
        }
      }
      return getMockProjects();
    }

    return processContentfulProjects(data);
  } catch (e) {
    console.error("Contentful fetch exception:", e);
    return getMockProjects();
  }
}

function processContentfulProjects(data: any) {
  const assets = data.includes?.Asset || [];

  return (data.items || []).map((item: any) => {
    let resourceLinks = [];
    
    // Check if resourceLinks exists and is an array of references
    if (item.fields.resourceLinks && Array.isArray(item.fields.resourceLinks)) {
      resourceLinks = item.fields.resourceLinks.map((link: any) => {
        // If it's a reference to an asset
        if (link.sys && link.sys.type === 'Link' && link.sys.linkType === 'Asset') {
          const asset = assets.find((a: any) => a.sys.id === link.sys.id);
          if (asset && asset.fields && asset.fields.file) {
            return {
              title: asset.fields.title || 'LINK',
              url: `https:${asset.fields.file.url}`
            };
          }
        }
        // Fallback if it was created as a JSON object (the previous method)
        if (link.title && link.url) {
          return link;
        }
        return null;
      }).filter(Boolean);
    }

    return {
      id: item.sys?.id || Math.random().toString(36).substring(7),
      title: item.fields.title || 'Untitled',
      slug: item.fields.slug || 'untitled',
      description: item.fields.description || '',
      techTags: item.fields.techTags || [],
      githubUrl: item.fields.githubUrl || '',
      liveUrl: item.fields.liveUrl || '',
      featured: item.fields.featured || false,
      resourceLinks: resourceLinks,
    };
  });
}

export async function getProfile(locale: string): Promise<Profile> {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    return getMockProfile();
  }
  try {
    const contentfulLocale = getContentfulLocale(locale);
    const res = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=profile&locale=${contentfulLocale}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      next: { revalidate: 60 }
    });
    const data = await res.json();
    
    if (data.sys && data.sys.type === 'Error') {
      console.error("Contentful API Error in getProfile:", data.message);
      if (contentfulLocale === 'tr-TR') {
        const retryRes = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=profile&locale=tr`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          next: { revalidate: 60 }
        });
        const retryData = await retryRes.json();
        if (!retryData.sys || retryData.sys.type !== 'Error') {
          return processContentfulProfile(retryData);
        }
      }
      return getMockProfile();
    }

    return processContentfulProfile(data);
  } catch (e) {
    console.error("Contentful fetch exception in getProfile:", e);
    return getMockProfile();
  }
}

function processContentfulProfile(data: any): Profile {
  const item = data.items[0];
  if (!item) return getMockProfile();
  
  // Resolve asset URL for resume
  let resumeUrl = item.fields.resumeUrl || '';
  if (item.fields.cvFile && item.fields.cvFile.sys) {
    const assetId = item.fields.cvFile.sys.id;
    const asset = data.includes?.Asset?.find((a: any) => a.sys.id === assetId);
    if (asset && asset.fields && asset.fields.file) {
      resumeUrl = `https:${asset.fields.file.url}`;
    }
  }

  return {
    heroTitle: item.fields.heroTitle || 'MERTCAN_D',
    heroRole: item.fields.heroRole || '/* Elektrik & Elektronik Mühendisi */',
    firstName: item.fields.firstName || 'Mertcan',
    lastName: item.fields.lastName || 'DAR',
    role: item.fields.role || 'Elektrik & Elektronik Mühendisi',
    location: item.fields.location || 'İstanbul, Türkiye',
    email: item.fields.email || 'iletisim@mertcandar.com',
    experienceYears: item.fields.experienceYears || 1,
    bio: item.fields.bio || '',
    skills: item.fields.skills || [],
    resumeUrl: resumeUrl,
    githubUrl: item.fields.githubUrl || '#',
    linkedinUrl: item.fields.linkedinUrl || '#'
  };
}

export async function getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
  const projects = await getProjects(locale);
  return projects.find(p => p.slug === slug) || null;
}

export async function getProjectAlternateSlug(id: string, targetLocale: string): Promise<string | null> {
  const projects = await getProjects(targetLocale);
  const project = projects.find(p => p.id === id);
  return project ? project.slug : null;
}

function getMockProjects(): Project[] {
  return [
    {
      id: "mock-1",
      title: "Neural_Processor_V2",
      slug: "neural-processor-v2",
      description: "Low-latency FPGA implementation of a convolutional neural network for real-time signal analysis.",
      techTags: ["FPGA", "VERILOG", "DSP"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      resourceLinks: [
        { title: "PCB_GÖRSEL", url: "#" },
        { title: "ŞEMATİK", url: "#" }
      ]
    },
    {
      id: "mock-2",
      title: "RF_Transceiver_Mesh",
      slug: "rf-transceiver-mesh",
      description: "Custom 2.4GHz mesh network protocol designed for industrial IoT environment monitoring.",
      techTags: ["STM32", "RF", "C++"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      resourceLinks: [
        { title: "SİSTEM_MİMARİSİ", url: "#" }
      ]
    },
    {
      id: "mock-3",
      title: "BioMetric_Scanner_IO",
      slug: "biometric-scanner-io",
      description: "Secure hardware module for biometric data encryption and authentication via SPI.",
      techTags: ["SECURITY", "SPI", "ARM"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    }
  ];
}

function getMockProfile(): Profile {
  return {
    heroTitle: "MERTCAN_D",
    heroRole: "/* Elektrik & Elektronik Mühendisi */",
    firstName: "Mertcan",
    lastName: "DAR",
    role: "Elektrik & Elektronik Mühendisi",
    location: "İstanbul, Türkiye",
    email: "iletisim@mertcandar.com",
    experienceYears: 1,
    bio: "Building the bridges between raw electricity and logical computation. Specialized in high-speed digital design and low-latency firmware.\n\nPassionate about complex circuitry and efficiency at nano scale.",
    skills: [
      { name: "EMBEDDED_C", level: 95 },
      { name: "PCB_DESIGN", level: 88 },
      { name: "FPGA_VERILOG", level: 75 }
    ],
    resumeUrl: "#",
    githubUrl: "#",
    linkedinUrl: "#"
  };
}
