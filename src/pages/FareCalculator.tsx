import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, ExternalLink, Fuel, Minus, Plus } from 'lucide-react';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import PageHeader from '../components/ui/PageHeader';
import { tricycleFare, computeTricycleFare } from '../data/tricycleFare';

const MIN_KM = 1;
const MAX_KM = 30;

const peso = (amount: number) => `₱${amount.toFixed(2)}`;

export default function FareCalculator() {
  const { t } = useTranslation('common');
  const [distanceKm, setDistanceKm] = useState(3);
  const [discounted, setDiscounted] = useState(false);

  const fare = computeTricycleFare(distanceKm, discounted);
  const extraKm = Math.max(0, distanceKm - tricycleFare.minimumFareDistanceKm);
  const setDistance = (km: number) =>
    setDistanceKm(Math.min(MAX_KM, Math.max(MIN_KM, Math.round(km) || MIN_KM)));

  return (
    <>
      <SEO
        title="Tricycle Fare Calculator"
        description="Estimate a tricycle fare in Puerto Princesa City: P12 for the first 2 km and P2 for each kilometer after, with 20% off for seniors, PWDs and students."
        keywords="Puerto Princesa tricycle fare, tricycle fare calculator, taripa, Ordinance 1129"
      />
      <main className="flex-grow">
        <PageHeader
          title="Tricycle Fare Calculator"
          subtitle="Estimate your tricycle fare from the distance of your trip."
          breadcrumbs={[
            { label: t('navbar.home'), href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Tricycle Fare Calculator' },
          ]}
        />

        <Section>
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2 text-primary-700">
                <Calculator className="h-6 w-6" aria-hidden="true" />
                <Heading level={2} className="mb-0 text-xl md:text-xl">
                  Estimate your fare
                </Heading>
              </div>

              <label
                htmlFor="distance"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                Trip distance (km)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDistance(distanceKm - 1)}
                  disabled={distanceKm <= MIN_KM}
                  aria-label="One kilometer less"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <input
                  id="distance"
                  type="number"
                  inputMode="numeric"
                  min={MIN_KM}
                  max={MAX_KM}
                  value={distanceKm}
                  onChange={e => setDistance(Number(e.target.value))}
                  className="h-11 w-24 rounded-lg border border-gray-300 text-center text-lg font-bold"
                />
                <button
                  type="button"
                  onClick={() => setDistance(distanceKm + 1)}
                  disabled={distanceKm >= MAX_KM}
                  aria-label="One kilometer more"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <Text className="mt-2 text-sm text-gray-500">
                Not sure? A map app can show the distance of your route.
              </Text>

              <label className="mt-6 flex items-start gap-3 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={discounted}
                  onChange={e => setDiscounted(e.target.checked)}
                  className="mt-0.5 h-5 w-5"
                />
                <span>
                  I'm a senior citizen, a person with disability, or a student
                  (20% off)
                </span>
              </label>

              <div className="mt-6 rounded-xl bg-primary-50 p-5">
                <p className="text-sm text-primary-800">Estimated fare</p>
                <p className="font-display text-4xl text-primary-900">
                  {peso(fare)}
                </p>
                <p className="mt-2 text-sm text-primary-800">
                  {peso(tricycleFare.minimumFare)} for the first{' '}
                  {tricycleFare.minimumFareDistanceKm} km
                  {extraKm > 0 &&
                    ` + ${peso(extraKm * tricycleFare.perSucceedingKm)} for ${extraKm} more km`}
                  {discounted && ', less 20%'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Heading level={3}>How the fare works</Heading>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>
                    {peso(tricycleFare.minimumFare)} for the first{' '}
                    {tricycleFare.minimumFareDistanceKm} kilometers.
                  </li>
                  <li>
                    {peso(tricycleFare.perSucceedingKm)} for each kilometer
                    after that.
                  </li>
                  <li>
                    20% off for senior citizens, persons with disability, and
                    students.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                <p className="flex items-center gap-2 font-bold">
                  <Fuel className="h-4 w-4" aria-hidden="true" />
                  Fares follow gasoline prices
                </p>
                <p className="mt-1">
                  The minimum fare goes up or down by{' '}
                  {peso(tricycleFare.fuelAdjustment)} for every{' '}
                  {peso(tricycleFare.fuelPriceStep)} change in the price of
                  gasoline, so the fare you're charged today may be different.
                  Check the fare matrix posted at terminals, or ask the City
                  Tricycle Franchising and Regulatory Board.
                </p>
              </div>

              <p className="text-sm text-gray-600">
                Source:{' '}
                <a
                  href={tricycleFare.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary-700 underline hover:text-primary-800"
                >
                  {tricycleFare.source.name}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
