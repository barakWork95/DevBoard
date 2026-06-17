import { Request, Response } from "express";
import { type TaskStatus } from "@prisma/client";
import * as taskService from "../services/taskService";

export async function findAll(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const tasks = await taskService.findAll(
      req.user.id,
      req.query.projectId as string,
    );
    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function findById(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require task ID" });
    const task = await taskService.findById(req.params.id as string);
    return res.status(200).json(task);
  } catch (error: any) {
    switch (error.message) {
      case "Task not found":
        return res.status(404).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}

export async function create(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const project = await taskService.create(
      req.user.id,
      req.body.projectId,
      req.body,
    );
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require task ID" });
    const task = await taskService.update(
      req.user.id,
      req.body.projectId as string,
      { id: req.params.id as string, data: req.body },
    );
    return res.status(200).json(task);
  } catch (error: any) {
    switch (error.message) {
      case "Task not found":
        return res.status(404).json({ message: error.message });
      case "Permission denied":
        return res.status(403).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}

export async function updateAssignee(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require task ID" });
    const task = await taskService.updateAssignee(
      req.user.id,
      req.body.projectId as string,
      req.params.id as string,
      req.body.assigneeId as string,
    );
    return res.status(200).json(task);
  } catch (error: any) {
    switch (error.message) {
      case "Task not found":
        return res.status(404).json({ message: error.message });
      case "Permission denied":
        return res.status(403).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.params.id)
      return res.status(400).json({ message: "Require task ID" });
    const task = await taskService.updateStatus(
      req.user.id,
      req.body.projectId as string,
      req.params.id as string,
      req.body.status as TaskStatus,
    );
    return res.status(200).json(task);
  } catch (error: any) {
    switch (error.message) {
      case "Task not found":
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
      return res.status(400).json({ message: "Require task ID" });
    await taskService.deleteTask(
      req.user.id,
      req.body.projectId as string,
      req.params.id as string,
    );
    return res.status(204).send();
  } catch (error: any) {
    switch (error.message) {
      case "Task not found":
        return res.status(404).json({ message: error.message });
      case "Permission denied":
        return res.status(403).json({ message: error.message });

      default:
        return res.status(400).json({ message: error.message });
    }
  }
}
