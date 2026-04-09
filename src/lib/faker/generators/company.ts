import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateCompany = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.company.name(),
  catchPhrase: fakerInstance.company.catchPhrase(),
  buzzPhrase: fakerInstance.company.buzzPhrase(),
  domain: fakerInstance.internet.domainName(),
});
