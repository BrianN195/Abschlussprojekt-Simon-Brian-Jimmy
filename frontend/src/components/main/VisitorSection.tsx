import { useTranslation } from 'react-i18next';

function VisitorSection() {
  const { t } = useTranslation();
  return (
    <section className="visitor-section">
      <h2 className="section-title">{t('visitor.title')}</h2>

      <p className="section-subtitle">{t('visitor.subtitle')}</p>
    </section>
  );
}

export default VisitorSection;