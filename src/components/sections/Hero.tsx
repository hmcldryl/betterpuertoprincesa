import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 md:py-24">
      <div className="pointer-events-none absolute inset-0 container mx-auto px-4">
        <div className="relative h-full">
          <div className="pointer-events-auto absolute left-3/4 -translate-x-1/2 top-8 bottom-0 hidden lg:block">
            <Link
              to="/prinsesa-ng-baybay"
              aria-label={t('landmark.calloutText')}
              className="group relative block h-full"
            >
              <img
                src="/prinsesa-ng-baybay.svg"
                alt=""
                className="h-full w-auto"
              />
              <div
                role="tooltip"
                aria-hidden="true"
                className="pointer-events-none absolute right-[75%] top-1/2 w-48 -translate-y-1/2 whitespace-pre-line rounded-lg bg-white px-3 py-2 text-center text-xs font-medium text-gray-900 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {t('landmark.calloutText')}
                <span
                  className="absolute left-full top-1/2 h-0 w-0 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-white"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left section with title and search */}
          <div className="animate-fade-in">
            <Text transform="uppercase">Welcome to</Text>
            <Heading>BetterPuertoPrincesa.org</Heading>
            <Text>{t('hero.subtitle')}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
