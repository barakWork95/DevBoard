import { Router } from "express";
import * as projectController from "../controllers/projectController";

const router = Router();

router.get("/", projectController.findAll);
router.get("/:id", projectController.findById);
router.post("/", projectController.create);
router.patch("/:id", projectController.update);
router.delete("/:id", projectController.deleteById);

export default router;
