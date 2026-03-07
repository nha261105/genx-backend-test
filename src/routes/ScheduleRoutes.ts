import { Router } from "express";
import { generateScheduleController } from "../controllers/ScheduleController.js";

const router = Router()

router.post("/generator", generateScheduleController);

export default router;