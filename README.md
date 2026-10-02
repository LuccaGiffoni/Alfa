# Alfa

Site institucional da **ALFA Contabilidade** (Jacareí, desde 1981). Página única em [Astro](https://astro.build), gerada como HTML estático e publicada no GitHub Pages.

## Rodando localmente

Requer Node 22 ou mais recente.

```bash
npm install
npm run dev      # http://localhost:4321/
npm run check    # checagem de tipos do Astro
npm run build    # gera o site em dist/
npm run preview  # serve o dist/ localmente
```

## Onde mudar o quê

| O quê | Onde |
| --- | --- |
| E-mail, WhatsApp, endereço, ano de fundação | `src/data/site.ts` |
| Fotos (hoje são marcadores de lugar) | `public/images/` + caminhos e textos alternativos em `src/data/site.ts` |
| Textos de cada seção | `src/components/<Seção>.astro` |
| Cores, fonte, espaçamentos | `src/styles/global.css` (variáveis em `:root`) |
| Título e descrição para buscadores | `src/pages/index.astro` |

Para trocar uma foto, coloque o arquivo em `public/images/` (de preferência `.jpg` ou `.webp`, com até ~300 KB) e ajuste o `src` correspondente em `photos`, dentro de `src/data/site.ts`.

## Deploy (GitHub Pages)

Cada push na `main` dispara o workflow `.github/workflows/deploy.yml`. Ele roda checagem e build, e publica o resultado em https://alfa-contabilidade.com (domínio em `public/CNAME` e `site` em `astro.config.mjs`).

É preciso configurar uma vez no GitHub, em **Settings → Pages**:

- **Build and deployment → Source: GitHub Actions**;
- **Custom domain:** `alfa-contabilidade.com`, e depois **Enforce HTTPS**.

O DNS do domínio precisa apontar para o GitHub Pages: registros `A` do domínio raiz para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`, e um `CNAME` de `www` para `luccagiffoni.github.io` ([documentação](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
