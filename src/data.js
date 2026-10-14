export const official = 'https://fwegb.gov.pk';
export const page = (path) => `${official}/${path}/`;
export const file = (path) => `${official}/wp-content/uploads/${path}`;
export const nav = [
  { label: 'Home', href: '#home' },
  {
    label: 'About Us',
    links: [
      ['About the Department', 'about-us'],
      ['Minister', 'minister'],
      ['Secretary', 'secretary'],
      ['Organizational Structure', 'organogram'],
    ],
  },
  {
    label: 'Attached Departments',
    links: [
      ['Forest', 'forest'],
      ['Parks & Wildlife', 'parks-and-widlife'],
      ['Environmental Protection Agency', 'environment'],
    ],
  },
  {
    label: 'Legislation',
    links: [
      ['Acts', 'acts'],
      ['Rules', 'rules'],
      ['Policies', 'policies'],
      ['Procedures', 'procedures'],
    ],
  },
  {
    label: 'Development Portfolio',
    links: [
      ['Annual Development Programme (ADP)', 'adp'],
      ['Public Sector Development Programme (PSDP)', 'psdp'],
      ['Ten Billion Trees Tsunami Programme', 'tbttp'],
      ['GLOF-II', 'glof-ll'],
      ['Chilgoza Forest Project', 'chilgoza'],
    ],
  },
  {
    label: 'Maps',
    links: [
      ['Forest Land Use', 'forest-land-use-maps'],
      ['National Parks', 'national-parks-map'],
      ['Plantations & Nurseries', 'plantations-nurseries'],
      ['Wildlife Species', 'wildlife-maps'],
    ],
  },
  {
    label: 'Advertisements',
    links: [
      ['Tenders', 'tender'],
      ['Press Releases', 'press-release'],
      ['Careers', 'career'],
    ],
  },
  {
    label: 'Publications',
    links: [
      ['Publications', 'publications'],
      ['Reports', 'reports'],
    ],
  },
  { label: 'Contact Us', href: '#contact' },
];
export const solar = {
  title: 'Solar power & surveillance systems for forest check posts',
  fullTitle:
    'Supply, installation & commissioning of solar power and surveillance systems, including relocation of existing systems at multiple forest check posts across Gilgit-Baltistan',
  date: '2026-04-20',
  category: 'Tender',
  href: file('2026/04/Advertisement.pdf'),
  description:
    'Supply, installation and commissioning, including relocation of existing systems at forest check posts across Gilgit-Baltistan.',
  pdf: true,
};
export const plants = {
  title: 'Supply and procurement of forest plants',
  fullTitle: 'Expression of Interest for Supply and Procurement of Forest Plants',
  date: '2025-12-24',
  category: 'Department news',
  href: page('2025/12/24/expression-of-interest-for-supply-and-procurement-of-forest-plants'),
  description: 'Expression of interest published by the Forest, Wildlife & Environment Department.',
};
export const spring = {
  title: 'Spring tree plantation 2024',
  fullTitle: 'Public Notice for Spring Tree Plantation 2024',
  date: '2024-02-13',
  category: 'Public notice',
  href: page('2024/02/13/public-notice-for-spring-tree-plantation-2024'),
  description: 'Public notice on plant distribution for the spring tree plantation drive.',
};
export const updates = {
  News: [solar, plants, spring],
  'Public Notices': [spring],
  Tenders: [
    solar,
    {
      title: 'Expression of interest for wildlife census / surveys',
      date: '2025-12-31',
      category: 'Tender',
      href: page('2025/12/31/expression-of-interest-for-wildlife-census-surveys'),
      description: 'Official invitation for wildlife census and survey services.',
    },
  ],
  Jobs: [],
};
export const resources = {
  'Reports & Publications': [
    {
      title: 'Wetlands & Lakes of Baltistan',
      detail: 'Study report · 2023',
      href: file('2023/11/Wetlands-of-Baltistan.pdf'),
    },
    {
      title: 'Forest Carbon Inventory of Gilgit-Baltistan',
      detail: 'Forest resources · Inventory report · 2017',
      href: file('2022/01/INVENTORY-REPORT-GILGIT-BALTISTAN-FINAL.pdf'),
    },
    {
      title: 'Biomass & Carbon Tables',
      detail: 'Major tree species of Gilgit-Baltistan',
      href: file('2022/01/BIOMASS-TABLES-OF-CONIFEROUS-SPECIES-OF-GILGIT-BALTISTAN-Revised-1.pdf'),
    },
  ],
  Guidelines: [
    {
      title: 'Trophy Hunting Guidelines',
      detail: 'Community-based sustainable use · English',
      href: file('2021/12/Tropy-Hunting-Guidelines-English.pdf'),
    },
    {
      title: 'Environmental Assessment Procedures',
      detail: 'Filing, review and approval of environmental reports',
      href: file('2021/12/Filing_review_and_approval_of_Env_Reports-.pdf'),
    },
  ],
  'Acts & Rules': [
    {
      title: 'Gilgit-Baltistan Forest Act, 2019',
      detail: 'Official gazette · Forest legislation',
      href: file('2025/03/GB-Forest-Act-2019.pdf'),
    },
    {
      title: 'Northern Areas Wildlife Act, 1975',
      detail: 'Wildlife protection · Act',
      href: file('2022/01/NA-Wildliffe-Act-1975.pdf'),
    },
    {
      title: 'Environmental Protection Act, 2014',
      detail: 'Gilgit-Baltistan · Environmental legislation',
      href: file('2022/01/Environmental_Act_Final_2014-1.pdf'),
    },
  ],
};
export const departments = [
  {
    title: 'Forest',
    kicker: 'RESTORE & SUSTAIN',
    image: 'fairy-meadows.jpg',
    alt: 'Conifer forests below Nanga Parbat at Fairy Meadows',
    icon: 'trees',
    description:
      'Conserving natural forests, restoring landscapes and supporting sustainable forestry with local communities.',
    href: page('forest'),
  },
  {
    title: 'Parks & Wildlife',
    kicker: 'PROTECT & CONSERVE',
    image: 'markhor.jpg',
    alt: 'Female markhor in its mountain habitat',
    icon: 'wildlife',
    description:
      'Safeguarding wildlife and their habitats through protected areas and community-led conservation.',
    href: page('parks-and-widlife'),
  },
  {
    title: 'Environment',
    kicker: 'SAFEGUARD & IMPROVE',
    image: 'deosai.jpg',
    alt: 'Wildflowers and Sheosar Lake in Deosai National Park',
    icon: 'leaf',
    description:
      'Protecting our environment, preventing pollution and promoting sustainable development across the region.',
    href: page('environment'),
  },
];
export const searchItems = [
  ...nav.flatMap(
    (n) => n.links?.map(([title, path]) => ({ title, href: page(path), category: n.label })) || [],
  ),
  ...Object.entries(resources).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category, pdf: true })),
  ),
  ...Object.values(updates)
    .flat()
    .filter((item, i, all) => all.findIndex((a) => a.href === item.href) === i)
    .map((item) => ({ ...item, title: item.fullTitle || item.title })),
  { title: 'Contact the Department', category: 'Contact', href: page('contact-us-2') },
];
