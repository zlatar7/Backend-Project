import { Router } from "express";
import { userController } from "../../controllers/user.controller.js"

const usersRouter = Router();

usersRouter.get("/", userController.getAll);
usersRouter.get("/:uid", userController.getById);
usersRouter.post("/", userController.create)
usersRouter.put("/:uid", userController.update);
usersRouter.delete("/:uid", userController.delete);

export default usersRouter;