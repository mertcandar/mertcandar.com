import { i18n } from '@/i18n.config';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base text-accent-green font-mono">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-text-muted">{'// page_not_found.c'}</p>
      </div>
    </div>
  );
}
