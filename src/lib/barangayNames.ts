// The NAMRIA/PSGC boundary dataset carries a " (Pob.)" poblacion suffix and
// inconsistent capitalization that our plain-text barangay list doesn't use
// (e.g. "Bagong Pag-Asa (Pob.)" vs. "Bagong Pag-asa") — normalize both sides
// before comparing names from different sources.
export function normalizeBarangayName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(pob\.?\)\s*$/i, '')
    .trim();
}
