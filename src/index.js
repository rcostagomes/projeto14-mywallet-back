import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes.js";
import transaction from "../src/routes/transactionRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.use(transaction);
app.get("/status", (req, res) => {
  return res.send("ok");
});

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
