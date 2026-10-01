import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DirectoryBanner() {
  const { t } = useTranslation('common');
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('directory.title')}
          </h2>
          <p className="text-gray-600 mt-1">{t('directory.subtitle')}</p>
        </div>
        <Link
          to="/government/departments"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors shrink-0"
        >
          {t('directory.viewDirectory')}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
