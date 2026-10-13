/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        douitsu: {
          navy: '#0d1b2a',
          dark: '#1b263b',
          blue: '#1e3a8a',
          primary: '#2563eb',
          accent: '#3b82f6',
          sky: '#60a5fa',
          ice: '#eff6ff',
          slate: '#334155',
          muted: '#64748b',
          sakura: '#f43f5e',
          'sakura-pink': '#fb7185',
          'sakura-soft': '#fff1f2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Myanmar"', '"Noto Sans JP"', '"Hiragino Sans"', '"Meiryo"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
};
