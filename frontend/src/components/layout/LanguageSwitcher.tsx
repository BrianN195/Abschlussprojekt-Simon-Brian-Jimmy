import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', flag: '/images/flags/en.svg', name: 'English' },
  { code: 'de', label: 'DE', flag: '/images/flags/de.svg', name: 'Deutsch' },
  { code: 'fr', label: 'FR', flag: '/images/flags/fr.svg', name: 'Français' },
  { code: 'es', label: 'ES', flag: '/images/flags/es.svg', name: 'Español' },
  { code: 'ar', label: 'AR', flag: '/images/flags/sa.svg', name: 'العربية' },
  { code: 'zh', label: '中文', flag: '/images/flags/cn.svg', name: '中文' },
] as const;

type LanguageSwitcherProps = {
  compact?: boolean;
};

function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const switcherRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0];
  const currentLanguageItem = languages.find((language) => language.code === currentLanguage) ?? languages[0];

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={switcherRef}
      className={compact ? 'language-switcher language-switcher-compact' : 'language-switcher'}
    >
      <span className="language-switcher-label">{t('language.label')}</span>
      <div className="language-switcher-dropdown">
        <button
          type="button"
          className="language-switcher-trigger glass-dropdown glass-dropdown--compact"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={t('language.ariaLabel')}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className="language-switcher-code">{currentLanguageItem.label}</span>
          <img
            className="language-switcher-flag"
            src={currentLanguageItem.flag}
            alt={currentLanguageItem.name}
            width="24"
            height="18"
            loading="eager"
            decoding="async"
          />
          <span className={menuOpen ? 'language-switcher-chevron is-open' : 'language-switcher-chevron'} aria-hidden="true">
            ▾
          </span>
        </button>

        {menuOpen ? (
          <div className="language-switcher-menu" role="menu" aria-label={t('language.ariaLabel')}>
            {languages.map((language) => {
              const isActive = currentLanguage === language.code;

              return (
                <button
                  key={language.code}
                  type="button"
                  className={isActive ? 'language-switcher-menu-item is-active' : 'language-switcher-menu-item'}
                  onClick={() => changeLanguage(language.code)}
                  role="menuitemradio"
                  aria-checked={isActive}
                >
                  <span className="language-switcher-code">{language.label}</span>
                  <img
                    className="language-switcher-flag"
                    src={language.flag}
                    alt={language.name}
                    width="24"
                    height="18"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LanguageSwitcher;