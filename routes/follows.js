import { Router } from "express";
import * as controllers from "../controllers/follows.js"

const router = Router()

router.get("/", controllers.getFollows);
router.get("/:id", controllers.getFollow);
router.post("/", controllers.createFollow);
router.put("/:id", controllers.updateFollow);
router.delete("/:id", controllers.deleteFollow);

export default router;