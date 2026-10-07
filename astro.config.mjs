// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages com domínio próprio (public/CNAME). Sem domínio, use
// site: 'https://luccagiffoni.github.io' e base: '/Alfa', e apague public/CNAME.
export default defineConfig({
  site: 'https://alfa-contabilidade.com',
  base: '/',
  trailingSlash: 'always',
});
