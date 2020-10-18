import express from "express";
import extensionRouter from "./extension";

const router = express.Router();

router.use("/extension", extensionRouter);

export default router;
