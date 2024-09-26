import express from "express";
import dotev from "dotenv";
import cors from "cors";
import path from "path";
import { mongodb } from "./config/db.js";

import productroutes from "./routes/product.route.js";
const app = express();
app.use(express.json());
app.use(cors());
dotev.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
app.use("/api/products", productroutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(5000, () => {
  console.log(`app listening on ${PORT}`);
  mongodb();
});
