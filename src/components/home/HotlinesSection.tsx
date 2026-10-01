import { Phone, Shield, Flame, TriangleAlert, Hospital } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { hotlines } from '../../data/hotlines';

const ICONS: Record<string, typeof Phone> = {
  '911': Phone,
  Police: Shield,
  Fire: Flame,
  CDRRMO: TriangleAlert,
  Hospital: Hospital,
};

export default function HotlinesSection() {
  const { t } = useTranslation('common');
  return (
    <Section className="!bg-gray-50">
      <Heading level={2}>{t('hotlines.title')}</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {hotlines.map(h => {
          const Icon = ICONS[h.label] ?? Phone;
          return (
            <a
              key={h.label}
              href={`tel:${h.tel}`}
              className="flex flex-col items-center text-center gap-2 bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="bg-primary-100 text-primary-600 p-3 rounded-md">
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="font-semibold text-gray-900">{h.label}</div>
              <div className="text-sm text-primary-600 font-medium">
                {h.number}
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
