import { Router, Request, Response } from 'express';

const router = Router();

// Placeholder: später mit echter DB
const resorts = [
  {
    id: 1,
    name: 'Paradise Island Resort',
    atoll: 'North Malé Atoll',
    lat: 4.1755,
    lng: 73.5282,
    description: 'Luxury resort with pristine beaches',
    imageUrl: 'https://via.placeholder.com/400x300?text=Paradise+Island',
  },
  {
    id: 2,
    name: 'Ocean Blue Maldives',
    atoll: 'South Malé Atoll',
    lat: 3.9921,
    lng: 73.3336,
    description: 'Budget-friendly diving destination',
    imageUrl: 'https://via.placeholder.com/400x300?text=Ocean+Blue',
  },
];

// GET /api/v1/resorts
router.get('/', (req: Request, res: Response) => {
  try {
    res.json(resorts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resorts' });
  }
});

// GET /api/v1/resorts/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resort = resorts.find((r) => r.id === parseInt(id as string));

    if (!resort) {
      return res.status(404).json({ error: 'Resort not found' });
    }

    res.json(resort);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resort' });
  }
});

export default router;