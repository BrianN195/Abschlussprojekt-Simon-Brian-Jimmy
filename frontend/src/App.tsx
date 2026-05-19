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

function App() {
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
          <Route path="/about" element={<div>About Page (TODO)</div>} />
          <Route path="/animal/:id" element={<Animal/>}/>
          <Route path="/location/:id" element={<Location/>}/>
          <Route path="/animals" element={<AnimalList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
