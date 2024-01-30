import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";
import {join} from "path"

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Coder API',
        version: '1.0.0',
        descritpion:"API documentation for Coder API"
      },
    },
    apis: [join(__dirname,"docs","*.yaml")],
};

console.log(`${__dirname}/docs/*.yaml`)
  

export const swaggerSetup = swaggerJSDoc(swaggerOptions)