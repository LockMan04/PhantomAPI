import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';
import { generateAddress } from './address';

export const generateStore = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.company.name(),
  description: fakerInstance.company.catchPhrase(),
  categories: Array.from({ length: fakerInstance.number.int({ min: 2, max: 8 }) }, () => fakerInstance.commerce.department()),
  rating: fakerInstance.number.float({ min: 3, max: 5, fractionDigits: 1 }),
  contact: {
    email: fakerInstance.internet.email(),
    phone: fakerInstance.phone.number(),
    address: generateAddress(fakerInstance),
  },
  createdAt: fakerInstance.date.past().toISOString(),
});
