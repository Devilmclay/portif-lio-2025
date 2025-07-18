import type { Config } from "tailwindcss";

const config: Config = {
  // A linha mais importante: ativa o modo escuro baseado em classes.
  darkMode: "class",
  
  // Garante que o Tailwind verifica TODOS os seus ficheiros na pasta 'app' e 'components'.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Suas animações e outras personalizações ficam aqui.
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;