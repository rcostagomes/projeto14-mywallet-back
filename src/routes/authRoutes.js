import express from "express";
import {singIn, singUp } from "../controllers/authController.js"

const router = express.Router();
router.post("/singUp", singUp);
router.post("/singIn", singIn);

export default router