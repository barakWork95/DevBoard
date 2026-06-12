import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    const user = await authService.register({ ...req.body });
    const { password, ...userWithoutPassword } = user;
    return res.status(201).json({ user: userWithoutPassword });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const tokens = await authService.login({ ...req.body });
    return res.status(200).json({ tokens });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
