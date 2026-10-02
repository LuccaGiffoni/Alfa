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

/**
 * Fotos do site. Os arquivos atuais são marcadores de lugar: troque pelas fotos reais em
 * `public/images/` (mesmo nome, ou ajuste o caminho aqui) e revise o texto alternativo.
 */
export const photos = {
  hero: { src: 'images/hero.svg', alt: 'Atendimento na ALFA Contabilidade', width: 624, height: 760 },
  about: { src: 'images/sobre.svg', alt: 'Equipe da ALFA em conversa com um cliente', width: 620, height: 320 },
  approach: { src: 'images/nosso-jeito.svg', alt: 'Reunião de acompanhamento no escritório', width: 680, height: 610 },
  office: { src: 'images/escritorio.svg', alt: 'Fachada do escritório da ALFA em Jacareí', width: 720, height: 650 },
} as const;

export const nav = [
  { href: '#a-alfa', label: 'A ALFA' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-atendemos', label: 'Como atendemos' },
  { href: '#escritorio', label: 'Escritório' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;
