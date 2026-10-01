import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  MapPin,
} from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import PuertoPrincesaMap from './PuertoPrincesaMap';

const LAT = 9.7392;
const LON = 118.7353;

// WMO weather codes (Open-Meteo) mapped to a lucide icon.
const WEATHER_ICONS: Record<number, typeof Sun> = {
  0: Sun,
  1: CloudSun,
  2: CloudSun,
  3: Cloud,
  45: CloudFog,
  48: CloudFog,
  51: CloudDrizzle,
  53: CloudDrizzle,
  55: CloudDrizzle,
  61: CloudRain,
  63: CloudRain,
  65: CloudRainWind,
  80: CloudRain,
  81: CloudRain,
  82: CloudRainWind,
  95: CloudLightning,
  96: CloudLightning,
  99: CloudLightning,
};

function WeatherIcon({
  code,
  className,
}: {
  code: number | null;
  className?: string;
}) {
  const Icon = (code != null && WEATHER_ICONS[code]) || Cloud;
  return <Icon className={className} strokeWidth={2.5} />;
}

interface ForecastDay {
  date: Date;
  max: number | null;
  min: number | null;
  code: number | null;
}

export default function WeatherMapSection() {
  const { t } = useTranslation('common');
  const weekdays = t('weatherMap.weekdays', {
    returnObjects: true,
  }) as string[];
  const [temp, setTemp] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
    )
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
        setCode(data?.current_weather?.weathercode ?? null);
      })
      .catch(() => {});

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    )
      .then(r => r.json())
      .then(data => {
        const daily = data?.daily;
        if (!daily?.time) return;
        setForecast(
          daily.time.map((iso: string, i: number) => ({
            date: new Date(iso),
            max: daily.temperature_2m_max?.[i] ?? null,
            min: daily.temperature_2m_min?.[i] ?? null,
            code: daily.weathercode?.[i] ?? null,
          }))
        );
      })
      .catch(() => {});
  }, []);

  return (
    <Section>
      <Heading level={2}>{t('weatherMap.title')}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Weather — 1/4 width */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <CloudSun className="h-5 w-5 text-primary-600" strokeWidth={2.5} />
            {t('weatherMap.weatherHeading')}
          </h3>
          <div className="flex items-center gap-4 mb-6">
            <WeatherIcon code={code} className="h-10 w-10 text-primary-600" />
            <div className="text-4xl font-bold text-gray-900">
              {temp ?? '--°C'}
            </div>
          </div>
          <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
            {(forecast ?? Array.from({ length: 5 }, () => null)).map(
              (day, i) => (
                <div
                  key={i}
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 bg-gray-50 rounded-md p-2 text-center lg:text-left"
                >
                  <div className="text-xs font-medium text-gray-500 lg:w-10">
                    {i === 0
                      ? t('weatherMap.today')
                      : day
                        ? weekdays[day.date.getDay()]
                        : '--'}
                  </div>
                  <WeatherIcon
                    code={day?.code ?? null}
                    className="h-5 w-5 text-primary-600"
                  />
                  <div className="text-xs lg:ml-auto">
                    <span className="font-semibold text-gray-900">
                      {day?.max != null ? `${Math.round(day.max)}°` : '--'}
                    </span>{' '}
                    <span className="text-gray-500">
                      {day?.min != null ? `${Math.round(day.min)}°` : '--'}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Map — 3/4 width */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MapPin className="h-5 w-5 text-primary-600" strokeWidth={2.5} />
            {t('weatherMap.mapHeading')}
          </h3>
          <PuertoPrincesaMap />
        </div>
      </div>
    </Section>
  );
}
