import express from "express";
import { insert, list } from "../controllers/transactionController.js";
import { authmiddlewares } from "../middlewares/authmiddlewares.js";
import { transactionmiddlewares } from "../middlewares/transactionmiddlewares.js";

const router = express.Router();
router.post("/transaction", authmiddlewares, transactionmiddlewares, insert);

router.get("/transaction", authmiddlewares, list);

export default router;
