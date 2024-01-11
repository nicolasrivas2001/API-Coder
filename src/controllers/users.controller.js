import UsersRepository from "../repository/users.repository.js"
import UsersMongo from "../dao/mongo/users.mongo.js"
import { logger } from "../logger.js"

const userService = new UsersRepository(new UsersMongo())

export const findAll = async(req,res) => {
    try {
        const users = await userService.getUsers(req.query)
        res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({ error });
      }
}

export const findByEmail = async(req,res) => {
    const { email } = req.params;
  try {
    const user = await userService.findUserByEmail(email);
    res.status(200).json({ message: "User", user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const findUserById = async(req,res) => {
    try {
        const {uid} = req.params
        const user = await userService.findUserById(uid)
        if(!user){
            return res.status(404).json({message:"Not use found"})
        }
        return res.status(200).json({message:"User found",user})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({ error });
      }
}

export const upDateById = async(req,res) => {
    try {
        const {pid} = req.params
        const data = req.body
        const product = await userService.updateUser(pid,data);
        res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ error });
      }
}

export const createUser = async(req,res) => {
    const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await userService.createUser(req.body);
    //res.status(200).json({ message: "User created", user: createdUser });
    res.status(200).json({response:createdUser});
  } catch (error) {
    logger.error(error)
    return res.status(500).json({ error });
  }
}


export const deleteUser = async(req,res) => {
  const { idUser } = req.params;
  try {
    await userService.deleteUser(idUser);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}