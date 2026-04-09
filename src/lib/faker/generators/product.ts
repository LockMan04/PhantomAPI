import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateProduct = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.commerce.productName(),
  description: fakerInstance.commerce.productDescription(),
  price: fakerInstance.commerce.price(),
  department: fakerInstance.commerce.department(),
  material: fakerInstance.commerce.productMaterial(),
  discountPercentage: fakerInstance.number.int({ min: 0, max: 50 }),
  rating: fakerInstance.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  stock: fakerInstance.number.int({ min: 0, max: 100 }),
  reviews: Array.from({ length: fakerInstance.number.int({ min: 0, max: 5 }) }, () => ({
    id: generateId(fakerInstance),
    user: fakerInstance.internet.username(),
    rating: fakerInstance.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    comment: fakerInstance.lorem.sentence(),
  })),
});
