import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/", taskController.findAll);
router.get("/:id", taskController.findById);
router.post("/", taskController.create);
router.patch("/:id", taskController.update);
router.patch("/:id/assignee", taskController.updateAssignee);
router.patch("/:id/status", taskController.updateStatus);
router.delete("/:id", taskController.deleteById);

export default router;
