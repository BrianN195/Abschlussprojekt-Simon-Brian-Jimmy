import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import type { WeatherData } from '../../types/Weather';
import "../../styles/weather.css";

function WeatherSection() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);

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
      }
    }

    fetchWeather();
  }, []);

  return (
    <section className="weather-section">
      <h2>{t('weather.title')}</h2>

      {!weather ? (
        <p>{t('weather.loading')}</p>
      ) : (
        <div className="weather-content">
          <div className="weather-current">
            <h3>{weather.location}</h3>

            <p>
              {t('weather.temperature')}: {weather.current.temperature_2m}°C
            </p>

            <p>
              {t('weather.humidity')}: {weather.current.relative_humidity_2m}%
            </p>

            <p>
              {t('weather.wind')}: {weather.current.wind_speed_10m} km/h
            </p>

            <p>
              {t('weather.rain')}: {weather.current.precipitation} mm
            </p>
          </div>

          <div className="weather-forecast">
            <h3>{t('weather.forecast')}</h3>

            {weather.daily.time.map((day, index) => (
              <div
                key={day}
                className="weather-day"
              >
                <p>{day}</p>

                <p>
                  {t('weather.max')}:
                  {" "}
                  {weather.daily.temperature_2m_max[index]}
                  {weather.dailyUnits.temperature_2m_max}
                </p>

                <p>
                  {t('weather.min')}:
                  {" "}
                  {weather.daily.temperature_2m_min[index]}
                  {weather.dailyUnits.temperature_2m_min}
                </p>

                <p>
                  {t('weather.rain')}:
                  {" "}
                  {weather.daily.precipitation_sum[index]}
                  {weather.dailyUnits.precipitation_sum}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default WeatherSection;