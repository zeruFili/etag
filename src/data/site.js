// Site-wide configuration and shared data (footer, menu, socials).
export const site = {
  name: 'ETAG',
  title: 'ETAG',
  url: 'https://etaginteriors.com',
  accent: '#a63437',
}

export const navLinks = [
  { label: 'EXPERTISE', href: '/expertise' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export const menuLinks = [
  { label: 'Expertise', href: '/expertise' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const menuCards = [
  { title: 'Design', to: { path: '/projects', query: { expertise: 'Design' } }, media: 'https://media.yoointerior.com/assets/menu/Design1.mp4' },
  { title: 'Build', to: { path: '/projects', query: { expertise: 'Build' } }, media: 'https://media.yoointerior.com/assets/menu/Build2.mp4' },
  { title: 'Design + Build', to: { path: '/projects', query: { expertise: 'Design + Build' } }, media: 'https://media.yoointerior.com/assets/menu/1777315053194-design-build-3c675496.mp4' },
]

export const socialLinks = [
  { label: 'Facebook', href: 'https://web.facebook.com/EtagInteriorAndBranding/?_rdc=1&_rdr#' },
  { label: 'Instagram', href: 'https://www.instagram.com/etag_interiors/' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/company/etag-engineering-plc/' },
  { label: 'Youtube', href: 'https://www.youtube.com/@etag7118' },
]

export const legalLinks = [
  { label: 'Information Disclosure Text On Cameras', href: '/kvkk/information-disclosure-text-on-cameras' },
  { label: 'Express Consent Statement For Customers On Data Transfer Abroad', href: '/kvkk/express-consent-statement-for-customers-on-data-transfer-abroad' },
  { label: 'Information Disclosure Text For Customers Within The Scope Of Lppd', href: '/kvkk/information-disclosure-text-for-customers-within-the-scope-of-lppd' },
  { label: 'Cookie Policy', href: '/kvkk/cookie-policy' },
  { label: 'Text Of Consent For Commercial Electronic Messages', href: '/kvkk/text-of-consent-for-commercial-electronic-messages' },
]

export const footerInfo = {
  lineOne: 'ETAG INTERIORS ',
  lineTwo: '\u00a92026 ETAG INTERIORS, ALL RIGHTS RESERVED.',
}

export const assets = {
  topLine: 'https://yoointerior.com/assets/footer/top-line.svg',
  heroVideo: `${import.meta.env.BASE_URL}hero.mp4`,
}
