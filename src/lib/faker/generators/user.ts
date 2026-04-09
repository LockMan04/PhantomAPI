import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateUser = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  username: fakerInstance.internet.username(),
  email: fakerInstance.internet.email(),
  passwordHash: `$2b$10$${fakerInstance.string.alphanumeric({ length: 53 })}`, // dummy hash
  avatar: fakerInstance.image.avatar(),
  registeredAt: fakerInstance.date.past().toISOString(),
});
