import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generatePhone = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  number: fakerInstance.phone.number(),
  imei: fakerInstance.phone.imei(),
});
