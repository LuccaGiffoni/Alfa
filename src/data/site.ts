/**
 * Dados da ALFA usados em todo o site. Para mudar contato, endereço ou menu, mude aqui.
 * Os scripts do navegador também importam este arquivo: não importe imagens aqui (fotos ficam em photos.ts).
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
  founder: 'Marcio Giffoni',
  email: 'alfacontabilidade81@gmail.com',
  phone: {
    display: '(12) 99167-1782',
    e164: '+5512991671782',
  },
  address,
  mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(`${address.street}, ${address.city} - ${address.state}, Brasil`)}&z=17&hl=pt-BR&output=embed`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.city} - ${address.state}`,
  )}`,
} as const;

/** Anos de atuação, recalculados a cada build. */
export const yearsActive = new Date().getFullYear() - site.foundingYear;

/** Link do WhatsApp da ALFA com a mensagem já preenchida. */
export function waLink(text?: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text || whatsappGreeting)}`;
}

/** Atributos de um link de WhatsApp que abre em nova aba: `<a {...wa('Olá!')}>`. */
export function wa(text?: string) {
  return { href: waLink(text), target: '_blank', rel: 'noopener' };
}

/** Caminho de um arquivo em `public/` ou de uma âncora da home, respeitando o `base` do GitHub Pages. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export const nav = [
  { href: '#a-alfa', label: 'A Alfa' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#como-atendemos', label: 'Como atendemos' },
  { href: '#escritorio', label: 'Escritório' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;
