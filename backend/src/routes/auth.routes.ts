import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';
import bcrypt from 'bcrypt';
import UserModel from '../db/models/UserModel';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const uploadsRoot = path.resolve(process.cwd(), 'public/uploads');
const profileUploadsDir = path.join(uploadsRoot, 'profiles');

fs.mkdirSync(profileUploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, profileUploadsDir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

function serializeUser(req: Request, user: UserModel) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage ? `${req.protocol}://${req.get('host')}${user.profileImage}` : null,
    bio: user.bio,
    gender: user.gender,
    birthDate: user.birthDate,
  };
}

// POST /api/v1/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username, gender, birthDate } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists (später: DB-Abfrage)
    const userExists = await UserModel.findOne({
      where: { email }
    });
    if (userExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      passwordHash: hashedPassword,
      username,
      gender: gender || null,
      birthDate: birthDate || null,
    });



    res.status(201).json({
      user: serializeUser(req, newUser),
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});


// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response) => {
  console.log("Im login backend")
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing username or password' });
    }

    const user = await UserModel.findOne({
      where: { username }
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: serializeUser(req, user),
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/v1/auth/me (Protected)
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findByPk(decoded.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      ...serializeUser(req, user),
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// PUT /api/v1/auth/me (Protected)
router.put('/me', upload.single('avatar'), async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { username, bio, gender, birthDate, profileImage } = req.body;

    if (username !== undefined) {
      user.username = username;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    if (gender !== undefined) {
      user.gender = gender;
    }
    if (birthDate !== undefined) {
      user.birthDate = birthDate;
    }
    if (req.file) {
      // process uploaded file (resize + convert to webp)
      const uploadedPath = path.join(profileUploadsDir, req.file.filename);
      const optimizedFilename = `${Date.now()}-${path.parse(req.file.filename).name}.webp`;
      const optimizedPath = path.join(profileUploadsDir, optimizedFilename);

      try {
        await sharp(uploadedPath)
          .resize(512, 512, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(optimizedPath);

        // remove original uploaded file
        try { fs.unlinkSync(uploadedPath); } catch (e) { /* ignore */ }

        // delete previous avatar file if local
        if (user.profileImage && typeof user.profileImage === 'string' && user.profileImage.startsWith('/uploads/profiles/')) {
          const oldPath = path.join(process.cwd(), 'public', user.profileImage);
          try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); } catch (e) { /* ignore */ }
        }

        user.profileImage = `/uploads/profiles/${optimizedFilename}`;
      } catch (e) {
        console.error('Sharp processing failed:', e);
        // if sharp fails, fallback to the raw uploaded file URL
        user.profileImage = `/uploads/profiles/${req.file.filename}`;
      }
    } else if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();

    res.json(serializeUser(req, user));
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;