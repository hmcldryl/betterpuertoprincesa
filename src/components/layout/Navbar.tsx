import React, { useState } from 'react';
import { X, Menu, ChevronDown, Phone } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import { hotlines } from '../../data/hotlines';
import { Ticker } from '../ui/Ticker';

const HOTLINE_ITEMS = hotlines.map(h => `${h.label}: ${h.number}`);

function LanguageToggle({
  language,
  onChange,
  className = '',
}: {
  language: string;
  onChange: (lang: LanguageType) => void;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex rounded-md border border-gray-300 overflow-hidden ${className}`}
    >
      {Object.entries(LANGUAGES).map(([code, lang]) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code as LanguageType)}
          aria-pressed={language === code}
          className={`px-2.5 py-1 text-xs font-semibold transition-colors ${
            language === code
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar: hotline ticker + meta links + language switcher */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-10">
          <a
            href="tel:911"
            className="flex items-center gap-2 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors min-w-0"
            aria-label="Emergency hotlines"
          >
            <Phone
              className="h-3.5 w-3.5 shrink-0"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <Ticker items={HOTLINE_ITEMS} className="truncate" />
          </a>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/hmcldryl/betterpuertoprincesa"
              className="text-xs text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              🚀 Join Us
            </a>
            <a
              href="https://puertoprincesa.ph"
              className="text-xs text-gray-800 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Official Puerto Princesa Website
            </a>
            <div className="hidden md:block">
              <LanguageToggle
                language={i18n.language}
                onChange={changeLanguage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logos/logo.svg"
                alt="Puerto Princesa City"
                className="h-15 w-auto"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown
                      className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors"
                      strokeWidth={2.5}
                    />
                  )}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X
                  className="block h-6 w-6"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="block h-6 w-6"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {mainNavigation.map(item =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeMenu === item.label ? 'transform rotate-180' : ''
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                {activeMenu === item.label && (
                  <div className="pl-6 py-2 space-y-1 bg-gray-50">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={closeMenu}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
              >
                {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
              </Link>
            )
          )}
          <a
            href="https://github.com/hmcldryl/betterpuertoprincesa"
            onClick={closeMenu}
            target="_blank"
            rel="noreferrer"
            className="block px-4 py-2 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
          >
            🚀 Join Us
          </a>
          <div className="px-4 py-3 border-t border-gray-200">
            <LanguageToggle
              language={i18n.language}
              onChange={changeLanguage}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
