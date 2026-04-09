import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateHacker = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  abbreviation: fakerInstance.hacker.abbreviation(),
  adjective: fakerInstance.hacker.adjective(),
  noun: fakerInstance.hacker.noun(),
  verb: fakerInstance.hacker.verb(),
  phrase: fakerInstance.hacker.phrase(),
});
