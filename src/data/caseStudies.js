// Case study data — listing + detail pages.
export const caseStudies = [
  {
    slug: 'new-era-hakkasan',
    title: 'HAKKASAN',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778774998885-3.jpg',
    hero: 'https://media.yoointerior.com/assets/case-study/detail/1778774968246-1.jpg',
    client: 'HAKKASAN GROUP',
    city: 'BODRUM, TURKEY',
    year: '2021',
    expertise: 'Design+Build',
    area: '810 SQM',
    intro: 'We at ETAG Architecture, are proud of being the architecture firm and interior design office that has undertaken the construction and design of the first summer location of Hakkasan, a worldwide known chain of luxury restaurants, modernizing and introducing the Chinese cuisine.',
    sections: [
      {
        title: 'Overview',
        text: 'We at ETAG Architecture, are proud of being the architecture firm and interior design office that has undertaken the construction and design of the first summer location of Hakkasan, a worldwide known chain of luxury restaurants, modernizing and introducing the Chinese cuisine. Hakkasan is getting ready for taking its place at Mandarin Oriental, one of the most eye-catching locations in Bodrum. ETAG Architecture has constructed this restaurant, which will be located in an area of 810 m2 at the seaside, and as the architectural designer, created a summer location prototype for Hakkasan in cooperation with Campbell House, a London-based company.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778774991638-2.jpg',
        ],
      },
      {
        title: '',
        text: 'We have created a special concept design for this restaurant in order to make the restaurant\u2019s architectural design a part of the service offered by Hakkasan for its customers from all over the world. In this concept, in order to properly apply our experience and know-how in this area, we have given particular importance to the traditional patterns that represent the corporate identity of Hakkasan, specially chosen lightning materials, wine cellars and artworks. The iconic furniture of this chain of restaurants has been specially adapted for Hakkasan Bodrum.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778774998885-3.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775240297-4.jpg',
        ],
      },
      {
        title: '',
        text: 'We have mostly used wooden materials so that Hakkasan on the seaside behind the mountains could be in harmony with the area it is located. This preference has been supported by metal parts. The ambience created in this manner makes the moments spent at Hakkasan more valuable for the guests.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778775295977-6.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775455069-slot5.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775331970-7.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775346044-8.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775378430-9.jpg',
        ],
      },
    ],
    prev: { label: 'THE POPULIST', slug: 'populist' },
    next: { label: 'BEYMEN ADANA', slug: 'beymen-adana' },
  },
  {
    slug: 'beymen-adana',
    title: 'BEYMEN ADANA',
    category: 'Retail',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771662065-177790-3.jpg',
  },
  {
    slug: 'representative-japanese-cuisine-bodrum-ioki-beach',
    title: 'IOKI ON THE BEACH',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771237136--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'istanbul-tradition-bodrum-lucca-sea',
    title: 'LUCCA BY THE SEA',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771008022--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'chakra',
    title: 'CHAKRA',
    category: 'Retail',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778770715760-1778505574536-3.g-rsel-816-1088.webp',
  },
  {
    slug: 'co-working-space-design-venue-changed-understanding-doing-work-ana-tolian-side-istanbul-kolektif-house',
    title: 'KOLEKTIF HOUSE ATASEH\u0130R',
    category: 'Office',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778770287116--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'basbug-automotive',
    title: 'BA\u015eBU\u011e AUTOMOTIVE',
    category: 'Office',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778769135643--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'salon-angie',
    title: 'SALON ANGIE',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778768910579-1778661423804-2.-go-rsel-1632-794.webp',
  },
  {
    slug: 'd-maris-kitchen',
    title: 'D MARIS KITCHEN',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778768154926--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'd-maris-bay-lounge',
    title: 'D MARIS BAY LOUNGE',
    category: 'Hospitality',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778752815831--3.g-rsel-816-1088.webp',
  },
]

// Fallback detail body generator for case studies without a full CMS payload.
export function buildCaseStudyDetail(cs) {
  const gallery = [cs.image]
  return {
    ...cs,
    hero: cs.hero || cs.image,
    intro: cs.intro || `${cs.title} — a project by ETAG Interiors.`,
    sections: cs.sections || [
      {
        title: 'Overview',
        text: `${cs.title} represents a milestone in the ${cs.category.toLowerCase()} category, delivered by ETAG Interiors with technical precision and careful execution.`,
        images: gallery,
      },
    ],
    prev: cs.prev || null,
    next: cs.next || null,
  }
}
