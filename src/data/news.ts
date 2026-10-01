// Sourced from the BetterPuertoPrincesa.org civic project
// (github.com/BetterPuertoPrincesa/BetterPuertoPrincesa), data/news.json —
// real, cited articles with source URLs. Do not fabricate entries.

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  badge: 'info' | 'success' | 'warning';
  summary: string;
  url: string;
}

export const news: NewsItem[] = [
  {
    id: 'mayor-bayron-supports-lgsf-initiatives',
    title: 'Mayor Bayron Supports National Government Program Initiatives',
    date: '2026-03-06',
    category: 'Announcement',
    badge: 'info',
    summary:
      'Mayor Lucilo R. Bayron reaffirmed the support of the City Government of Puerto Princesa for national priority programs after participating in the Cities Information Session on the Local Government Support Fund (LGSF).',
    url: 'https://puertoprincesa.ph/articles/mayor-bayron-supports-national-government-program-initiatives/',
  },
  {
    id: 'puerto-princesa-cmci-2024-ranking',
    title: 'Puerto Princesa Ranked Among Most Competitive Cities in DTI Index',
    date: '2026-03-31',
    category: 'Announcement',
    badge: 'success',
    summary:
      'Puerto Princesa achieved a ranking of 16th overall among Highly Urbanized Cities in the Cities and Municipalities Competitiveness Index (CMCI) with a score of 40.23.',
    url: 'https://puertoprincesa.ph/articles/puerto-princesa-among-most-competitive-cities-in-2024-dti-index/',
  },
];
