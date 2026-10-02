# Alfa

Site institucional da **ALFA Contabilidade** (Jacareí, desde 1981). Página única em [Astro](https://astro.build), gerada como HTML estático e publicada no GitHub Pages.

## Rodando localmente

Requer Node 22 ou mais recente.

```bash
npm install
npm run dev      # http://localhost:4321/Alfa/
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

Cada push na `main` dispara o workflow `.github/workflows/deploy.yml`. Ele roda checagem e build, e publica o resultado em https://luccagiffoni.github.io/Alfa/.

É preciso ativar uma vez: no GitHub, **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Domínio próprio

1. Em `astro.config.mjs`, troque `site` pelo domínio (ex.: `https://alfacontabilidade.com.br`) e `base` por `'/'`.
2. Crie `public/CNAME` com o domínio numa única linha.
3. Configure o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) e informe o domínio em **Settings → Pages**.
