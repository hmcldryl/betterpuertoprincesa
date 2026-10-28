// Tricycle fare under the New Tricycle Fare Ordinance of 2021 (amending City
// Ordinance 1129), as reported by Palawan News, Oct 18, 2022:
// https://palawan-news.com/new-fare-rates-in-city-hiked-to-p12-minimum/
// P12 for the first 2 km, P2 per succeeding km, 20% off for seniors, PWDs and
// students. The minimum fare moves by P2 for every P10 change in the price of
// gasoline, so the current fare may differ from these base amounts.
export const tricycleFare = {
  minimumFare: 12,
  minimumFareDistanceKm: 2,
  perSucceedingKm: 2,
  discountRate: 0.2,
  fuelAdjustment: 2,
  fuelPriceStep: 10,
  source: {
    name: 'Palawan News, "New fare rates in city hiked to P12 minimum" (Oct 18, 2022)',
    url: 'https://palawan-news.com/new-fare-rates-in-city-hiked-to-p12-minimum/',
  },
};

export function computeTricycleFare(distanceKm: number, discounted: boolean) {
  const extraKm = Math.max(0, distanceKm - tricycleFare.minimumFareDistanceKm);
  const regular =
    tricycleFare.minimumFare + extraKm * tricycleFare.perSucceedingKm;
  return discounted ? regular * (1 - tricycleFare.discountRate) : regular;
}
