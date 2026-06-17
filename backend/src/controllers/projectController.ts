import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export async function findAll(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const projects = await projectService.findAll(req.user.id);
    return res.status(200).json(projects);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function findById(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require project ID" });
    const project = await projectService.findById(
      req.user.id,
      req.params.id as string,
    );
    return res.status(200).json(project);
  } catch (error: any) {
    switch (error.message) {
      case "Project not found":
        return res.status(404).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}

export async function create(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const project = await projectService.create(req.user.id, req.body.name);
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require project ID" });
    const project = await projectService.update(
      req.user.id,
      req.params.id as string,
      req.body,
    );
    return res.status(200).json(project);
  } catch (error: any) {
    switch (error.message) {
      case "Project not found":
        return res.status(404).json({ message: error.message });
      case "Permission denied":
        return res.status(403).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}

export async function deleteById(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require project ID" });
    await projectService.deleteProject(req.user.id, req.params.id as string);
    return res.status(204).send();
  } catch (error: any) {
    switch (error.message) {
      case "Project not found":
        return res.status(404).json({ message: error.message });
      case "Permission denied":
        return res.status(403).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}
