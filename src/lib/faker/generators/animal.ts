import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateAnimal = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  type: fakerInstance.animal.type(),
  name: fakerInstance.animal.petName(),
  species: fakerInstance.animal.cat(), // generic representation
});
