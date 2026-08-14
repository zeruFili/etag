// Expertise page data — three stacked sections.
export const expertisePage = {
  title: 'EXPERTISE',
  intro: 'Every line is a decision, Every decision is a feeling',
  sections: [
    {
      id: 'design',
      step: '01.',
      name: 'DESIGN',
      headline: 'Design begins with an idea, a possibility shaped through exploration and intent',
      description:
        'At ETAG Interiors, we begin every project with a possibility; we carefully examine it, question it, and transform it into a clear and buildable design language.',
      details: [
        {
          title: 'Design Process',
          text: 'Our design process begins by reading the space as a whole. Physical boundaries, surroundings, cultural context, and the identity the brand needs to represent are evaluated together. Before reaching conclusions, we observe, analyze, and listen; as a result, each project is designed to respond accurately to its environment and functional purpose.',
        },
        {
          title: 'Concept Development',
          text: 'Ideas are developed through exploration rather than assumption. Function, scale, circulation and spatial experience are questioned to form concepts that are both expressive and technically grounded. Trends are interpreted to create original, contemporary, and long-lasting design solutions.',
        },
        {
          title: 'Material & Detail Research',
          text: 'Materials are not selected solely for visual effect. Every surface, texture, and detail is evaluated in terms of technical performance, durability, budget, and applicability. This approach ensures that innovative ideas remain realistic and buildable.',
        },
        {
          title: 'Collaborative Design Process',
          text: 'At ETAG Interiors, design is a collective practice. Our architectural and interior design team, composed of experienced and skilled professionals, works collaboratively on projects of different scales and across various geographies. Communication and coordination ensure consistency at every stage of the process. Our methodology supports a smooth transition from concept to implementation. Through detailed design documentation and controlled workflows, we maintain clarity and precision as ideas evolve into built spaces from the first sketch to the final detail.',
        },
      ],
      gallery: [
        { category: 'RETAIL', title: 'BOLE FASHION BOUTIQUE', media: { type: 'image', src: 'https://media.yoointerior.com/assets/expertise/sections/1778153779069-molu-390x520.jpg' } },
        { category: 'HOSPITALITY', title: 'OLEA ROOFTOP BAR', media: { type: 'video', src: 'https://media.yoointerior.com/assets/expertise/sections/1778153735709-olea-390-x-520.mp4' } },
      ],
    },
    {
      id: 'build',
      step: '02.',
      name: 'BUILD',
      headline: 'If a building becomes architecture, then it is art',
      description:
        'At ETAG Interiors, build is the stage where ideas are realized through experience, coordination, effective time management, and care. We transform the design process into targeted interior environments by combining our technical expertise, long-standing collaborations with hundreds of brands, proven delivery quality in high-end projects, and our experienced in-house teams.',
      details: [
        {
          title: '360-Degree Build Approach',
          text: 'At ETAG Interiors, we provide a 360-degree build service covering every phase of the construction process. On-site analysis, technical controls, a dedicated experienced team, coordination, and turnkey implementation are managed with clarity and responsibility. Throughout this process, the brands we work with are able to monitor every stage of the project through the ERP system developed in-house by ETAG Interiors. Our detailed and project-specific site reports ensure clients remain fully informed and closely involved, as if they were present on site throughout the entire process.',
        },
        {
          title: 'On-Site Expertise',
          text: 'At the core of our build process are our in-house site and construction teams. Experienced in delivering turnkey commercial interior projects, our teams take an active role throughout the entire implementation phase, ensuring continuity, control, and execution quality on site.',
        },
        {
          title: 'Coordination Control',
          text: 'By undertaking full coordination across all disciplines, we simplify complex and demanding processes for the brands we work with. This experience ensures consistency between design intent, technical requirements, and on-site execution.',
        },
        {
          title: 'Built for Performance',
          text: 'Operational needs, quality, performance, and budget are balanced throughout the build phase. The result is durable, functional, and user-focused spaces delivered with precision and long-term value.',
        },
      ],
      gallery: [
        { category: 'OFFICE', title: 'ADDIS TOWER CORPORATE OFFICE', media: { type: 'video', src: 'https://media.yoointerior.com/assets/expertise/sections/1778153996061-thy-390-x-520.mp4' } },
        { category: 'F&B', title: 'LAKARA RESTAURANT', media: { type: 'image', src: 'https://media.yoointerior.com/assets/expertise/sections/1778154176844-nobu-390x520.jpg' } },
      ],
    },
    {
      id: 'design-build',
      step: '03.',
      name: 'DESIGN + BUILD',
      headline: 'Design + Build = Time',
      description:
        'In projects where design and build are carried out together, there is one critical factor: time management. Effective time management is shaped through experience, planning, and strong coordination.\n\nAt ETAG Interiors, design and construction progress as a single, continuous process from the first idea to final delivery. This integrated approach ensures that decisions are implemented at the right time, in the right place, and in the right way.',
      details: [
        {
          title: 'Planning',
          text: 'At ETAG Interiors, each project is managed by a dedicated project manager who oversees the entire process from start to finish. Managing design and build together allows decisions to move consistently, accurately, and under control from concept through to on-site execution.',
        },
        {
          title: 'Coordination',
          text: 'Through the coordination capability that comes from our teams working closely together, we effectively manage suppliers, prevent time losses that may occur between design and construction phases, and carry out simultaneous site planning. By structuring projects in phases, we establish a controlled and efficient workflow. As a result, well-planned processes enable projects to progress smoothly, even within demanding schedules.',
        },
        {
          title: 'Execution',
          text: 'The strength created by bringing design and build teams together under one roof is clearly reflected during delivery. Seeing the initial ideas discussed at the table fully realized on site is a key outcome of our process. Through this integrated approach, ETAG Interiors has successfully delivered hundreds of turnkey projects across luxury retail, office, and hospitality environments.',
        },
      ],
      gallery: [
        { category: 'Office', title: 'CMC GREEN CAMPUS', media: { type: 'image', src: 'https://media.yoointerior.com/assets/expertise/sections/1778154584059-tam-390x520.jpg' } },
        { category: 'F&B', title: 'GENET RESTAURANT', media: { type: 'video', src: 'https://media.yoointerior.com/assets/expertise/sections/1778154720268-nuup-390-x-520.mp4' } },
      ],
    },
  ],
}

// Home expertise tab content.
export const homeExpertise = [
  {
    id: 'design',
    label: 'DESIGN',
    headline: 'Design begins with an idea, a possibility shaped through exploration and intent',
    accentWords: ['exploration', 'intent.'],
    cta: 'MORE DETAIL',
    href: '/expertise',
  },
  {
    id: 'build',
    label: 'BUILD',
    headline: 'If a building becomes architecture, then it is art.',
    accentWords: ['architecture,', 'art.'],
    cta: 'MORE DETAIL',
    href: '/expertise',
  },
  {
    id: 'design-build',
    label: 'DESIGN + BUILD',
    headline: 'Design + Build = Time',
    accentWords: ['Time'],
    cta: 'MORE DETAIL',
    href: '/expertise',
  },
]
