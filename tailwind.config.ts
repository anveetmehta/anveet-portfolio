import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono:  ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
        serif: ['var(--font-instrument-serif)', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-warm': 'hsl(var(--accent-warm) / <alpha-value>)',
        ink: 'hsl(var(--foreground))',
        'ink-2': 'hsl(var(--foreground) / var(--ink-a2))',
        'ink-3': 'hsl(var(--foreground) / var(--ink-a3))',
        'ink-4': 'hsl(var(--foreground) / var(--ink-a4))',
      },
      boxShadow: {
        glow: '0 10px 35px -15px rgba(59, 130, 246, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
