import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { news } from '../../data/news';

const badgeStyles: Record<string, string> = {
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
};

export default function HomeNewsSection() {
  const { t } = useTranslation('common');
  const items = news.slice(0, 3);

  return (
    <Section className="!bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <Heading level={2} className="!mb-0">
          {t('news.title')}
        </Heading>
        <Link
          to="/news"
          className="hidden sm:inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {t('news.viewAll')}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeStyles[item.badge]}`}
              >
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
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

      <Link
        to="/news"
        className="sm:hidden mt-6 inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
      >
        {t('news.viewAll')}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </Section>
  );
}
