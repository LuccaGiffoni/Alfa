// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: o site é publicado em https://luccagiffoni.github.io/Alfa/.
// Com domínio próprio, troque `site` pelo domínio, use `base: '/'` e crie public/CNAME com o domínio.
export default defineConfig({
  site: 'https://luccagiffoni.github.io',
  base: '/Alfa',
  trailingSlash: 'ignore',
});
