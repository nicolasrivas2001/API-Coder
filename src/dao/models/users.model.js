import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  isGithub:{
    type: Boolean,
    default: false,
    required:false
  },
  cart: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "carts" }],
  },
  role: {
    type: String
  },
  orders: {
    type: [
      {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Orders"
      }
    ],
    default:[]
  }
});

usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model("Users", usersSchema);