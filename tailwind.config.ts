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
       * Neutral ramp from Magzin's --tc-neutral-* scale, so every existing slate-*
       * utility picks up its light colour scheme without rewriting each class.
       * 200 is its border, 100 its hairline surface, 500 its muted text and 900
       * its primary text (#0e0e0f).
       */
      colors: {
        // Card surface in dark mode on the home page. A single token rather than a
        // scattering of slate shades, so the surface can be changed in one place.
        card: '#222324',
        // Card border in dark mode.
        'card-edge': '#313131',
        /*
         * Section heading bar. The Hubs & Platforms heading has always used this
         * (--bar in components/for-you.css); naming it here lets the Latest and
         * Recommended headings share the value rather than restate the hex.
         */
        bar: '#eef0f3',
        'bar-dark': '#1d1e20',
        /*
         * Magzin's dark ramp (--tc-neutral-dark-* in its magzin-main.css). It
         * inverts: 50 is the darkest surface and 900 the lightest text, which is
         * why the footer reads bg-night-50 / text-night-900 rather than the other
         * way round.
         */
        night: {
          50: '#151616',
          100: '#181818',
          200: '#282828',
          300: '#343434',
          400: '#565656',
          500: '#727272',
          600: '#9ca3af',
          700: '#d1d5db',
          800: '#e5e7eb',
          900: '#f3f4f6',
        },
        slate: {
          50: '#f7f8f9',
          100: '#eaecee',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#a7aaaf',
          500: '#75787d',
          600: '#626568',
          700: '#3a3b3d',
          800: '#1a1b1c',
          900: '#0e0e0f',
          950: '#000000',
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
        // Inter everywhere - body, headings and the `sans` utility all resolve
        // to the same family, so nothing on the site can drift onto another
        // one. Self-hosted from public/fonts (see the @font-face rules in
        // globals.css). The other families remain defined there, unused, so a
        // theme can be switched back by editing this block alone.
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
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
