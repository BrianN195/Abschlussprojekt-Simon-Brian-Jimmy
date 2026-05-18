import FavoritesSection from "../components/main/FavoritesSection";
import WeatherSection from "../components/main/WeatherSection";

function MainPage() {
    return (
        <main className="main-page">
            <h1 className="main-title">
                Maldives Marine Life
            </h1>

            <WeatherSection />

            <FavoritesSection />

        </main>
    );
}

export default MainPage;

