import atendimentoPresencial from '../assets/images/atendimento-presencial.png';
import detalhesDoAtendimento from '../assets/images/detalhes-do-atendimento.png';
import fachada from '../assets/images/fachada.png';
import reuniao from '../assets/images/reuniao.png';

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
    alt: 'Duas mulheres conversam sorrindo à mesa de um escritório de contabilidade, com cadernos e pastas de documentos.',
  },
  about: {
    src: detalhesDoAtendimento,
    alt: 'Uma contadora e um cliente revisam juntos uma planilha impressa sobre a mesa.',
  },
  approach: {
    src: reuniao,
    alt: 'Três pessoas em reunião ao redor de uma mesa com papéis, diante de estantes com pastas de arquivo.',
  },
  office: {
    src: fachada,
    alt: 'Mulher sorridente na porta de entrada do escritório, com a recepção ao fundo e vasos de plantas na calçada.',
  },
} as const;

export const nav = [
  { href: '#a-alfa', label: 'A ALFA' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-atendemos', label: 'Como atendemos' },
  { href: '#escritorio', label: 'Escritório' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;
