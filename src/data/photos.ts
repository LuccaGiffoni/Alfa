import atendimento from '../assets/images/atendimento-premium.png';
import detalhes from '../assets/images/detalhes-premium.png';
import reuniao from '../assets/images/reuniao-premium.png';

/** Fotos do site. O Astro converte para WebP no build; para trocar, substitua o arquivo em src/assets/images/. */
export const photos = {
  hero: {
    src: atendimento,
    alt: 'Cena ilustrativa de um contador e uma empresária analisando documentos em uma mesa de escritório.',
  },
  about: {
    src: reuniao,
    alt: 'Cena ilustrativa de três profissionais conversando sobre documentos em um escritório com luz natural.',
  },
  aboutDetail: {
    src: detalhes,
    alt: 'Cena ilustrativa de mãos revisando relatórios financeiros, com calculadora e caderno azul sobre a mesa.',
  },
} as const;
