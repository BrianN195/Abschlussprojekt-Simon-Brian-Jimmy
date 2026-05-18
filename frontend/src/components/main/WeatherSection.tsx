import { useEffect } from "react";

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
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/4d1773d51/male/"
      data-label_1="MALEDIVEN"
      data-label_2="WETTER"
      data-theme="dark"
    >
      MALEDIVEN WETTER
    </a>
  );
}

export default WeatherSection;
