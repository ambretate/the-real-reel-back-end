import { Router } from "express";
import * as controllers from "../controllers/movies.js";

const router = Router();

router.get("/", controllers.getMovies);
router.get("/:id", controllers.getMovie);
router.get("/title/:title", controllers.getMoviesByTitle);
router.get("/genre/:genre", controllers.getMoviesByGenre);
router.post("/", controllers.createMovie);
router.put("/:id", controllers.updateMovie);
router.delete("/:id", controllers.deleteMovie);

export default router;
