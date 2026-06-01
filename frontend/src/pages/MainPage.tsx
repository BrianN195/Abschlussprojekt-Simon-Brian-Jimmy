import { useTranslation } from 'react-i18next';
import FavoritesSection from "../components/main/FavoritesSection";
import WeatherSection from "../components/main/WeatherSection";
import "../styles/main.css"
function MainPage() {
    const { t } = useTranslation();

    return (
        <main className="main-page">
            <h1 className="main-title">{t('main.title')}</h1>

            <WeatherSection />
            
            <FavoritesSection />
        </main>
    );
}

export default MainPage;

