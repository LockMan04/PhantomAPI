import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generatePerson = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  firstName: fakerInstance.person.firstName(),
  lastName: fakerInstance.person.lastName(),
  fullName: fakerInstance.person.fullName(),
  gender: fakerInstance.person.gender(),
  jobTitle: fakerInstance.person.jobTitle(),
  bio: fakerInstance.person.bio(),
});
