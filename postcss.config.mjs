/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // A CORREÇÃO ESTÁ AQUI: Usamos o nome do novo pacote.
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
