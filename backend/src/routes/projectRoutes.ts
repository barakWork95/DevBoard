import { Router } from "express";
import { CreateProjectSchema, UpdateProjectSchema } from "@devboard/shared";
import * as projectController from "../controllers/projectController";
import { validate } from "../middleware/validate";

const router = Router();

router.get("/", projectController.findAll);
router.get("/:id", projectController.findById);
router.post("/", validate(CreateProjectSchema), projectController.create);
router.patch("/:id", validate(UpdateProjectSchema), projectController.update);
router.delete("/:id", projectController.deleteById);

export default router;
