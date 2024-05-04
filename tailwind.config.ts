import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      minHeight: {
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
      height: {
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
      maxHeight: {
        screen: 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [],
};
export default config;
