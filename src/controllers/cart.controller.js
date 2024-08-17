import { cartService } from "../services/mongoDB/cart.service.js" ;
import { Types } from "mongoose";
import { v4 as uuid } from 'uuid';
import { productController } from "./product.controller.js";
import { ticketService } from "../services/mongoDB/ticket.service.js";

class CartController {
  
  async getAll(req, res) {
    try {
      const cart = await cartService.getCarts();
      res.status(200).json(cart);

    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el carrito",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({
          error: "Carrito no encontrado",
        });
      }
      res.status(200).json(cart);

    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el carrito",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {user_id, product_id} = req.body;
      if (!user_id || !product_id) {
        return res.status(400).json({
          error: "Falta información",
        });
      }
        cartService.createCart(req.body).then(resp=>{
          return res.status(201).json(resp);
      })

    } catch (error) {
      res.status(500).json({
        error: "Error al crear el producto",
        details: error,
      });
    }
  }

  async addProduct (req, res) {
    try {
      const { product_id, quantity } = req.body;
      const { cid } = req.params
  
      const productExists = await productController.getById(product_id);
      console.log(productExists)
  
      if (!productExists) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }
  
      const cart = await cartService.getCartById(cid);
      const isProductInCart = cart.products.find((p) => p.product === product_id);
  
      if (isProductInCart) {
        cart.products.find((p) => p.product === product_id).quantity += quantity;
  
        cart.save();
  
        res.json(cart);
      } else {
        cart.products.push({
          product: product_id,
          quantity,
        });
  
        // cart.save();
  
        res.json(cart);
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al agregar producto al carrito",
        details: error.message,
      });
    }
  }

  async purchase(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.purchase(cid);
      
      if (!cart) {
        return res.status(404).json({
          error: "No se encontró el carrito",
        });
      }
      // Valida si hay stock suficiente
      cart.product_id.forEach((p) => {
        if (p.stock <= cart.quantity) {
          throw new Error(
            `El producto ${p.title} no tiene stock suficiente`
          );
        }
      });
      // Descuenta stock del producto y finaliza la compra

      ticketService.create({
        code: uuid(),
        purchase_datetime: new Date(),
        amount: cart.product_id.reduce(
            (acc, curr) => acc + cart.quantity * curr.price, 0),
          purchaser: cart.user_id.email
        })
        .then(resp=> {
          res.status(200).json(resp);
        })
          
        } catch (error) {
      res.status(500).json({
        error: "Error al finalizar la compra",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
        const { cid } = req.params;
        const data = req.body;
        const opts = {new: true}
        const isValidID = Types.ObjectId.isValid(cid);

        if (isValidID) {
            const cart = await cartService.updateCart(cid, data, opts);
            res.status(200).json(cart)
        } else {
            throw Error;
        }
    } catch (error) {
        next(error)
    }
  }

  async delete(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteCart(cid);
      res.status(200).json(cart);
  
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el carrito",
        details: error.message
      });
    }
  }
}

export const cartController = new CartController();