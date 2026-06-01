import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { WeatherData } from "../../types/Weather";
import "../../styles/weather.css";
import InlineSVG from "../../components/ui/InlineSVG";

type WeatherIconInfo = {
  src: string;
  alt: string;
  label: string;
};

function formatForecastDay(day: string, locale: string) {
  const date = new Date(day);

  if (Number.isNaN(date.getTime())) {
    return day;
  }

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "2-digit",
  }).format(date);
}

function formatCurrentDate(day: string, locale: string) {
  const date = new Date(day);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getWeatherIcon(weatherCode: number): WeatherIconInfo {
  if (weatherCode === 0) {
    return {
      src: "/images/weather/sun.svg",
      alt: "Clear sky icon",
      label: "Sunny",
    };
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return {
      src: "/images/weather/partly-cloudy.svg",
      alt: "Partly cloudy icon",
      label: "Partly cloudy",
    };
  }

  if (weatherCode === 3) {
    return {
      src: "/images/weather/cloudy.svg",
      alt: "Cloudy icon",
      label: "Cloudy",
    };
  }

  if ([45, 48].includes(weatherCode)) {
    return {
      src: "/images/weather/fog.svg",
      alt: "Fog icon",
      label: "Fog",
    };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return {
      src: "/images/weather/rain.svg",
      alt: "Rain icon",
      label: "Rain",
    };
  }

  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {
      src: "/images/weather/snow.svg",
      alt: "Snow icon",
      label: "Snow",
    };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return {
      src: "/images/weather/thunderstorm.svg",
      alt: "Thunderstorm icon",
      label: "Thunderstorm",
    };
  }

  return {
    src: "/images/weather/unknown.svg",
    alt: "Unknown weather icon",
    label: "Weather",
  };
}

function WeatherSection() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("/api/v1/weather");

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        setWeather(data);
      } catch (error) {
        console.error("Weather fetch error:", error);
        setError("Weather data could not be loaded");
      }
    }

    fetchWeather();
  }, []);

  const { i18n, t } = useTranslation();

  return (
    <section className="weather-section">
      <h2>{t("weather.title")}</h2>

      {!weather ? (
        <div className="weather-content">
          <p>{error ? error : t("weather.loading")}</p>
        </div>
      ) : (
        <div className="weather-content">
          {(() => {
            const currentIcon = getWeatherIcon(weather.current.weather_code);
            const currentDate = formatCurrentDate(weather.current.time, i18n.resolvedLanguage ?? i18n.language ?? 'en');

            return (
              <div className="weather-current">
                <div className="weather-current-layout">
                  <div className="weather-current-summary">
                    <p className="weather-location-label">Current Weather</p>
                    <h3>{weather.location}</h3>
                    <p className="weather-current-date">{currentDate}</p>
                  </div>

                  <div className="weather-current-metrics">
                    <p>
                      {t("weather.temperature")}: {weather.current.temperature_2m}°C
                    </p>

                    <p>
                      {t("weather.humidity")}: {weather.current.relative_humidity_2m}%
                    </p>

                    <p>
                      {t("weather.wind")}: {weather.current.wind_speed_10m} km/h
                    </p>

                    <p>
                      {t("weather.rain")}: {weather.current.precipitation} mm
                    </p>
                  </div>

                  <div className="weather-icon-card">
                    {/* Inline SVG so SMIL animations run when present */}
                    <InlineSVG
                      src={currentIcon.src}
                      className="weather-icon"
                      ariaLabel={currentIcon.alt}
                    />
                    <span>{currentIcon.label}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="weather-forecast-panel">
            <h3>{t("weather.forecast")}</h3>

            <div className="weather-forecast">
              {weather.daily.time.map((day, index) => {
                const icon = getWeatherIcon(weather.daily.weather_code[index]);

                return (
                  <div key={day} className="weather-day">
                    <div className="weather-day-header">
                      <p>{formatForecastDay(day, i18n.resolvedLanguage ?? i18n.language ?? 'en')}</p>

                      <InlineSVG
                        src={icon.src}
                        className="weather-icon weather-icon-small"
                        ariaLabel={icon.alt}
                      />
                    </div>

                    <p>
                      {t("weather.max")}: {weather.daily.temperature_2m_max[index]}
                      {weather.dailyUnits.temperature_2m_max}
                    </p>

                    <p>
                      {t("weather.min")}: {weather.daily.temperature_2m_min[index]}
                      {weather.dailyUnits.temperature_2m_min}
                    </p>

                    <p>
                      {t("weather.rain")}: {weather.daily.precipitation_sum[index]}
                      {weather.dailyUnits.precipitation_sum}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WeatherSection;