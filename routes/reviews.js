import { Router } from "express";
import * as controllers from "../controllers/reviews.js"

const router = Router()

// router.get("/", controllers.getReviews);
router.get("/:id", controllers.getReview);
router.post("/", controllers.createReview);
router.put("/:id", controllers.updateReview);
router.delete("/:id", controllers.deleteReview);

export default router;