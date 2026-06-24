import { Router } from "express";
import {
  AddMembersSchema,
  CreateProjectSchema,
  UpdateProjectSchema,
} from "@devboard/shared";
import * as projectController from "../controllers/projectController";
import { validate } from "../middleware/validate";

const router = Router();

router.get("/", projectController.findAll);
router.get("/:id", projectController.findById);
router.get("/:id/members", projectController.findMembers);
router.post(
  "/:id/members",
  validate(AddMembersSchema),
  projectController.addMembers,
);
router.post("/", validate(CreateProjectSchema), projectController.create);
router.patch("/:id", validate(UpdateProjectSchema), projectController.update);
router.delete("/:id", projectController.deleteById);

export default router;
