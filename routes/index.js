import { Router } from "express";
import movieRoutes from "./movies.js";
import userRoutes from "./users.js";
import reviewRoutes from "./reviews.js";

const router = Router();

router.get("/", (request, response) =>
  response.send("Welcome to the Real Reel API route")
);

router.use("/movies", movieRoutes);
router.use("/users", userRoutes);
// router.use("/reviews", reviewRoutes);

export default router;