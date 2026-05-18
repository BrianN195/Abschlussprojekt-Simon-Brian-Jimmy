import ProfileSection from "../components/main/ProfileSection";
import WeatherSection from "../components/main/WeatherSection";

function MainPage() {
    return (
        <main className="main-page">
            <h1 className="main-title">
                Maldives Marine Life
            </h1>

            <WeatherSection />

            <ProfileSection />

        </main>
    );
}

export default MainPage;

