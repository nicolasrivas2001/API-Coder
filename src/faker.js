import { fakerFR as faker } from "@faker-js/faker";

export const generateProduct = () => {
  const product = {
    code: faker.database.mongodbObjectId(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    stock: faker.number.int(100),
    status: true
  };
  return product;
};