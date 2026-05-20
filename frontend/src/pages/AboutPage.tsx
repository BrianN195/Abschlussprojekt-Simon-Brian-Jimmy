import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AboutPage.css";
import { authService } from "../services/authService";

const AboutPage: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(authService.isAuthenticated());

  useEffect(() => {
    const onStorage = () => setIsAuth(authService.isAuthenticated());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const ctaTarget = isAuth ? "/profile" : "/register";
  const ctaText = isAuth ? "View Profile" : "Join — register now";

  return (
    <main className="about-page">
        <section className="about-hero">
          <h1>About Maldives Marine</h1>
          <p>
            Maldives Marine is a small web app aimed at divers, nature and marine
            biology enthusiasts, and travelers who want to explore the wildlife
            and protected areas of the Maldives.
          </p>
        </section>

        <section className="about-why">
          <h2>Why this site?</h2>
          <p>
            The goal is to present observations, places and species clearly,
            collect information about individual animals and locations, and
            raise awareness for the conservation of the underwater world.
          </p>
        </section>

        <section className="about-target">
          <h2>Target audience</h2>
          <ul>
            <li>Divers and snorkelers who want to observe marine life</li>
            <li>Researchers and independent scientists documenting sightings</li>
            <li>Travelers looking for information about protected areas</li>
            <li>Conservationists and educational programs</li>
          </ul>
        </section>

        <section className="about-features">
          <h2>Key features</h2>
          <ul>
            <li>Species profiles with images and important traits</li>
            <li>Locations and map view with historical sightings</li>
            <li>User profiles with avatar upload and personal favorites</li>
            <li>Integrated search for species, places and posts</li>
            <li>Responsive design for mobile, tablet and desktop</li>
          </ul>
        </section>

        <section className="about-contribute">
          <h2>Get involved</h2>
          <p>
            Sign up to add observations, upload images and support the community.
            Every sighting helps to better understand species and habitats.
          </p>
        </section>

        <div className="about-cta">
          <Link to={ctaTarget} className="about-cta-button">{ctaText}</Link>
        </div>

        <section className="about-contact">
          <h2>Contact & feedback</h2>
          <p>
            Please report feedback, ideas or bugs via the project repository or
            by email to the development team.
          </p>
        </section>
      </main>
  );
};

export default AboutPage;
