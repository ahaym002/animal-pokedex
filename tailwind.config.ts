import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pokedex-red': '#DC0A2D',
        'pokedex-dark': '#1D1D1D',
        'pokedex-light': '#F5F5F5',
        'type-normal': '#A8A77A',
        'type-fire': '#EE8130',
        'type-water': '#6390F0',
        'type-grass': '#7AC74C',
        'type-electric': '#F7D02C',
        'type-ice': '#96D9D6',
        'type-ground': '#E2BF65',
        'type-flying': '#A98FF3',
        'type-poison': '#A33EA1',
        'type-rock': '#B6A136',
      },
      fontFamily: {
        'pokemon': ['Pokemon Solid', 'Impact', 'sans-serif'],
      },
      animation: {
        'pokeball-shake': 'shake 0.5s ease-in-out',
        'pokeball-catch': 'catch 1.5s ease-in-out',
        'card-flip': 'flip 0.6s ease-in-out',
        'sparkle': 'sparkle 1s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-20deg)' },
          '75%': { transform: 'rotate(20deg)' },
        },
        catch: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
