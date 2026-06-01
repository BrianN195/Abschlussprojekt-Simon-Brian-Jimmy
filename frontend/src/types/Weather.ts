export type WeatherData = {
  location: string;

  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
    time: string;
  };

  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
    time: string[];
  };

  dailyUnits: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
  };
};
