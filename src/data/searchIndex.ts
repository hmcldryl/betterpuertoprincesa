export interface SearchItem {
  id: string;
  title: string;
  category:
    | 'Service'
    | 'Market'
    | 'Hotline'
    | 'Transparency'
    | 'Government'
    | 'Tool'
    | 'Landmark';
  description: string;
  url: string;
  keywords: string[];
}

export const searchIndex: SearchItem[] = [
  // Public Markets
  {
    id: 'market-old-malvar',
    title: 'Puerto Princesa City Public Market (Old Market / Malvar)',
    category: 'Market',
    description:
      'Central downtown public market for fresh seafood, meats, fruits, vegetables, and native goods.',
    url: '/markets#old-market-malvar',
    keywords: [
      'palengke',
      'malvar',
      'old market',
      'isda',
      'fresh fish',
      'seafood',
      'downtown',
      'stall',
      'talipapa',
    ],
  },
  {
    id: 'market-new-san-jose',
    title: 'San Jose New Market & Commercial Center',
    category: 'Market',
    description:
      'Premier wholesale agricultural bagsakan and retail market adjacent to San Jose Transport Terminal.',
    url: '/markets#new-market-san-jose',
    keywords: [
      'palengke',
      'san jose',
      'new market',
      'bagsakan',
      'terminal',
      'gulay',
      'wholesale',
      'bigas',
    ],
  },
  {
    id: 'market-santa-monica',
    title: 'Santa Monica Community Market (Talipapa)',
    category: 'Market',
    description:
      'Suburban fresh market serving Santa Monica, BM Road, and Sicsican residents.',
    url: '/markets#santa-monica-talipapa',
    keywords: [
      'palengke',
      'santa monica',
      'talipapa',
      'bm road',
      'fresh goods',
    ],
  },
  {
    id: 'market-irawan',
    title: 'Irawan Agri-Bagsakan & Farmers Market',
    category: 'Market',
    description:
      'Direct-from-farmer fresh produce, root crops, honey, and vegetables near City Hall.',
    url: '/markets#irawan-agri-market',
    keywords: [
      'palengke',
      'irawan',
      'bagsakan',
      'farmers',
      'gulay',
      'honey',
      'city hall',
    ],
  },
  {
    id: 'market-mandaragat',
    title: 'Mandaragat / Bagong Silang Fish Landing Market',
    category: 'Market',
    description:
      'Early morning coastal fish landing where municipal fisherfolk sell directly off fishing boats.',
    url: '/markets#mandaragat-fish-landing',
    keywords: [
      'palengke',
      'mandaragat',
      'fish landing',
      'bulungan',
      'seafood',
      'banca',
      'isda',
    ],
  },
  {
    id: 'market-stall-rental',
    title: 'Public Market Stall Rental & CEED Lease Application',
    category: 'Market',
    description:
      'How to apply for a market stall, requirements, and monthly payment through Filipizen.',
    url: '/markets#stall-guidelines',
    keywords: [
      'rent stall',
      'palengke pwesto',
      'ceed',
      'filipizen',
      'lease',
      'market rental',
    ],
  },

  // Tools
  {
    id: 'tool-fare-calculator',
    title: 'Tricycle Fare Calculator',
    category: 'Tool',
    description:
      'Estimate a tricycle fare from your trip distance, with 20% off for seniors, PWDs and students.',
    url: '/fare-calculator',
    keywords: [
      'tricycle',
      'fare',
      'pamasahe',
      'taripa',
      'trike',
      'discount',
      'student',
      'senior',
    ],
  },

  // Key Services
  {
    id: 'service-business-permits',
    title: 'Apply for Barangay Clearance and Mayor’s Business Permits',
    category: 'Service',
    description:
      'Step-by-step process for registering a new business or renewing permits in Puerto Princesa.',
    url: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
    keywords: [
      'business permit',
      'mayor permit',
      'bplo',
      'clearance',
      'negosyo',
      'dti',
      'sec',
      'bir',
    ],
  },
  {
    id: 'service-renew-business-tax',
    title: 'Renew Permits and Pay Local Business Taxes',
    category: 'Service',
    description:
      'Renewing your business permit and paying local business taxes, including online payment through Filipizen.',
    url: '/services/business/renew-permits-and-pay-local-business-taxes',
    keywords: [
      'renew business',
      'business tax',
      'filipizen',
      'buwis',
      'cedula',
      'amendment',
    ],
  },
  {
    id: 'service-free-checkups',
    title: 'Get Free Check-ups, Basic Medicines, and Vaccines',
    category: 'Service',
    description:
      'Free consultations, basic medicines, and vaccines at city and barangay health centers.',
    url: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
    keywords: [
      'checkup',
      'gamot',
      'bakuna',
      'health center',
      'libre',
      'konsulta',
      'doktor',
    ],
  },
  {
    id: 'service-maternal-child',
    title: 'Access Maternal Care and Child Immunization',
    category: 'Service',
    description: 'Prenatal check-ups and immunization for children.',
    url: '/services/health-services/access-maternal-care-and-child-immunization',
    keywords: [
      'buntis',
      'bakuna sanggol',
      'prenatal',
      'immunization',
      'nutrition',
      'nanay',
    ],
  },
  {
    id: 'service-hospital-confinement',
    title: 'Go to Local Hospital for Treatment or Confinement',
    category: 'Service',
    description: 'Getting treatment or confinement at Ospital ng Palawan.',
    url: '/services/health-services/go-to-the-local-hospital-for-treatment-or-confinement',
    keywords: [
      'ospital',
      'hospital',
      'onp',
      'malasakit center',
      'emergency room',
      'admit',
    ],
  },
  {
    id: 'service-senior-pwd-solo',
    title: 'Apply for Senior Citizen, Solo Parent, or PWD Assistance',
    category: 'Service',
    description:
      'Applying for assistance as a senior citizen, solo parent, or person with disability.',
    url: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
    keywords: [
      'senior citizen',
      'pwd',
      'solo parent',
      'ra 11861',
      'cswdo',
      'ayuda',
      'diskwento',
    ],
  },
  {
    id: 'service-scholarships',
    title: 'Apply for Local City Scholarships',
    category: 'Service',
    description:
      'Educational assistance and college scholarship grants for Puerto Princesa students.',
    url: '/services/education/apply-for-local-scholarships',
    keywords: [
      'scholarship',
      'iskolar',
      'edukasyon',
      'college',
      'tuition',
      'estudyante',
    ],
  },
  {
    id: 'service-zoning-building',
    title: 'Request Zoning, Land Use, or Building Permits',
    category: 'Service',
    description:
      'City Engineering and Zoning Office requirements for constructing homes or commercial structures.',
    url: '/services/housing-land-use/request-zoning-land-use-or-building-permits',
    keywords: [
      'building permit',
      'zoning',
      'locational clearance',
      'engineering',
      'bahay',
      'patayo',
    ],
  },

  // Transparency & Data
  {
    id: 'transparency-budget',
    title: 'Budget Transparency & National Tax Allotment',
    category: 'Transparency',
    description:
      'Puerto Princesa FY2026 budget allocations, 10-year budget history, and official Full Disclosure reports.',
    url: '/transparency',
    keywords: [
      'budget',
      'transparency',
      'pera ng bayan',
      'nta',
      'disaster fund',
      'appropriations',
      'gao',
    ],
  },
  {
    id: 'transparency-dpwh',
    title: 'DPWH Infrastructure Projects Tracker',
    category: 'Transparency',
    description:
      'Tracking flood control, roads, bridges, and public facility construction projects in Puerto Princesa.',
    url: '/transparency',
    keywords: [
      'dpwh',
      'flood control',
      'kalsada',
      'tulay',
      'drainage',
      'projects',
      'kontrata',
    ],
  },
  {
    id: 'transparency-mining',
    title: 'Palawan Mining Watch & Forest Loss',
    category: 'Transparency',
    description:
      'Interactive map of mining concessions, 2025 moratorium analysis, tree cover loss data, and investigations.',
    url: '/mining-watch',
    keywords: [
      'mining',
      'nickel',
      'mina',
      'palawan mining',
      'moratorium',
      'forest loss',
      'bataraza',
      'rio tuba',
    ],
  },
  {
    id: 'statistics-demographics',
    title: 'City Statistics & 66-Barangay Population Map',
    category: 'Transparency',
    description:
      '2024 PSA Census population (316,384), land area, DTI CMCI competitiveness rankings, and interactive map.',
    url: '/statistics',
    keywords: [
      'populasyon',
      'population',
      'statistics',
      'barangay',
      'cmci',
      'census',
      'psa',
    ],
  },

  // Landmark & Government
  {
    id: 'landmark-prinsesa',
    title: 'Ang Prinsesa ng Baybay Landmark',
    category: 'Landmark',
    description:
      'The story, Tagbanua cultural heritage, trivia, and location of the statue at the Puerto Princesa Baywalk.',
    url: '/prinsesa-ng-baybay',
    keywords: [
      'prinsesa ng baybay',
      'baywalk',
      'statue',
      'monument',
      'tagbanua',
      'tourist',
      'kasaysayan',
    ],
  },
  {
    id: 'gov-executive',
    title: 'City Mayor and Executive Department',
    category: 'Government',
    description:
      'Office of the City Mayor Lucilo R. Bayron, executive initiatives, and community assistance programs.',
    url: '/government/departments/executive',
    keywords: ['mayor', 'lucilo bayron', 'city hall', 'executive', 'alkalde'],
  },
  {
    id: 'gov-legislative',
    title: 'Sangguniang Panlungsod (City Council)',
    category: 'Government',
    description:
      'City legislative councilors, Vice Mayor presiding officer, ordinances, and public session details.',
    url: '/government/departments/legislative',
    keywords: [
      'city council',
      'sangguniang panlungsod',
      'vice mayor',
      'councilor',
      'ordinansa',
    ],
  },
  {
    id: 'service-utility-advisories',
    title: 'PALECO & PPCWD Utility Advisories',
    category: 'Service',
    description:
      'Latest PALECO power advisories and PPCWD water advisories in one place, refreshed every 30 minutes.',
    url: '/advisories',
    keywords: [
      'paleco',
      'ppcwd',
      'brownout',
      'blackout',
      'power outage',
      'water interruption',
      'water cut',
      'advisory',
      'feeder',
      'kuryente',
      'tubig',
      'electric cooperative',
      'water district',
      'scheduled interruption',
    ],
  },
  {
    id: 'service-paleco-outages',
    title: 'PALECO Power Advisories & Outage Schedule',
    category: 'Service',
    description:
      'Power interruptions, restorations, and scheduled maintenance posted by Palawan Electric Cooperative.',
    url: '/advisories',
    keywords: [
      'paleco',
      'brownout schedule',
      'power outage',
      'kuryente',
      'blackout',
      'feeder 1',
      'feeder 2',
      'feeder 3',
      'recloser',
      'line clearing',
      'warriors of light',
    ],
  },
  {
    id: 'service-ppcwd-water-advisories',
    title: 'PPCWD Water Advisories & Pipeline Interruptions',
    category: 'Service',
    description:
      'Water interruptions and announcements posted by Puerto Princesa City Water District.',
    url: '/advisories',
    keywords: [
      'ppcwd',
      'tubig',
      'water interruption',
      'low pressure',
      'water leak',
      'water district',
      'transmission line',
      'montible',
      'maoyon',
      'water tank',
    ],
  },
  {
    id: 'tool-minimum-wage',
    title: 'Minimum Wage in Puerto Princesa',
    category: 'Tool',
    description:
      'Current MIMAROPA minimum wage for private sector and domestic workers, with an overtime and holiday pay calculator.',
    url: '/minimum-wage',
    keywords: [
      'minimum wage',
      'sahod',
      'sweldo',
      'kasambahay',
      'overtime',
      'holiday pay',
      'dole',
      'wage order',
    ],
  },
];
