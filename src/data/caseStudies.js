// Case study data — listing + detail pages.
export const caseStudies = [
  {
    slug: 'new-era-genet-bole',
    title: 'GENET RESTAURANT',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778774998885-3.jpg',
    hero: 'https://media.yoointerior.com/assets/case-study/detail/1778774968246-1.jpg',
    client: 'GENET HOSPITALITY GROUP',
    city: 'BOLE, ADDIS ABABA',
    year: '2021',
    expertise: 'Design+Build',
    area: '810 SQM',
    intro: 'ETAG Interiors is proud to have led the design and construction of Genet Restaurant, a flagship Ethiopian dining destination in the heart of Bole, reimagining traditional cuisine through a contemporary architectural language.',
    sections: [
      {
        title: 'Overview',
        text: 'ETAG Interiors is proud to have led the design and construction of Genet Restaurant, a flagship Ethiopian dining destination in the heart of Bole. The project, spanning 810 square metres, blends the warmth of traditional Ethiopian hospitality with a refined, modern interior. Working closely with the brand\u2019s representatives, our team translated the spirit of Ethiopian cuisine into a spatial experience where heritage and contemporary design meet.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778774991638-2.jpg',
        ],
      },
      {
        title: '',
        text: 'The concept places particular emphasis on locally sourced materials, handwoven textiles, and custom joinery inspired by Ethiopian patterns. Bespoke lighting, a striking wine and tej cellar, and commissioned artworks reinforce the restaurant\u2019s identity, while the mobile furniture was manufactured to the exacting standards of the venue\u2019s atmosphere.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778774998885-3.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775240297-4.jpg',
        ],
      },
      {
        title: '',
        text: 'We worked primarily in warm timbers, supported by brass and stone accents, so that the interior would sit naturally within its Addis Ababa surroundings. Generous dining areas, plant-divided private booths, and a carefully balanced lighting scheme make Genet Restaurant one of the most inviting addresses in the city.',
        images: [
          'https://media.yoointerior.com/assets/case-study/detail/1778775295977-6.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775455069-slot5.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775331970-7.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775346044-8.jpg',
          'https://media.yoointerior.com/assets/case-study/detail/1778775378430-9.jpg',
        ],
      },
    ],
    prev: { label: 'CAFE TO.MO.CA', slug: 'cafe-tomoca' },
    next: { label: 'HILLTOWN MALL RETAIL', slug: 'hilltown-mall-retail' },
  },
  {
    slug: 'hilltown-mall-retail',
    title: 'HILLTOWN MALL RETAIL',
    category: 'Retail',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771662065-177790-3.jpg',
  },
  {
    slug: 'kafeteeria-rooftop-bole',
    title: 'KAFETEERIA ROOFTOP',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771237136--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'lucy-lounge-kazanchis',
    title: 'LUCY LOUNGE',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778771008022--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'habesha-craft-retail',
    title: 'HABESHA CRAFT',
    category: 'Retail',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778770715760-1778505574536-3.g-rsel-816-1088.webp',
  },
  {
    slug: 'innovate-hub-coworking-cmc',
    title: 'INNOVATE HUB COWORKING',
    category: 'Office',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778770287116--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'gelila-motors-showroom',
    title: 'GELILA MOTORS SHOWROOM',
    category: 'Office',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778769135643--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'addis-ababa-hair-salon',
    title: 'ADDIS ABABA HAIR SALON',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778768910579-1778661423804-2.-go-rsel-1632-794.webp',
  },
  {
    slug: 'selam-kitchen-cafe',
    title: 'SELAM KITCHEN',
    category: 'F&B',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778768154926--3.g-rsel-816-1088.webp',
  },
  {
    slug: 'sheba-bay-lounge',
    title: 'SHEBA BAY LOUNGE',
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
