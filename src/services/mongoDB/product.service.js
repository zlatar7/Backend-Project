import { productModel } from "../../models/product.model.js";

export class ProductService {
  async createProduct(product) {
    try {
      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async upadteProduct(id, data, opt) {
    try {
      const product = await productModel.findByIdAndUpdate(id, data, opt);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id){
    try {
      const product = await productModel.findByIdAndDelete(id)
      return product
    } catch (error) {
      throw error
    }
  }
}
    
    export const productService = new ProductService();