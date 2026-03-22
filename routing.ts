import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/projects': {
      en: '/projects',
      tr: '/projeler'
    },
    '/projects/[slug]': {
      en: '/projects/[slug]',
      tr: '/projeler/[slug]'
    }
  }
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
