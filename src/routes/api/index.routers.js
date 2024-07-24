import { Router } from "express";
import usersRouter from "./users.routers.js";
import cartRouter from "./cart.routers.js";
import productsRouter from "./products.routers.js";
import sessionsRouters from "./sessions.routers.js";

const apiRouter = Router()

apiRouter.use("/user", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/cart", cartRouter)
apiRouter.use("/sessions", sessionsRouters)

export default apiRouter;