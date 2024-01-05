import CustomError from "../../errors/error.generator.js";
import { ErrorsMessages } from "../../errors/errors.enum.js";
import { usersModel } from "../models/users.model.js";

export default class UsersManager {
  // async findAll() {
  //   const response = await usersModel.find();
  //   return response;
  // }
  //Paginate
  async get(obj) {
    const { limit = 20, page = 1, ...filter } = obj;

    const response = await usersModel.paginate(filter, { limit, page });
    const info = {
      count: response.totalDocs,
      pages: response.totalPages,
      next: response.hasNextPage
        ? `http://localhost:8080/api/users?page=${response.nextPage}`
        : null,
      prev: response.hasPrevPage
        ? `http://localhost:8080/api/users?page=${response.prevPage}`
        : null,
    };
    const results = response.docs;
    return { info, results };
  }

  async findById(id) {
    const response = await usersModel.findById(id);
    if(response){
      return response;
    } else{
      CustomError.generateError(ErrorsMessages.USER_NOT_FOUND,500,ErrorsMessages.USER_NOT_FOUND)
    }
  }

  async findByEmail(email) {
    const response = await usersModel
      .findOne({ email });
      if(response){
        return response;
      } else{
        CustomError.generateError(ErrorsMessages.USER_NOT_FOUND,500,ErrorsMessages.USER_NOT_FOUND)
      }
  }

  async create(obj) {
    const response = await usersModel.create(obj);
    return response;
  }

  async update(id, obj) {
    const response = await usersModel.updateOne({ _id: id }, obj);
    if(response){
      return response;
    } else{
      CustomError.generateError(ErrorsMessages.USER_NOT_FOUND,500,ErrorsMessages.USER_NOT_FOUND)
    }
  }

  async delete(id) {
    const response = await usersModel.deleteOne({ _id: id });
    if(response){
      return response;
    } else{
      CustomError.generateError(ErrorsMessages.USER_NOT_FOUND,500,ErrorsMessages.USER_NOT_FOUND)
    }
  }
}

export const usersManager = new UsersManager();