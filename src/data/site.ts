import atendimentoPresencial from '../assets/images/atendimento-premium.png';
import detalhesDoAtendimento from '../assets/images/detalhes-premium.png';
import reuniao from '../assets/images/reuniao-premium.png';

/**
 * Dados da ALFA usados em todo o site. Para mudar contato, endereço ou fotos, mude aqui.
 */

const whatsappNumber = '5512991671782';
const whatsappGreeting = 'Olá! Gostaria de conversar com a ALFA Contabilidade.';

const address = {
  street: 'Rua Luiz Simon, 238',
  city: 'Jacareí',
  state: 'SP',
  country: 'BR',
};

export const site = {
  name: 'ALFA Contabilidade',
  foundingYear: 1981,
  email: 'alfacontabilidade81@gmail.com',
  phone: {
    display: '(12) 99167-1782',
    e164: '+5512991671782',
  },
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappGreeting)}`,
  address,
  mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(`${address.street}, ${address.city} - ${address.state}, Brasil`)}&z=17&hl=pt-BR&output=embed`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.city} - ${address.state}`,
  )}`,
} as const;

/** Caminho de um arquivo em `public/`, respeitando o `base` do GitHub Pages. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Fotos do site. O Astro converte para WebP no build; para trocar, substitua o arquivo em src/assets/images/. */
export const photos = {
  hero: {
    src: atendimentoPresencial,
    alt: 'Cena ilustrativa de um contador e uma empresária analisando documentos em uma mesa de escritório.',
  },
  about: {
    src: detalhesDoAtendimento,
    alt: 'Cena ilustrativa de mãos revisando relatórios financeiros, com calculadora e caderno azul sobre a mesa.',
  },
  approach: {
    src: reuniao,
    alt: 'Cena ilustrativa de três profissionais conversando sobre documentos em um escritório com luz natural.',
  },
} as const;

export const nav = [
  { href: '#a-alfa', label: 'A ALFA' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-atendemos', label: 'Como atendemos' },
  { href: '#escritorio', label: 'Escritório' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;
