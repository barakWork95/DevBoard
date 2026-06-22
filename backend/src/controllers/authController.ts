import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    await authService.register({ ...req.body });
    const data = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json(data);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = await authService.login({ ...req.body });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    authService.logout(req.body.refreshToken);
    return res.status(200).json("Logout successfully");
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const tokens = await authService.refresh(req.body.refreshToken);
    return res.status(200).json(tokens);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
