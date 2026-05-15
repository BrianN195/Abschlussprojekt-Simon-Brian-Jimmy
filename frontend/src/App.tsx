import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";

import "./App.css";

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
          <Route path="/profile" element={<div>Profile Page (TODO)</div>} />
          <Route path="/animals" element={<div>Animals Page (TODO)</div>} />
          <Route path="/about" element={<div>About Page (TODO)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
