import { Router } from "express";
import apiRouter from "../routes/api/index.routers.js";
import viewsRouter from "../routes/views/views.routers.js";

const router = Router()

router.use("/api",apiRouter)
router.use("/", viewsRouter)

export default router