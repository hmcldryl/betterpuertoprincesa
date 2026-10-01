// 2024 Philippine Statistics Authority Census of Population (2024 POPCEN),
// per barangay. Sourced directly from PSA's own Philippine Standard
// Geographic Code (PSGC) registry — not a third-party republication:
// https://psa.gov.ph/classification/psgc/barangays/1731500000
// These 66 figures sum to exactly 316,384 — the city-wide 2024 total PSA
// declared official via Proclamation No. 973 (11 July 2025) and cited on
// the Statistics page — so treat this as verified, not approximate.
import { normalizeBarangayName } from '../lib/barangayNames';

const RAW_POPULATION_2024: Record<string, number> = {
  Babuyan: 3095,
  Bacungan: 6015,
  'Bagong Bayan': 1326,
  'Bagong Pag-asa': 462,
  'Bagong Sikat': 7052,
  'Bagong Silang': 4266,
  Bahile: 2699,
  'Bancao-bancao': 15300,
  'Barangay ng mga Mangingisda': 8227,
  Binduyan: 1613,
  Buenavista: 1585,
  Cabayugan: 4104,
  Concepcion: 1894,
  Inagawan: 1853,
  'Inagawan Sub-Colony': 4626,
  Irawan: 9155,
  Iwahig: 8746,
  Kalipay: 548,
  Kamuning: 2148,
  Langogan: 2740,
  Liwanag: 926,
  Lucbuan: 1951,
  Luzviminda: 3417,
  Mabuhay: 111,
  Macarascas: 1874,
  Magkakaibigan: 361,
  Maligaya: 297,
  Manalo: 2985,
  Mandaragat: 9852,
  Manggahan: 602,
  Maningning: 937,
  Maoyon: 1465,
  Marufinas: 772,
  Maruyogon: 1813,
  Masigla: 597,
  Masikap: 966,
  Masipag: 2175,
  Matahimik: 530,
  Matiyaga: 497,
  Maunlad: 4154,
  Milagrosa: 3197,
  Model: 337,
  Montible: 330,
  Napsan: 2863,
  'New Panggangan': 758,
  Pagkakaisa: 225,
  Princesa: 898,
  Salvacion: 1680,
  'San Jose': 25480,
  'San Manuel': 20152,
  'San Miguel': 17870,
  'San Pedro': 29825,
  'San Rafael': 2485,
  'Santa Cruz': 1067,
  'Santa Lourdes': 11066,
  'Santa Lucia': 55,
  'Santa Monica': 21789,
  Seaside: 330,
  Sicsican: 22940,
  Simpocan: 1204,
  Tagabinit: 990,
  Tagburos: 10118,
  Tagumpay: 510,
  Tanabag: 947,
  Tanglaw: 1638,
  Tiniguiban: 13894,
};

// Keyed by normalized name so lookups work regardless of which naming
// convention (plain vs. PSGC "(Pob.)"-suffixed) the caller has on hand.
export const barangayPopulation2024: Record<string, number> =
  Object.fromEntries(
    Object.entries(RAW_POPULATION_2024).map(([name, population]) => [
      normalizeBarangayName(name),
      population,
    ])
  );
