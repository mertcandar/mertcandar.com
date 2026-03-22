import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0A0C0F',
        'bg-surface': '#0E1117',
        'bg-card': '#12161E',
        'accent-green': '#00FF88',
        'accent-amber': '#FFB800',
        'accent-blue': '#00BFFF',
        'text-primary': '#E8EDF5',
        'text-muted': '#6B7A90',
        'border-dim': '#1E2530',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)'],
        ibm: ['var(--font-ibm)'],
        fira: ['var(--font-fira)'],
      },
    },
  },
  plugins: [],
};
export default config;
