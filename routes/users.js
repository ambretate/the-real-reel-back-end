import { Router } from "express";
import * as controllers from "../controllers/users.js";

const router = Router()

router.get("/", controllers.getUsers);
router.get("/:id", controllers.getUser);
router.get("/:email", controllers.getUserByEmail);
router.get("/:username", controllers.getUserByUsername);
router.post("/", controllers.createUser);
router.put("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;