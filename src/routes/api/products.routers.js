import { Router } from "express";
import { productModel } from "../../models/product.model.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next)=>{
    try {
        const products = await productModel.find();
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/:pid", async (req, res, next)=>{
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid);
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

productsRouter.post("/", async (req, res, next)=>{

    try {
        const data = req.body;
        const product = await productModel.create(data);

        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

productsRouter.put("/:pid", async (req, res, next)=>{
    try {
        const { pid } = req.params
        const data = req.body
        const opts = { new: true }
        const product = await productModel.findByIdAndUpdate(pid, data, opts)

        res.status(200).json(product)

    } catch (error) {
        next(error)
    }
})

productsRouter.delete("/:pid", async (req, res, next)=>{
    try {
        const { pid } = req.params;
        const product = await productModel.findByIdAndDelete(pid);

        res.status(200).json(product)

    } catch (error) {
        next(error)
    }
})

export default productsRouter