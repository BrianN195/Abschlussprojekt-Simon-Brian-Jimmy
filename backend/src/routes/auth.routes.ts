import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import bcrypt from "bcrypt";
import UserModel from "../db/models/UserModel";
import apiLimiter from "../middlewares/apiLimiter";
import EmailVerificationToken from "../db/models/EmailVerificationTokenModel";
import transporter from "../mail/mailer";
import crypto from "crypto";
import authMiddleware from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const uploadsRoot = path.resolve(process.cwd(), "public/uploads");
const profileUploadsDir = path.join(uploadsRoot, "profiles");

fs.mkdirSync(profileUploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, profileUploadsDir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
//sicherheitshalber erstmal nur auskommentiert
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images allowed"));
    }

    cb(null, true);
  },
});

function serializeUser(req: Request, user: UserModel) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage
      ? `${req.protocol}://${req.get("host")}${user.profileImage}`
      : null,
    bio: user.bio,
    gender: user.gender,
    birthDate: user.birthDate,
    role: user.role,
  };
}

// POST /api/v1/auth/register
router.post("/register", apiLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password, username, gender, birthDate } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists (später: DB-Abfrage)
    const userExists = await UserModel.findOne({
      where: { email },
    });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
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
    //=========================================
    //=====Folgend für email verifikation======
    //=========================================

  //   const token = crypto.randomBytes(32).toString("hex");

  //   await EmailVerificationToken.create({
  //     token,
  //     UserId: newUser.id,
  //     expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1h
  //   });

  //   const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  //   await transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to: newUser.email,
  //     subject: "Email bestätigen",
  //     html: `
  //   <h1>Bitte bestätige deine Email</h1>
  //   <a href="${verificationLink}">Jetzt bestätigen</a>
  // `,
  //   });

    //=========================================
    //=========================================
    //=========================================

    res.status(201).json({
      user: serializeUser(req, newUser),
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/v1/auth/login
router.post("/login", apiLimiter, async (req: Request, res: Response) => {
  console.log("Im login backend");
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    const user = await UserModel.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // if (!user.isVerified) {
    //   return res.status(403).json({
    //     error: "Please verify your email first",
    //   });
    // }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: serializeUser(req, user),
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/v1/auth/me (Protected)
router.get("/me", async (req: Request, res: Response) => {
  console.log("ME ROUTE HIT 1");
  try {
    console.log("ME ROUTE HIT 2");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      ...serializeUser(req, user),
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// PUT /api/v1/auth/me (Protected)
router.put(
  "/me",
  upload.single("avatar"),
  apiLimiter,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await UserModel.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { username, bio, gender, birthDate, profileImage } = req.body;
      const normalizedBirthDate =
        birthDate === undefined || birthDate === null
          ? undefined
          : String(birthDate).trim() === ""
            ? null
            : String(birthDate).trim();

      if (username !== undefined) {
        user.username = username;
      }
      if (bio !== undefined) {
        user.bio = bio;
      }
      if (gender !== undefined) {
        user.gender = gender;
      }
      if (normalizedBirthDate !== undefined) {
        user.birthDate = normalizedBirthDate;
      }
      if (req.file) {
        // process uploaded file (resize + convert to webp)
        const uploadedPath = path.join(profileUploadsDir, req.file.filename);
        const optimizedFilename = `${Date.now()}-${path.parse(req.file.filename).name}.webp`;
        const optimizedPath = path.join(profileUploadsDir, optimizedFilename);

        try {
          await sharp(uploadedPath)
            .resize(512, 512, { fit: "cover" })
            .webp({ quality: 80 })
            .toFile(optimizedPath);

          // remove original uploaded file
          try {
            fs.unlinkSync(uploadedPath);
          } catch (e) {
            /* ignore */
          }

          // delete previous avatar file if local
          if (
            user.profileImage &&
            typeof user.profileImage === "string" &&
            user.profileImage.startsWith("/uploads/profiles/")
          ) {
            const oldPath = path.join(
              process.cwd(),
              "public",
              user.profileImage,
            );
            try {
              if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            } catch (e) {
              /* ignore */
            }
          }

          user.profileImage = `/uploads/profiles/${optimizedFilename}`;
        } catch (e) {
          console.error("Sharp processing failed:", e);
          // if sharp fails, fallback to the raw uploaded file URL
          user.profileImage = `/uploads/profiles/${req.file.filename}`;
        }
      } else if (profileImage !== undefined) {
        user.profileImage = profileImage;
      }

      await user.save();

      res.json(serializeUser(req, user));
    } catch (error) {
      console.error("Profile update failed:", error);

      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError
      ) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      return res.status(400).json({ error: message });
    }
  },
);

// PUT /api/v1/auth/me (Protected)
router.put(
  "/me",
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await UserModel.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
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
            .resize(512, 512, { fit: "cover" })
            .webp({ quality: 80 })
            .toFile(optimizedPath);

          // remove original uploaded file
          try {
            fs.unlinkSync(uploadedPath);
          } catch (e) {
            /* ignore */
          }

          // delete previous avatar file if local
          if (
            user.profileImage &&
            typeof user.profileImage === "string" &&
            user.profileImage.startsWith("/uploads/profiles/")
          ) {
            const oldPath = path.join(
              process.cwd(),
              "public",
              user.profileImage,
            );
            try {
              if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            } catch (e) {
              /* ignore */
            }
          }

          user.profileImage = `/uploads/profiles/${optimizedFilename}`;
        } catch (e) {
          console.error("Sharp processing failed:", e);
          // if sharp fails, fallback to the raw uploaded file URL
          user.profileImage = `/uploads/profiles/${req.file.filename}`;
        }
      } else if (profileImage !== undefined) {
        user.profileImage = profileImage;
      }

      await user.save();

      res.json(serializeUser(req, user));
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  },
);
//==========================================================
// router.get("/verify-email/:token", async (req, res) => {
//   try {
//     const { token } = req.params;

//     const record = await EmailVerificationToken.findOne({
//       where: { token },
//     });

//     if (!record) {
//       return res.status(400).json({ error: "Invalid token" });
//     }

//     if (record.expiresAt < new Date()) {
//       return res.status(400).json({ error: "Token expired" });
//     }

//     const user = await UserModel.findByPk(record.UserId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.isVerified = true;
//     await user.save();

//     await record.destroy();

//     res.json({ message: "Email verified successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Verification failed" });
//   }
// });

// router.get("/verify-email/:token", async (req: Request, res: Response) => {
//   const { token } = req.params;

//   if (!token) {
//     return res.status(400).json({
//       message: "Token fehlt",
//     });
//   }

//   try {
//     // User mit Token finden
//     const user = await UserModel.findOne({
//       where: {
//         emailToken: token,
//       },
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Ungültiger oder abgelaufener Token",
//       });
//     }

//     // User aktivieren + Token löschen
//     user.isVerified = true;
//     user.emailToken = null;

//     await user.save();

//     return res.status(200).json({
//       message: "E-Mail erfolgreich bestätigt",
//     });
//   } catch (error) {
//     console.error("VERIFY EMAIL ERROR:", error);

//     return res.status(500).json({
//       message: "Serverfehler bei E-Mail-Verifizierung",
//     });
//   }
// });
//====================
router.post("/make-admin",authMiddleware, roleMiddleware(["admin"]), async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    return res.json({
      message: "User promoted to admin",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
export default router;
