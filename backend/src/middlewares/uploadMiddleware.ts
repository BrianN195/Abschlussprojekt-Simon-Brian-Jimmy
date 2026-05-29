import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Route-aware destination: write to locations for resorts, animals for species
    try {
      const base = (req.baseUrl as string) || (req.originalUrl as string) || "";
      if (base.includes("resorts") || base.includes("location")) {
        cb(null, "../frontend/public/images/locations");
        return;
      }
      if (base.includes("species") || base.includes("animal")) {
        cb(null, "../frontend/public/images/animals");
        return;
      }
    } catch (e) {
      // fall through to default
    }
    cb(null, "../frontend/public/images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;