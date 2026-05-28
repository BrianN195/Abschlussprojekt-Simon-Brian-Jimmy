import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'ar', label: 'AR', flag: '🇸🇦', name: 'العربية' },
  { code: 'zh', label: '中文', flag: '🇨🇳', name: '中文' },
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
          <span className="language-switcher-flag" aria-hidden="true">
            {currentLanguageItem.flag}
          </span>
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
                  <span className="language-switcher-flag" aria-hidden="true">
                    {language.flag}
                  </span>
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