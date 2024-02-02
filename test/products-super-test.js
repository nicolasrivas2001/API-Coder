import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080")

describe("Products endpoints", () => {
    describe("GET /api/products", () => {
        it("Should get all products", async () => {
            const response = await requester.get("/api/products")

            expect(response.statusCode).to.be.equal(200)
            expect(response._body.products.payload).to.be.an("object")
        })
    })

    describe("POST /api/products", () => {
        it("Should create a product", async () => {
            const product = {
                title:"Buzo",
                description:"Negro",
                code:23434,
                price:54,
                stock:23
            }
            const response = await requester.post("/api/products").send(product)

            expect(response.statusCode).to.be.equal(200)
            expect(response._body.product.status).to.be.true
        })
    })

    describe("DELETE /api/products/:pid", () => {
        it("Should delete a product", async () => {
            const createdProduct = await requester.post("/api/products").send({
                title:"Camisa",
                description:"Roja",
                code:3456,
                price:45,
                stock:32
            })
            const productId = createdProduct._body.product._id
            const response = await requester.delete(`/api/products/${productId}`)
            expect(response._body.message).to.be.equal("Product deleted")
            
            
        })
    })
})