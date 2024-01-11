import ProductsRepository from "../repository/products.repository.js"
import ProductsMongo from "../dao/mongo/products.mongo.js"
import { logger } from "../logger.js";

const productService = new ProductsRepository(new ProductsMongo())

export const findAll = async (req, res) => {
    try {
      const products = await productService.getProducts(req.query);
      res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const findById = async (req, res) => {
    try {
      const {pid} = req.params
      const product = await productService.findProductById(pid);
      res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const updateById = async (req, res) => {
    try {
      const {pid} = req.params
      const data = req.body
      logger.info(data,pid)
      const product = await productService.updateProduct(pid,data);
      res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const createProduct = async (req, res) => {
    try {
      const createdProduct = await productService.createProduct(req.body);
      res
        .status(200)
        .json({ message: "Product created", product: createdProduct });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
      const product = await productService.deleteProduct(idProduct);
      res.status(200).json({ message: "Product deleted" , product});
    } catch (error) {
      return res.status(500).json({ error });
    }
}