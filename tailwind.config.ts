import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /*
       * Neutral ramp from the Revision theme's contrast scale, so every existing
       * slate-* utility picks up its colour scheme without rewriting each class.
       * 200 is its border colour, 100 its highlight surface, 600 its secondary
       * text, 900 its primary text (#29294b) and 800 its dark site background.
       */
      colors: {
        slate: {
          50: '#f8f9fa',
          100: '#f2f2f6',
          200: '#e1e1e8',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#696981',
          700: '#495057',
          800: '#1c1c1c',
          900: '#29294b',
          950: '#151528',
        },
        /*
         * Accent ramp taken from the Revision theme: its accent is #5955d1, its
         * button gradient runs #9895ff -> #514dcc, hover #8e8bff -> #4440b4, and its
         * secondary button fill is #deddff. Those exact values anchor 400/600/700/
         * 800 and 100; the rest of the ramp is interpolated around them.
         */
        brand: {
          50: '#f1f0ff',
          100: '#deddff',
          200: '#c6c4ff',
          300: '#aeabff',
          400: '#9895ff',
          500: '#7b77e4',
          600: '#5955d1',
          700: '#514dcc',
          800: '#4440b4',
          900: '#37348f',
          950: '#232159',
        },
        accent: {
          400: '#ffb545',
          500: '#ff9b1a',
          600: '#e97c06',
        },
      },
      fontFamily: {
        // Geist is the reference theme's family for body and headings alike,
        // self-hosted from public/fonts (see the @font-face rules in globals.css).
        // From originfacts.com: Figtree for headings, Plus Jakarta Sans for body.
        body: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        prose: '46rem',
        /** Site container: 1296px. Used by every page wrapper and the header/footer. */
        site: '81rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
