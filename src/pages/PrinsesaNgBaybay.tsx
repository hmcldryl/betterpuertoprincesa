import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';

// Sourced from:
// - Palawanderer, "Ang Prinsesa ng Baybay: The Story Behind It" — https://palawanderer.net/ang-prinsesa-ng-baybay-the-story-behind-it/
// - Manila-Mania, "The Princess of the Sea" (2009) — http://manila-mania.blogspot.com/2009/03/princess-of-sea.html
const trivia = [
  'The Rotary Club of Puerto Princesa initiated the project in 2007, under then-president Bobby Castro, hoping to give the city a landmark on the scale of Singapore’s Merlion or Denmark’s Little Mermaid.',
  'The design was chosen through a public contest launched on July 13, 2007, under the theme "Simbolo ng Ating Kultura at Buhay" (Symbol of Our Culture and Life).',
  'The winning concept combined designs from two artists: Zaldy Jumawan, then based in Palawan, and Elordie Mesac, a Tagbanua artist trained under Charles Wandag’s Aborlan Arts Program.',
  'The statue’s face was deliberately sculpted with the flat nose characteristic of the Tagbanua people, Puerto Princesa’s original inhabitants.',
  'The final 100-kilogram fiberglass statue was executed by Manila-based sculptor Ronel F. Roces and unveiled on December 7, 2007, at the City Coastal Reclamation Area — the Baywalk.',
  'Both original designers reportedly felt the finished sculpture strayed from their concept of a princess watching the sunset with birds in the background.',
];

export default function PrinsesaNgBaybay() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title={t('landmark.title')}
        description={t('landmark.subtitle')}
        keywords="Prinsesa ng Baybay, Puerto Princesa Baywalk, Puerto Princesa landmark, city history"
      />
      <main className="flex-grow">
        <Section className="!py-6 !bg-gray-50">
          <Breadcrumbs />
        </Section>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <Heading level={1} className="!text-white !mb-2">
              {t('landmark.title')}
            </Heading>
            <Text className="!text-primary-50 !max-w-2xl">
              {t('landmark.subtitle')}
            </Text>
          </div>
        </div>

        <Section>
          <div className="max-w-3xl space-y-10">
            <div>
              <Heading level={2}>{t('landmark.historyHeading')}</Heading>
              <div className="mt-4 space-y-4 text-gray-700">
                <p>
                  Ang Prinsesa ng Baybay ("The Princess of the Shore") is the
                  fiberglass statue of a woman with windswept hair, playing with
                  birds, that stands at the far end of the Puerto Princesa
                  Baywalk — the City Coastal Reclamation Area, the city&rsquo;s
                  own version of Manila&rsquo;s Roxas Boulevard.
                </p>
                <p>
                  The statue draws on local folklore about how the city got its
                  name: seafarers were said to see a princess-like maiden
                  walking along the bay late in the afternoon or early evening,
                  who would seem to vanish whenever anyone approached. The
                  Rotary Club of Puerto Princesa commissioned the statue in 2007
                  as a symbol of that story and of Palaweño life and culture
                  more broadly, unveiling it on December 7, 2007.
                </p>
              </div>
            </div>

            <div>
              <Heading level={2}>{t('landmark.triviaHeading')}</Heading>
              <ul className="mt-4 space-y-3">
                {trivia.map((fact, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"
                      aria-hidden="true"
                    />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <Heading level={3}>{t('landmark.sourcesHeading')}</Heading>
              <ul className="mt-2 space-y-1 text-sm text-gray-500">
                <li>
                  <a
                    href="https://palawanderer.net/ang-prinsesa-ng-baybay-the-story-behind-it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 underline"
                  >
                    Palawanderer — Ang Prinsesa ng Baybay: The Story Behind It
                  </a>
                </li>
                <li>
                  <a
                    href="http://manila-mania.blogspot.com/2009/03/princess-of-sea.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 underline"
                  >
                    Manila-Mania — The Princess of the Sea
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
