import { Router } from "express";
import * as controllers from "../controllers/users.js";

const router = Router()

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);

router.get("/follows", controllers.getFollows);
router.get("/timeline", controllers.getUserTimeline)
router.put("/follow/:followedUserId", controllers.updateFollowings)

router.get("/email/:email", controllers.getUserByEmail);
router.get("/username/:username", controllers.getUserByUsername);
router.get("/:id", controllers.getUser);
router.put("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;