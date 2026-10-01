import React from 'react';
import { Facebook, Github, MessageCircle } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const isExternal = (href: string) => /^https?:\/\//.test(href);

const FooterLink: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
}> = ({ href, className, children }) =>
  isExternal(href) ? (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  const getSocialIcon = (label: string) => {
    switch (label) {
      case 'Facebook':
        return <Facebook className="h-5 w-5" strokeWidth={1} />;
      case 'GitHub':
        return <Github className="h-5 w-5" strokeWidth={1} />;
      case 'Discord':
        return <MessageCircle className="h-5 w-5" strokeWidth={1} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logos/logo-white.svg"
                alt="Puerto Princesa City"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A community-run portal for Puerto Princesa City, Palawan.
            </p>
            <div className="flex space-x-4">
              {footerNavigation.socialLinks
                .filter(link => link.href)
                .map(link => (
                  <a
                    key={link.label}
                    href={link.href as string}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {getSocialIcon(link.label)}
                  </a>
                ))}
            </div>
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/hmcldryl/betterpuertoprincesa"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute at GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
