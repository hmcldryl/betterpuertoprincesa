export interface Hotline {
  label: string;
  number: string;
  tel: string;
}

// Sourced from the BetterPuertoPrincesa.org civic project's verified hotline
// list (github.com/BetterPuertoPrincesa/BetterPuertoPrincesa) — worth
// re-confirming with the CDRRMO before treating as current.
export const hotlines: Hotline[] = [
  { label: '911', number: '0927 797 2009', tel: '09277972009' },
  { label: 'Police', number: '0917 311 5746', tel: '09173115746' },
  { label: 'Fire', number: '0964 945 2971', tel: '09649452971' },
  { label: 'CDRRMO', number: '0965 314 8399', tel: '09653148399' },
  { label: 'Hospital', number: '0927 133 8635', tel: '09271338635' },
];

export interface ContactNumber {
  label?: string;
  number: string;
  tel: string;
}

export interface DirectoryContact {
  id: string;
  category: 'emergency' | 'police' | 'hospital' | 'utility' | 'environment';
  name: string;
  description: string;
  numbers: ContactNumber[];
  source: { name: string; url?: string };
}

const cityHotlineList = {
  name: "BetterPuertoPrincesa.org's verified hotline list",
};

const quickHotline = (label: string) => {
  const h = hotlines.find(item => item.label === label);
  if (!h) throw new Error(`Missing hotline: ${label}`);
  return { number: h.number, tel: h.tel };
};

// Every number here has a source. Leave a contact out rather than guess.
export const emergencyDirectory: DirectoryContact[] = [
  {
    id: '911',
    category: 'emergency',
    name: 'Emergency Hotline 911',
    description: 'Medical, fire, police, and rescue emergencies.',
    numbers: [quickHotline('911')],
    source: cityHotlineList,
  },
  {
    id: 'cdrrmo',
    category: 'emergency',
    name: 'City Disaster Risk Reduction and Management Office (CDRRMO)',
    description: 'Disaster response, rescue, and evacuation.',
    numbers: [quickHotline('CDRRMO')],
    source: cityHotlineList,
  },
  {
    id: 'fire',
    category: 'emergency',
    name: 'Bureau of Fire Protection',
    description: 'Fires and fire-related emergencies.',
    numbers: [quickHotline('Fire')],
    source: cityHotlineList,
  },
  {
    id: 'police',
    category: 'police',
    name: 'Police',
    description: 'Crimes, accidents, and other police matters.',
    numbers: [quickHotline('Police')],
    source: cityHotlineList,
  },
  {
    id: 'hospital',
    category: 'hospital',
    name: 'Hospital',
    description: 'Hospital emergency line.',
    numbers: [quickHotline('Hospital')],
    source: cityHotlineList,
  },
  {
    id: 'paleco',
    category: 'utility',
    name: 'PALECO (Palawan Electric Cooperative)',
    description:
      'Power outages, service requests, and other electricity concerns.',
    numbers: [
      { number: '0917 553 2836', tel: '09175532836' },
      { number: '0908 892 6584', tel: '09088926584' },
      { number: '(048) 433-2001', tel: '0484332001' },
    ],
    source: {
      name: 'PALECO advisory, Oct 25, 2026',
      url: 'https://paleco.net/paleco/paleco-info-10-25-26-722-pm/',
    },
  },
  {
    id: 'ppcwd',
    category: 'utility',
    name: 'Puerto Princesa City Water District (PPCWD)',
    description: 'Water interruptions, leaks, low pressure, and billing.',
    numbers: [
      { label: 'Hotline', number: '(048) 433-2408', tel: '0484332408' },
      { label: 'Textline', number: '0917 310 5282', tel: '09173105282' },
      { label: 'Textline', number: '0961 586 7294', tel: '09615867294' },
    ],
    source: { name: 'ppcwater.gov.ph', url: 'https://ppcwater.gov.ph/' },
  },
  {
    id: 'pcsd',
    category: 'environment',
    name: 'Palawan Council for Sustainable Development (PCSD)',
    description:
      'Report or turn over rescued wildlife, and report environmental violations.',
    numbers: [
      { label: 'Front desk', number: '0935 116 2336', tel: '09351162336' },
      { label: 'Front desk', number: '0948 937 2200', tel: '09489372200' },
      {
        label: 'Wildlife Enforcement Unit',
        number: '0931 964 2128',
        tel: '09319642128',
      },
      {
        label: 'Wildlife Enforcement Unit',
        number: '0965 662 0248',
        tel: '09656620248',
      },
    ],
    source: {
      name: 'PCSD, Jun 30, 2022',
      url: 'https://pcsd.gov.ph/concerned-citizens-turn-over-crested-serpent-eagle-and-pangolin-to-pcsd/',
    },
  },
];
