import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';
import { generateAddress } from './address';

export const generateOrder = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  orderNumber: fakerInstance.finance.accountNumber(),
  totalAmount: fakerInstance.commerce.price(),
  status: fakerInstance.helpers.arrayElement(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  orderedAt: fakerInstance.date.recent().toISOString(),
  customer: {
    id: generateId(fakerInstance),
    name: fakerInstance.person.fullName(),
    email: fakerInstance.internet.email(),
  },
  items: Array.from({ length: fakerInstance.number.int({ min: 1, max: 5 }) }, () => ({
    productId: generateId(fakerInstance),
    name: fakerInstance.commerce.productName(),
    quantity: fakerInstance.number.int({ min: 1, max: 5 }),
    price: fakerInstance.commerce.price(),
  })),
  shippingAddress: generateAddress(fakerInstance),
});
