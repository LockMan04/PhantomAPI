import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateAddress = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  street: fakerInstance.location.streetAddress(),
  city: fakerInstance.location.city(),
  state: fakerInstance.location.state(),
  zipCode: fakerInstance.location.zipCode(),
  country: fakerInstance.location.country(),
  latitude: fakerInstance.location.latitude(),
  longitude: fakerInstance.location.longitude(),
});
