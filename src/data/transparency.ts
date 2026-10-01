// Figures are sourced directly from the City Government of Puerto Princesa's
// official FY2026 Annual Budget Report (2026-Annual-Budget-Report-ABR-Annual.xlsx,
// puertoprincesa.ph/full-disclosure-government-transparency-new-v2) and the
// General Appropriations Ordinance. Real, cited figures — do not fabricate
// or update without a source. The raw numbers live in ./city-budget.json,
// mirrored after how transparency.bettergov.ph publishes its own budget
// aggregates as flat JSON (metadata + data).
import cityBudgetData from './city-budget.json';

export const cityBudget = {
  year: cityBudgetData.metadata.year,
  totalAppropriations: cityBudgetData.totalAppropriations,
  totalCurrentOperatingExpenditures:
    cityBudgetData.totalCurrentOperatingExpenditures,
  totalCapitalOutlay: cityBudgetData.totalCapitalOutlay,
  sectors: cityBudgetData.sectors,
  nationalTaxAllotment: cityBudgetData.nationalTaxAllotment,
  disasterFund: cityBudgetData.disasterFund,
  source: cityBudgetData.metadata.source,
  sourceUrl: cityBudgetData.metadata.sourceUrl,
};

// Sourced from each fiscal year's Annual Budget / Annual Budget Report,
// City Government of Puerto Princesa (Full Disclosure Board). See
// annual-budget-history.json's metadata.note for the 2022 computation caveat.
import annualBudgetHistoryData from './annual-budget-history.json';

export const annualBudgetHistory = {
  years: annualBudgetHistoryData.data,
  source: annualBudgetHistoryData.metadata.source,
  sourceUrl: annualBudgetHistoryData.metadata.sourceUrl,
  note: annualBudgetHistoryData.metadata.note,
};

export const officialDocuments = [
  {
    label: 'FY2026 Annual Budget Report',
    url: 'https://puertoprincesa.ph/wp-content/uploads/2026/01/2026-Annual-Budget-Report-ABR-Annual.xlsx',
  },
  {
    label: 'FY2025 Annual Budget',
    url: 'https://puertoprincesa.ph/wp-content/uploads/2025/09/2025-Annual-Budget.xlsx',
  },
  {
    label: 'General Appropriations Ordinance No. 1-2025',
    url: 'https://puertoprincesa.ph/wp-content/uploads/2025/09/GAO-No.-1-2024-resized.pdf',
  },
  {
    label: 'Q4 2025 Statement of Receipts and Expenditures',
    url: 'https://puertoprincesa.ph/wp-content/uploads/2026/02/4th-Statement-of-Receipts-and-Expenditures-SRE-Quarterly.xlsx',
  },
  {
    label: 'Full Disclosure & Government Transparency Portal',
    url: 'https://puertoprincesa.ph/full-disclosure-government-transparency-new-v2/',
  },
];

// Sourced from DPWH's own project database (api.dpwh.bettergov.ph), filtered
// to projects explicitly located in Puerto Princesa City — see
// dpwh-projects.json's metadata.note for the exact filtering logic. Only the
// 5 highest-cost projects per category are itemized; category totals/counts
// cover every matching project, including unawarded ones still in
// procurement.
import dpwhProjectsData from './dpwh-projects.json';

export const dpwhProjects = {
  summary: {
    totalProjects: dpwhProjectsData.totalProjects,
    totalBudget: dpwhProjectsData.totalBudget,
    asOf: dpwhProjectsData.metadata.asOf,
    note: dpwhProjectsData.metadata.note,
  },
  categories: dpwhProjectsData.categories,
  source: dpwhProjectsData.metadata.source,
  sourceUrl: dpwhProjectsData.metadata.sourceUrl,
  browseAllUrl: dpwhProjectsData.metadata.browseAllUrl,
  browseFloodControlUrl: dpwhProjectsData.metadata.browseFloodControlUrl,
  projects: dpwhProjectsData.projects,
  // 2016-2025 budget per category, summed across ALL matching projects that
  // year (not just the 5 itemized above). 2026 is omitted — its projects are
  // still at the procurement stage with no awarded budget yet.
  byYear: dpwhProjectsData.byYear as Record<
    string,
    { year: number; totalBudget: number }[]
  >,
};
