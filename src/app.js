import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils/utils.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js"
import usersRouter from "./routes/users.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import messagesRouter from "./routes/messages.router.js"
import loggerRouter from "./routes/logger.router.js"
import moockingProductsRouter from "./routes/mocking.routes.js"
import { productsManager } from "./dao//mongo/products.mongo.js";
import session from "express-session";
import { Server } from "socket.io";
import "./dao/configDB.js";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport.js"
import config from "./config.js"
import { errorMiddleware } from "./middlewars/errors.middlewars.js";
import { swaggerSetup } from "./utils/swagger.js";
import swaggerUi from "swagger-ui-express";


const URI = config.mongo_uri
const app = express();

app.use(session({
  store: new MongoStore({
    mongoUrl:URI
  }),
  secret: "secretSession",
  cookie: {maxAge:60000},
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SecretCookie"))

//passport
app.use(passport.initialize())
app.use(passport.session())

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/mockingproducts", moockingProductsRouter);
app.use("/api/loggerTest", loggerRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

app.use(errorMiddleware)






const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  socket.on("newMessage", async(message) => {
    await messagesManager.createOne(message)
    const messages = await messagesManager.findAll()
    socketServer.emit("sendMessage", messages);
  });

  socket.on("showProducts", async() => {
    const products = await productsManager.findAll({limit:10, page:1, sort:{}, query:{} })
    socketServer.emit("sendProducts", products);
  });


  /*socket.on("newPrice", (value) => {
    socket.broadcast.emit("priceUpdated", value);
  });

  socket.on("showProducts", async(req,res) => {
    const products = await manager.getProducts({})
    socket.emit("sendProducts", products);
  });

  socket.on("addProduct", async(product) => {
    await manager.addProduct(product.title,product.description,product.price,product.thumbnail,product.code,product.stock)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });

  socket.on("deleteProduct", async(id) => {
    await manager.deleteProduct(+id)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });*/
});