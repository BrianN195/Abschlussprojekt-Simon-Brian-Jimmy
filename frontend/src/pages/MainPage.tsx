import CatalogSection from "../components/main/CatalogSection";
import CommentSection from "../components/main/CommentSection";
import ProfileSection from "../components/main/ProfileSection";
import VisitorSection from "../components/main/VisitorSection";
import WeatherSection from "../components/main/WeatherSection";

function MainPage() {
    return (
        <main className="main-page">
            <h1 className="main-title">
                Maldives Marine Life
            </h1>

            <CatalogSection />

            <WeatherSection />

            <VisitorSection />

            <CommentSection />

            <ProfileSection />

        </main>
    );
}

export default MainPage;

