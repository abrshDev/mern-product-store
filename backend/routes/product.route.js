import express from "express";

import {
  createproduct,
  deleteproduct,
  getallproducts,
  updateproduct,
} from "../controllers/product.controller.js";
const router = express.Router();
router.post("/", createproduct);
router.get("/", getallproducts);
router.delete("/:id", deleteproduct);
router.put("/:id", updateproduct);

export default router;
