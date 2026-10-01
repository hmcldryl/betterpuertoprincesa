import { ExternalLink, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { news } from '../data/news';

const badgeStyles: Record<string, string> = {
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
};

const News: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title="News & Updates"
        description="Latest news and announcements from the City Government of Puerto Princesa."
        keywords="news, announcements, Puerto Princesa, city government"
      />
      <main className="flex-grow">
        <Section className="!py-6 !bg-gray-50">
          <Breadcrumbs />
        </Section>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <Heading level={1} className="!text-white !mb-2">
              {t('news.title')}
            </Heading>
            <Text className="!text-primary-50 !max-w-2xl">
              {t('news.subtitle')}
            </Text>
          </div>
        </div>

        <Section>
          <div className="space-y-6 max-w-3xl">
            {news.map(item => (
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
        </Section>
      </main>
    </>
  );
};

export default News;
