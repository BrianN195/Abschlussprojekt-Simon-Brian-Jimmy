import { Request, Response, NextFunction } from "express";

const SUPPORTED = ["en", "de", "fr", "es", "ar", "zh"];

export default function localeMiddleware(req: Request, res: Response, next: NextFunction) {
  const q = (req.query.lang as string) || "";
  const header = req.header("accept-language") || "";
  const requested = (q || header.split(",")[0] || "").trim().toLowerCase();
  const base = requested.split("-")[0] ?? "";

  const resolved = SUPPORTED.includes(base) ? base : "en";

  (req as any).localeRequested = requested || null;
  (req as any).locale = resolved;
  res.locals.locale = resolved;

  next();
}