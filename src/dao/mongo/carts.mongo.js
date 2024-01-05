import CustomError from "../../errors/error.generator.js";
import { ErrorsMessages } from "../../errors/errors.enum.js";
import { cartsModel } from "../models/carts.model.js";
import { ticketsManager } from "./tickets.mongo.js"
import {v4 as uuidv4} from "uuid"

export default class CartsManager {

  async get(){
    const response = await cartsModel.find()
    return response;
  }
  async create() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product");
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    if(cart){
      const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct)
      );

      if (productIndex === -1) {
        cart.products.push({ product: idProduct, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }
      return cart.save();
    } else{
      CustomError.generateError(ErrorsMessages.CART_NOT_FOUNT,500,ErrorsMessages.CART_NOT_FOUNT)
    }
    
  }

  async quantityUpdate(idCart,idProduct,quantity){
    const cart = await cartsModel.findById(idCart);
    if(!cart){
      CustomError.generateError(ErrorsMessages.CART_NOT_FOUNT,500,ErrorsMessages.CART_NOT_FOUNT)
    }
    const productIndex = cart.products.findIndex((p) =>
    p.product.equals(idProduct))

    if (productIndex === -1){
      return("Producto No Existente")
    } else{
      cart.products[productIndex]=quantity
    }
    return cart.save();
  }

  async update(idCart,newProducts){
    const cart = await cartsModel.findById(idCart);
    if(!cart){
      CustomError.generateError(ErrorsMessages.CART_NOT_FOUNT,500,ErrorsMessages.CART_NOT_FOUNT)
    }
    cart.products = newProducts.products
    return cart.save();
  }
 

  async deleteProductOfCart(idCart,idProduct){
    const cart = await cartsModel.findById(idCart);
    if(!cart){
      v
    }
    const productIndex = cart.products.findIndex((p) =>
    p.product.equals(idProduct))

    if (productIndex === -1){
      CustomError.generateError(ErrorsMessages.PRODUCT_NOT_FOUNT,500,ErrorsMessages.PRODUCT_NOT_FOUNT)
    } else{
      cart.products.splice(productIndex,1)
    }
    return cart.save();
  }

  async deleteCartProducts(idCart){
    const cart = await cartsModel.findById(idCart);
    if(!cart){
      CustomError.generateError(ErrorsMessages.CART_NOT_FOUNT,500,ErrorsMessages.CART_NOT_FOUNT)
    }
    cart.products = []
    return cart.save();
  }

  async delete (id){
    const cart = await cartsModel.delete(id)
    return cart
  }
 
  async purchase (idCart,user) {
    const cart = await cartsModel.findById(idCart).populate("products.product");
    const products = cart.products
    let avaiableProducts = []
    let unavaiableProducts = []
    let totalAmount = 0
    for (let item of products){
        if(item.product.stock >= item.quantity){
            avaiableProducts.push(item)
            item.product.stock -=item.quantity
            await item.product.save()
            totalAmount += item.quantity * item.product.price
        } else {
            unavaiableProducts.push(item)
        }
    }
    cart.products = unavaiableProducts
    await cart.save()
    if (avaiableProducts.length){
        const ticket = {
            code: uuidv4(),
            purchase_datatime: new Date(),
            amount: totalAmount,
            purchaser: user.user.email
        }
        await ticketsManager.createTicket(ticket)
        return {avaiableProducts, totalAmount}
    }
    return {unavaiableProducts}
    
}

}

export const cartsManager = new CartsManager();