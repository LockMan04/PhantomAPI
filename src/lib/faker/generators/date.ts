import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateDate = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  past: fakerInstance.date.past().toISOString(),
  future: fakerInstance.date.future().toISOString(),
  recent: fakerInstance.date.recent().toISOString(),
  soon: fakerInstance.date.soon().toISOString(),
  month: fakerInstance.date.month(),
  weekday: fakerInstance.date.weekday(),
});
