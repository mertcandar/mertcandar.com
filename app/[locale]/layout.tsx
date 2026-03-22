import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { JetBrains_Mono, IBM_Plex_Mono, Fira_Code } from 'next/font/google';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScanlineOverlay from '@/components/layout/ScanlineOverlay';
import Navbar from '@/components/layout/Navbar';
import StatusIndicator from '@/components/ui/StatusIndicator';
import CircuitBackground from '@/components/ui/CircuitBackground';
import DataFlowBackground from '@/components/ui/DataFlowBackground';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { SlugProvider } from '@/components/SlugProvider';
import '../globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap'
});

const ibm = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm',
  display: 'swap'
});

const fira = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fira',
  display: 'swap'
});

export const metadata = {
  title: 'Portfolio | Electrical & Electronics Engineer',
  description: 'Personal portfolio web application',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${jetbrains.variable} ${ibm.variable} ${fira.variable}`}>
      <body className="bg-bg-base text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <SlugProvider>
            <div className="fixed inset-0 z-0">
              <CircuitBackground />
              <DataFlowBackground />
            </div>
            <CustomCursor />
            <ScrollProgress />
            <ScanlineOverlay />
            <Navbar />
            <StatusIndicator />
            <main className="relative z-10">
              {children}
            </main>
          </SlugProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
