"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SlugContextType {
  alternateSlug: string | null;
  setAlternateSlug: (slug: string | null) => void;
}

const SlugContext = createContext<SlugContextType>({
  alternateSlug: null,
  setAlternateSlug: () => {},
});

export function SlugProvider({ children }: { children: React.ReactNode }) {
  const [alternateSlug, setAlternateSlug] = useState<string | null>(null);
  
  return (
    <SlugContext.Provider value={{ alternateSlug, setAlternateSlug }}>
      {children}
    </SlugContext.Provider>
  );
}

export const useSlug = () => useContext(SlugContext);

export function AlternateSlugSetter({ slug }: { slug: string | null }) {
  const { setAlternateSlug } = useSlug();
  
  useEffect(() => {
    setAlternateSlug(slug);
    return () => setAlternateSlug(null);
  }, [slug, setAlternateSlug]);
  
  return null;
}
