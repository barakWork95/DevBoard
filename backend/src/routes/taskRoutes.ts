import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  CreateTaskSchema,
  UpdateAssigneeSchema,
  UpdateStatusSchema,
  UpdateTaskSchema,
} from "@devboard/shared";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/", taskController.findAll);
router.get("/:id", taskController.findById);
router.post("/", validate(CreateTaskSchema), taskController.create);
router.patch("/:id", validate(UpdateTaskSchema), taskController.update);
router.patch(
  "/:id/assignee",
  validate(UpdateAssigneeSchema),
  taskController.updateAssignee,
);
router.patch(
  "/:id/status",
  validate(UpdateStatusSchema),
  taskController.updateStatus,
);
router.delete("/:id", taskController.deleteById);

export default router;
