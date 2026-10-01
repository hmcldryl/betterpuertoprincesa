// Sourced from the BetterPuertoPrincesa.org civic project
// (github.com/BetterPuertoPrincesa/BetterPuertoPrincesa), data/*.json —
// real, cited figures. Do not fabricate or update without a source.

// Population updated to the 2024 Census of Population (PSA Special Release
// 2025-SR-107, "Official Population Count of the City of Puerto Princesa",
// released 26 Dec 2025, declared official via Proclamation No. 973 dated
// 11 July 2025):
// https://rssomimaropa.psa.gov.ph/content/official-population-count-city-puerto-princesa-2024-census-population
// Per-barangay figures (src/data/barangayPopulation.ts) are also 2024 —
// PSA's special release itemizes only the 10 most populous barangays, but
// the full 66-barangay breakdown is published in PSA's own PSGC registry:
// https://psa.gov.ph/classification/psgc/barangays/1731500000
export const demographics = {
  city: 'Puerto Princesa',
  province: 'Palawan',
  region: 'MIMAROPA (Region IV-B)',
  population: {
    total: 316384,
    year: 2024,
    source: 'PSA Census',
    sourceUrl:
      'https://rssomimaropa.psa.gov.ph/content/official-population-count-city-puerto-princesa-2024-census-population',
  },
  landAreaKm2: 2381.02,
  barangayCount: 66,
  incomeClass: '1st Class Highly Urbanized City',
  barangays: [
    'Babuyan',
    'Bacungan',
    'Bagong Bayan',
    'Bagong Pag-asa',
    'Bagong Sikat',
    'Bagong Silang',
    'Bahile',
    'Bancao-bancao',
    'Barangay ng mga Mangingisda',
    'Binduyan',
    'Buenavista',
    'Cabayugan',
    'Concepcion',
    'Inagawan',
    'Inagawan Sub-Colony',
    'Irawan',
    'Iwahig',
    'Kalipay',
    'Kamuning',
    'Langogan',
    'Liwanag',
    'Lucbuan',
    'Luzviminda',
    'Mabuhay',
    'Macarascas',
    'Magkakaibigan',
    'Maligaya',
    'Manalo',
    'Mandaragat',
    'Manggahan',
    'Maningning',
    'Maoyon',
    'Marufinas',
    'Maruyogon',
    'Masigla',
    'Masikap',
    'Masipag',
    'Matahimik',
    'Matiyaga',
    'Maunlad',
    'Milagrosa',
    'Model',
    'Montible',
    'Napsan',
    'New Panggangan',
    'Pagkakaisa',
    'Princesa',
    'Salvacion',
    'San Jose',
    'San Manuel',
    'San Miguel',
    'San Pedro',
    'San Rafael',
    'Santa Cruz',
    'Santa Lourdes',
    'Santa Lucia',
    'Santa Monica',
    'Seaside',
    'Sicsican',
    'Simpocan',
    'Tagabinit',
    'Tagburos',
    'Tagumpay',
    'Tanabag',
    'Tanglaw',
    'Tiniguiban',
  ],
};

export const competitiveIndex = {
  title: 'Puerto Princesa Competitive Index',
  description:
    'Annual competitiveness indicators measuring local economic performance',
  source:
    'Cities and Municipalities Competitiveness Index (CMCI), cmci.dti.gov.ph',
  overallRank: 16,
  year: 2024,
  pillars: [
    { name: 'Economic Dynamism', rank: 30, score: 2.7949 },
    { name: 'Government Efficiency', rank: 21, score: 10.3604 },
    { name: 'Infrastructure', rank: 8, score: 7.7017 },
    { name: 'Resiliency', rank: 13, score: 12.0957 },
    { name: 'Innovation', rank: 25, score: 7.2774 },
  ],
};

// Fiscal transparency data (budget breakdown, NTA, DPWH infrastructure
// projects) has moved to src/data/transparency.ts and is rendered on the
// /transparency page.
