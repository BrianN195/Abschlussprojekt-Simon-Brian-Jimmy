import { useTranslation } from 'react-i18next';

function CatalogSection() {
    const { t } = useTranslation();
    return (
        <section className="catalog-section">
            <h2 className="section-title">{t('catalog.title')}</h2>
            <p className="section-description">{t('catalog.description')}</p>
        </section>
    );
}  

export default CatalogSection;
