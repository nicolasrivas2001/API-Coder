import { productsModel } from "../models/products.model.js";

class ProductsManager {
  async findAll({limit = 10, page = 1, sort = {}, query = {} } = {}) {
    
    const sortOptions = {
      "asc": {price:1},
      "desc": {price:-1},
      "default": {created:-1}
    }

    const sortOrder = sortOptions[sort]  || sortOptions["default"]

    const options = {
      page:page,
      limit:limit,
      sort:sortOrder,
      lean:true
    }

    const result = await productsModel.paginate(query,options);
    return {
      status:"success",
      payload: result,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage? `http://localhost:8080/api/products?page=${result.nextPage}` : null
    };
  }

  async findById(id) {
    const result = await productsModel.findById(id);
    return result;
  }

  async createOne(obj) {
    const result = await productsModel.create(obj);
    return result;
  }

  async updateOne(id, obj) {
    const result = await productsModel.updateOne({ _id: id }, obj);
    return result;
  }

  async deleteOne(id) {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}

export const productsManager = new ProductsManager();