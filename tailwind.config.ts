import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        navy: '#071426',
        chamber: '#0d1b2a',
        parchment: '#f7f1e7',
        vellum: '#fbf8f1',
        brass: '#b08d57',
        fog: '#e7dfd1',
        slateblue: '#233044'
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        institution: '0 24px 70px rgba(7, 20, 38, 0.14)'
      }
    }
  },
  plugins: []
};

export default config;
