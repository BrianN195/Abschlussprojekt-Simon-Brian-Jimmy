import express, { Express, Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.routes';
import favoritesRoutes from './routes/favorites.routes';
import connectRoutes from './routes/connect.routes'
import speciesRoutes from './routes/species.routes';
import resortsRoutes from './routes/resorts.routes';
import searchRoutes from './routes/search.routes'
import { sequelize } from './db/config/database';
import "./db/models/index"
import AnimalModel from './db/models/AnimalModel';
import weatherRoutes from './routes/weather.routes';
import localeMiddleware from './middlewares/localeMiddleware';
import { seed } from './db/seeders/seed';

const projectRoot = path.resolve(__dirname, '..', '..');
const frontendDistPath = path.join(projectRoot, 'frontend', 'dist');

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 10000;
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
// Locale middleware: stellt `req.locale` / `res.locals.locale` bereit
app.use(localeMiddleware);
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public/uploads')));
app.use("/images", express.static("public/images"));

// Serve Frontend (static files)
app.use(express.static(frontendDistPath));

app.use('/api/v1/weather', weatherRoutes);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/species', speciesRoutes);
app.use('/api/v1/resorts', resortsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/connect', connectRoutes)

// SPA Fallback: serve index.html for client-side routing
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  if (req.path.startsWith('/api')) {
    next();
    return;
  }

  const indexPath = path.join(frontendDistPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ Index.html not found at: ${indexPath}`);
    res.status(404).json({ error: 'Frontend not found' });
    return;
  }

  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`❌ Error serving index.html: ${err.message}`);
      res.status(500).json({ error: 'Error serving frontend' });
    }
  });
});

// Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database synced');

    // Auto-seed if database is empty
    try {
      const animalCount = await AnimalModel.count();
      if (animalCount === 0) {
        console.log('🌱 Database is empty, running seed...');
        await seed();
        console.log('✅ Seed completed');
      } else {
        console.log(`✅ Database already has ${animalCount} animals, skipping seed`);
      }
    } catch (err) {
      console.error('⚠️ Error during auto-seed:', err);
    }

    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  });
  })

  .catch((error) => {
    console.error('Unable to sync database:', error);
  });

export default app;