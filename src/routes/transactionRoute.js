import {
    getTransaction,
    postTransaction,
  } from "../controllers/transactionController.js";
  
  import { Router } from "express";
  import { getToken } from "../middlewares/transactionmiddlewares.js";
  
  const router = Router()
  router.use(getToken)
  
  router.post("/transaction", postTransaction);
  
  router.get("/transaction", getTransaction);
  
  
  export default router;