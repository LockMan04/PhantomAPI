import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateCart = (fakerInstance: Faker) => {
  const items = Array.from({ length: fakerInstance.number.int({ min: 1, max: 10 }) }, () => {
    const priceStr = fakerInstance.commerce.price();
    const price = parseFloat(priceStr);
    const quantity = fakerInstance.number.int({ min: 1, max: 5 });
    return {
      productId: generateId(fakerInstance),
      productName: fakerInstance.commerce.productName(),
      quantity,
      unitPrice: price,
      totalPrice: parseFloat((price * quantity).toFixed(2)),
    };
  });

  const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    id: generateId(fakerInstance),
    userId: generateId(fakerInstance),
    items,
    totalAmount: parseFloat(cartTotal.toFixed(2)),
    status: fakerInstance.helpers.arrayElement(['ACTIVE', 'ABANDONED', 'CHECKED_OUT']),
    updatedAt: fakerInstance.date.recent().toISOString(),
  };
};
