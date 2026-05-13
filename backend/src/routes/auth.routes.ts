import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../db/models/UserModel';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        gender: newUser.gender,
        birthDate: newUser.birthDate
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});


// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response) => {
  console.log("Im login backend")
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await UserModel.findOne({
      where: { email }
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
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        gender: user.gender,
        birthDate: user.birthDate
      },
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
      id: user.id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      birthDate: user.birthDate,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;