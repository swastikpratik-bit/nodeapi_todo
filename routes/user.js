import express from "express";
import {  GetMyDetails, deleteUser, login, logout, register, toGetAllUsers } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/all", toGetAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router
    .route("/me")
    .get(isAuthenticated, GetMyDetails)
    .delete(isAuthenticated , deleteUser)



export default router;