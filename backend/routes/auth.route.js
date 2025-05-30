import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
