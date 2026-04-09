import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateLorem = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  word: fakerInstance.lorem.word(),
  words: fakerInstance.lorem.words(5),
  sentence: fakerInstance.lorem.sentence(),
  paragraph: fakerInstance.lorem.paragraph(),
  text: fakerInstance.lorem.text(),
});
