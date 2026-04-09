import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateInternet = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  ip: fakerInstance.internet.ipv4(),
  ipv6: fakerInstance.internet.ipv6(),
  mac: fakerInstance.internet.mac(),
  url: fakerInstance.internet.url(),
  userAgent: fakerInstance.internet.userAgent(),
});
