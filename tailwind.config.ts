import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        military: {
          green: '#0B3D2E',
          'field-green': '#136B4A',
          navy: '#0B1F3B',
          midnight: '#071427',
          gold: '#D4AF37',
          'alert-red': '#C1121F',
          smoke: '#E6EEF6',
          muted: '#9FB3C8',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
};

export default config;
