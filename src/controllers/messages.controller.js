import { messagesManager } from "../dao/mongo/messages.mongo.js";


export const findAllMessage = async (req, res) => {
    try {
      const messages = await messagesManager.get();
      res.status(200).json({ messages });
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ error });
    }
}

export const createMessage = async (req, res) => {
    try {
      const {message} = req.body
      const messages = await messagesManager.create(message);
      res.status(200).json({ messages });
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ error });
    }
}