import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generatePost = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  title: fakerInstance.lorem.sentence(),
  content: fakerInstance.lorem.paragraphs(3),
  slug: fakerInstance.lorem.slug(),
  publishedAt: fakerInstance.date.recent().toISOString(),
  views: fakerInstance.number.int({ min: 0, max: 10000 }),
});
