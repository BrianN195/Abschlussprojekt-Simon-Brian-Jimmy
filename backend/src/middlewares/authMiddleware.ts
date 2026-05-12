//würde gerne ich machen, wenn  in ordnung (Brian)

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../db/models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Request erweitern (wichtig für TypeScript)
export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
    }
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        const user = await UserModel.findByPk(decoded.id);

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
    }catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default authMiddleware