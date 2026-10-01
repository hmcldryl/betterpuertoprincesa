// Tree cover loss by dominant driver, Palawan province (GADM PHL.59),
// 2001-2025, canopy density threshold 30% — the WRI/Google DeepMind "Global
// Drivers of Forest Loss" classification, queried directly from Global
// Nature Watch's public data API (dataset gadm__tcl__adm1_change,
// v20260407, field wri_google_tree_cover_loss_drivers__driver). This is the
// same "Tree cover loss by dominant driver" chart shown on GNW's own
// dashboard for Palawan:
// https://globalnaturewatch.org/dashboards/country/PHL/59/?category=forest-change
// "Hard commodities" (mining & energy infrastructure) is the smallest driver
// province-wide too — 1,257 ha of ~224,000 ha lost since 2001, well behind
// permanent agriculture and shifting cultivation. Do not fabricate entries,
// and do not reweight to imply a larger mining share than the data shows.

export interface ForestLossDriver {
  driver: string;
  hectares: number;
}

export const palawanForestLossByDriver: ForestLossDriver[] = [
  { driver: 'Permanent agriculture', hectares: 104252.93 },
  { driver: 'Shifting cultivation', hectares: 100195.27 },
  { driver: 'Logging', hectares: 9881.23 },
  { driver: 'Other natural disturbances', hectares: 4332.14 },
  { driver: 'Wildfire', hectares: 2429.07 },
  { driver: 'Settlements & infrastructure', hectares: 1260.14 },
  { driver: 'Hard commodities', hectares: 1257.41 },
];
