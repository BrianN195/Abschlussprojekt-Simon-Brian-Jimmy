import FavoritesSection from "../components/main/FavoritesSection";
import WeatherSection from "../components/main/WeatherSection";
import ProfileSection from "../components/main/ProfileSection";

function MainPage() {

    return (
        <main className="main-page">
            <h1 className="main-title">Maldives Marine Life</h1>

            <WeatherSection />

            <ProfileSection />

            <FavoritesSection />
        </main>
    );
}

export default MainPage;

