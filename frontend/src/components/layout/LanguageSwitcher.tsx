import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'ar', label: 'AR' },
  { code: 'zh', label: '中文' },
] as const;

type LanguageSwitcherProps = {
  compact?: boolean;
};

function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0];

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return (
    <label className={compact ? 'language-switcher language-switcher-compact' : 'language-switcher'}>
      <span className="language-switcher-label">{t('language.label')}</span>
      <select
        className="language-switcher-select"
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label={t('language.ariaLabel')}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSwitcher;