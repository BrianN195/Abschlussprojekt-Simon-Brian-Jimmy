import { useEffect } from "react";
import "../../styles/weather.css";

declare global {
  interface Window {
    __weatherwidget_init?: () => void;
  }
}

function WeatherSection() {
  useEffect(() => {
    const scriptId = "weatherwidget-io-js";

    // Script nur einmal laden
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;

      document.body.appendChild(script);
    } else {
      // Widget neu initialisieren falls Script schon existiert
      window.__weatherwidget_init && window.__weatherwidget_init();
    }
  }, []);

 return (
  <section className="weather-section">
    <h2>Weather</h2>

  <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/4d1773d51/male/"
      data-label_1="MALDIVES"
      data-label_2="WEATHER"
      data-theme="dark"
    >
      MALDIVES WEATHER
    </a>
  </section>
);
}

export default WeatherSection;
