import { Request, Response } from "express";
import * as statsService from "../services/statsService";

export async function getStats(req: Request, res: Response) {
  const userId = req.user!.id;
  const stats = await statsService.getStats(userId);
  res.json(stats);
}
