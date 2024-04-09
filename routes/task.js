import express from "express";
import { allTask, deleteTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();


router.post("/new", isAuthenticated ,newTask);
router.get("/my", isAuthenticated, allTask);

router.route("/:id").put(isAuthenticated, updateTask).delete( isAuthenticated, deleteTask)

export default router;