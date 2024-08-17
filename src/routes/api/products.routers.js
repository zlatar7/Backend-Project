import { Router } from "express";
import { authorizations } from "../../middlewares/authorization.middleware.js"
import { validate } from "../../middlewares/validation.middleware.js"
import { productController } from "../../controllers/product.controller.js";
import { productDto } from "../../dtos/product.dto.js"
import passport from "passport";

const productsRouter = Router();

productsRouter.get("/", productController.getAll)
productsRouter.get("/:pid", productController.getById)
productsRouter.post("/", passport.authenticate("jwt", { session: false }), authorizations(["admin"]),
    validate(productDto) , productController.create)
productsRouter.put("/:pid", passport.authenticate("jwt", { session: false }),
    authorizations(["admin"]), productController.update)
productsRouter.delete("/:pid",passport.authenticate("jwt", { session: false }),
    authorizations(["admin"]), productController.delete)

export default productsRouter