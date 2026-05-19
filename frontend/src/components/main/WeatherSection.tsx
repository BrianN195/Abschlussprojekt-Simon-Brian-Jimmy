import { useEffect, useState } from "react";
import "../../styles/weather.css";

type WeatherData = {
  location: string;

  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
  };

  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    time: string[];
  };

  dailyUnits: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
  };
};

function WeatherSection() {
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
      <h2>Weather</h2>

      {!weather ? (
        <p>Loading weather data...</p>
      ) : (
        <div className="weather-content">
          <div className="weather-current">
            <h3>{weather.location}</h3>

            <p>
              Temperature: {weather.current.temperature_2m}°C
            </p>

            <p>
              Humidity: {weather.current.relative_humidity_2m}%
            </p>

            <p>
              Wind: {weather.current.wind_speed_10m} km/h
            </p>

            <p>
              Rain: {weather.current.precipitation} mm
            </p>
          </div>

          <div className="weather-forecast">
            <h3>7-Day Forecast</h3>

            {weather.daily.time.map((day, index) => (
              <div
                key={day}
                className="weather-day"
              >
                <p>{day}</p>

                <p>
                  Max:
                  {" "}
                  {weather.daily.temperature_2m_max[index]}
                  {weather.dailyUnits.temperature_2m_max}
                </p>

                <p>
                  Min:
                  {" "}
                  {weather.daily.temperature_2m_min[index]}
                  {weather.dailyUnits.temperature_2m_min}
                </p>

                <p>
                  Rain:
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