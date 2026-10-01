import {
  ExternalLink,
  Calendar,
  AlertTriangle,
  MapPin,
  Pickaxe,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { PieChart } from '../components/ui/PieChart';
import PalawanMiningMap from '../components/map/PalawanMiningMap';
import { miningNews } from '../data/miningWatch';
import { palawanForestLossByDriver } from '../data/forestLoss';

const hectareFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const tagStyles: Record<string, string> = {
  "Indigenous Peoples' Rights": 'bg-amber-100 text-amber-700',
  Analysis: 'bg-gray-100 text-gray-700',
  Environment: 'bg-green-100 text-green-700',
  Health: 'bg-red-100 text-red-700',
  Policy: 'bg-blue-100 text-blue-700',
  'Human Rights': 'bg-purple-100 text-purple-700',
  History: 'bg-teal-100 text-teal-700',
};

export default function MiningWatch() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title={t('miningWatch.title')}
        description={t('miningWatch.subtitle')}
        keywords="Palawan mining, nickel mining Palawan, Puerto Princesa mining, mining moratorium Palawan, environmental awareness"
      />
      <main className="flex-grow">
        <Section className="!py-6 !bg-gray-50">
          <Breadcrumbs />
        </Section>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <Heading level={1} className="!text-white !mb-2">
              {t('miningWatch.title')}
            </Heading>
            <Text className="!text-primary-50 !max-w-2xl">
              {t('miningWatch.subtitle')}
            </Text>
          </div>
        </div>

        <Section>
          <div className="max-w-3xl space-y-10">
            <div className="flex gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <AlertTriangle
                className="h-5 w-5 shrink-0 text-amber-600"
                strokeWidth={2}
              />
              <p>{t('miningWatch.disclaimer')}</p>
            </div>

            <div>
              <Heading level={2}>{t('miningWatch.contextHeading')}</Heading>
              <div className="mt-4 space-y-4 text-gray-700">
                <p>
                  Palawan is often called the Philippines&rsquo; &ldquo;last
                  ecological frontier&rdquo; — a UNESCO Man and Biosphere
                  Reserve holding nearly half the country&rsquo;s remaining
                  old-growth forest, 30 percent of its mangroves, and 40 percent
                  of its coral reefs. It also sits on some of the world&rsquo;s
                  largest untapped nickel deposits, a mineral in rising global
                  demand for electric-vehicle batteries. That has made
                  large-scale mining one of the most contested issues in the
                  province for decades.
                </p>
                <p>
                  Puerto Princesa itself carries a cautionary chapter: the city
                  was once home to the Palawan Quicksilver Mines Inc. mercury
                  mine, shuttered since 1976, near which residents were later
                  found to test positive for mercury poisoning. In March 2025,
                  the provincial government responded to decades of advocacy by
                  signing a 50-year moratorium on new mining agreements and
                  exploration permits — but the ban doesn&rsquo;t apply to
                  Puerto Princesa (a highly urbanized city outside provincial
                  jurisdiction), doesn&rsquo;t affect the 11 mining operations
                  already permitted elsewhere in the province, and leaves the
                  Palawan Council for Sustainable Development able to grant
                  clearances that critics warn could still open the door to new
                  projects.
                </p>
                <p>
                  The articles below — independent journalism and reporting from
                  human-rights and environmental organizations — track how that
                  fight is playing out: in the courts, in Indigenous ancestral
                  domains, and in the rivers and coral reefs downstream of
                  mining operations.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section className="!py-0 !pb-10">
          <div>
            <Heading level={2}>{t('miningWatch.mapHeading')}</Heading>
            <div className="mt-2 flex gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
              <p>{t('miningWatch.mapCaveat')}</p>
            </div>
            <div className="mt-4">
              <PalawanMiningMap />
            </div>
          </div>
        </Section>

        <Section className="!pt-0 !pb-10">
          <div>
            <Heading level={2}>{t('miningWatch.forestLossHeading')}</Heading>
            <Text className="!mt-2 !max-w-2xl !text-gray-600">
              {t('miningWatch.forestLossSubtitle')}
            </Text>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
              <PieChart
                data={palawanForestLossByDriver.map(d => ({
                  label: d.driver,
                  value: d.hectares,
                }))}
                formatValue={v => `${hectareFormat.format(v)} ha`}
              />
            </div>

            <div className="mt-4 flex gap-3 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
              <Pickaxe
                className="h-5 w-5 shrink-0 text-orange-600"
                strokeWidth={2}
              />
              <p>{t('miningWatch.forestLossMiningNote')}</p>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              {t('miningWatch.forestLossSourceLabel')}:{' '}
              <a
                href="https://globalnaturewatch.org/dashboards/country/PHL/59/?category=forest-change"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-600"
              >
                Global Nature Watch — Palawan
              </a>
            </p>
          </div>
        </Section>

        <Section className="!pt-0">
          <div className="max-w-3xl space-y-10">
            <div>
              <Heading level={2}>{t('miningWatch.articlesHeading')}</Heading>
              <div className="mt-4 space-y-6">
                {miningNews.map(item => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          tagStyles[item.tag] ?? 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.outlet}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-start gap-2">
                      {item.title}
                      <ExternalLink
                        className="h-4 w-4 mt-1 shrink-0 text-gray-400"
                        strokeWidth={2.5}
                      />
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{item.summary}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
              <p>{t('miningWatch.footerNote')}</p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
