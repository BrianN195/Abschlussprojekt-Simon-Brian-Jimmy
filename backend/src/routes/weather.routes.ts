import express, { Request, Response} from 'express';

const router = express.Router();

// GET /api/v1/weather
router.get('/', async (req: Request, res: Response) => {
    const latitude = 4.1755;
    const longitude = 73.5093;

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
      `&timezone=Indian%2FMaldives`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        res.status(500).json({
             error: 'Weather service is currently unavailable' 
            });
        return;
      }

      const data = await response.json();

  res.json({
    location: 'Maldives',
    current: data.current,
    daily: data.daily,
    dailyUnits: data.daily_units,
  });
});

export default router;