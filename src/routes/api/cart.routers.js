import { Router } from "express";
import { cartController } from "../../controllers/cart.controller.js";
import { authorizations } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { cartDto } from "../../dtos/cart.dto.js";
import passport from "passport";

const cartRouter = Router();

cartRouter.get("/", cartController.getAll)
cartRouter.get("/:cid", cartController.getById)
cartRouter.post("/", validate(cartDto), passport.authenticate("jwt",{session: false}),
    authorizations(["user"]), cartController.create)
cartRouter.post("/:cid/purchase", cartController.purchase);
cartRouter.put("/:cid", cartController.update)
cartRouter.delete("/:cid", cartController.delete)

export default cartRouter