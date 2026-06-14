import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const [prefix, token] = authHeader.toString().split(" ");
  if (prefix != "Bearer")
    return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
