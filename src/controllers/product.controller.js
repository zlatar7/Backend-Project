import { productService } from "../services/mongoDB/product.service.js";

class ProductController {
  
  async getAll(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);

    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los productos",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { pid } = req.params;

      const product = await productService.getProductById(pid);

      if (!product) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }
      res.status(200).json(product);

    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el producto",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, price, stock } = req.body;

      if (!title || !price) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const product = await productService.createProduct({title,price,stock});
      res.status(201).json(product);

    } catch (error) {
      res.status(500).json({
        error: "Error al crear el producto",
        details: error,
      });
    }
  }
  
  async update(req, res) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const opt = { new: true };
      const product = await productService.upadteProduct(pid, data, opt);
      res.status(200).json(product);

    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el producto",
        details: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.deleteProduct(pid);
      res.status(200).json(product);
  
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el producto",
        details: error.message
      });
    }
  }
}

export const productController = new ProductController();