import { Router } from "express";
import {cartModel} from "../../models/cart.model.js"
import { Types } from "mongoose";

const cartRouter = Router();

cartRouter.get("/", async (req, res, next)=> {

    try {
        const carts = await cartModel.find()
        res.status(200).json(carts);
    } catch (error) {
        next(error)
    }
})

cartRouter.post("/", async (req, res, next)=>{
    try {
        const data = req.body
        const cart = await cartModel.create(data)
        res.status(200).json(cart)       
    } catch (error) {
        next(error)
    }
})

cartRouter.put("/:cid", async (req, res, next)=>{
    try {
        const { cid } = req.params;
        const data = req.body;
        const opts = {new: true}
        const isValidID = Types.ObjectId.isValid(cid);

        if (isValidID) {
            const cart = await cartModel.findByIdAndUpdate(cid, data, opts)
            res.status(200).json(cart)
        } else {
            throw Error;
        }

    } catch (error) {
        next(error)
    }
})

cartRouter.delete("/:cid", async (req, res, next)=>{
    try {
        const {cid} = req.params
        const cart = await cartModel.findByIdAndDelete(cid);

        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }

})

export default cartRouter