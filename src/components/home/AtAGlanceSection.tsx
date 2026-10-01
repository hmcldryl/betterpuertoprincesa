import { Users, MapPin, Award, Ruler, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { demographics } from '../../data/statistics';
import BarangayMap from '../map/BarangayMap';

const numberFormat = new Intl.NumberFormat('en-US');

export default function AtAGlanceSection() {
  const { t } = useTranslation('common');

  const stats = [
    {
      icon: Users,
      value: numberFormat.format(demographics.population.total),
      label: t('statistics.populationLabel'),
      source: `${demographics.population.year} ${demographics.population.source}`,
      sourceUrl: demographics.population.sourceUrl,
    },
    {
      icon: MapPin,
      value: String(demographics.barangayCount),
      label: t('statistics.barangaysLabel'),
      source: t('statistics.administrativeUnits'),
    },
    {
      icon: Award,
      value: '1st',
      label: t('statistics.incomeClassificationLabel'),
      source: demographics.incomeClass,
    },
    {
      icon: Ruler,
      value: `${numberFormat.format(demographics.landAreaKm2)} km²`,
      label: t('statistics.landAreaShortLabel'),
      source: t('statistics.totalCityArea'),
    },
  ];

  return (
    <Section>
      <div className="flex items-center justify-between mb-6">
        <Heading level={2} className="!mb-0">
          {t('glance.title')}
        </Heading>
        <Link
          to="/statistics"
          className="hidden sm:inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {t('statistics.viewFullProfile')}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm"
          >
            <stat.icon
              className="h-8 w-8 mx-auto mb-3 text-primary-600"
              strokeWidth={2.5}
            />
            <div className="text-2xl md:text-3xl font-bold text-gray-900">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-700 mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stat.sourceUrl ? (
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary-600"
                >
                  {stat.source}
                </a>
              ) : (
                stat.source
              )}
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/statistics"
        className="sm:hidden mt-6 inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
      >
        {t('statistics.viewFullProfile')}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>

      <div className="mt-10">
        <Heading level={3} className="!mb-1">
          {t('statistics.barangayMapHeading')}
        </Heading>
        <p className="text-sm text-gray-500 mb-4">
          {t('statistics.barangayMapSubtitle')}
        </p>
        <BarangayMap />
      </div>
    </Section>
  );
}
