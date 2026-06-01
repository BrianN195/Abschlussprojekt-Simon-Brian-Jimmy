import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import Animal from "./components/animals/Animal";

import "./App.css";

import Location from "./components/locations/Location";
import AnimalList from "./components/animals/ListOfAnimals";
import AboutPage from "./pages/AboutPage";
import CreateAnimal from "./components/creating/createAnimal";
import CreateLocation from "./components/creating/createLocation";
import ProtectedRoute from "./components/creating/ProtectedRoute";

import useUser from "./hooks/useUser";
import ConnectAnimalLocation from "./components/creating/ConnectAnimalLocation";
import { useTranslation } from "react-i18next";
import VerifyEmail from "./components/auth/VerifyEmail";
import MakeAdmin from "./components/creating/createAdmin";

function App() {
  const { t } = useTranslation();
  const { user, loading } = useUser();
  if (loading) {
    return <p>{t("common.loading")}</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing (kein Header) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Mit Header */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/animal/:id" element={<Animal />} />
          <Route path="/location/:id" element={<Location />} />
          <Route path="/animals" element={<AnimalList />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route
            path="/create-animal"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "mod"]}
                userRole={user?.role}
              >
                <CreateAnimal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-location"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "mod"]}
                userRole={user?.role}
              >
                <CreateLocation />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/connect"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "mod"]}
              userRole={user?.role}
            >
              <ConnectAnimalLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/makeAdmin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
              userRole={user?.role}
            >
              <MakeAdmin/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
