import express from "express";
import {
  getPets,
  createPet,
  updatePet,
  deletePet
} from "../controllers/pet.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPets);
router.post("/", verifyToken, createPet);
router.put("/:id", verifyToken, updatePet);
router.delete("/:id", verifyToken, deletePet);

export default router;
