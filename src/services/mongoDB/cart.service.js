import { cartModel } from "../../models/cart.model.js";

export class CartService {

  async createCart(data) {
    try {
      const newCart = await cartModel.create(data);
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async purchase(id) {
    try {
      const cart = await cartModel.findById(id).populate("product_id").populate("user_id","email")
      return cart
    } catch (error) {
        throw error
    }
  }

  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async updateCart(id, data, opts) {
    try {
        const cart = await cartModel.findByIdAndUpdate(id, data, opts);
        return cart
    } catch (error) {
        throw error;
        
    }
  }
  async deleteCart(id) {
    try {
        const cart = await cartModel.findByIdAndDelete(id)
        return cart
        
    } catch (error) {
        throw error
    }
  }
}

export const cartService = new CartService();