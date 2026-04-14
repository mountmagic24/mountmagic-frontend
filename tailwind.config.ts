import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mm-primary': '#2D5C7D',
        'mm-secondary': '#2D8B5C',
        'mm-accent': '#D4AF37',
        'mm-dark': '#1A1A1A',
        'mm-light': '#F8F9FA',
        'mm-success': '#06A77D',
        'mm-error': '#E63946',
      },
      fontFamily: {
        'sans': ['Inter', 'Open Sans', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      }
    },
  },
  plugins: [],
}

export default config
