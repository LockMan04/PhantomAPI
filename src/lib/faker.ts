import { faker, fakerVI, Faker } from '@faker-js/faker';

export type Locale = 'en' | 'vi';

export const getFaker = (locale: Locale, seed?: string): Faker => {
  const instance = locale === 'vi' ? fakerVI : faker;
  if (seed) {
    // Basic hash to convert string to number for seeding if needed, or simply use string hash
    const seedNum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    instance.seed(seedNum);
  }
  return instance;
};

// Generates a random id starting with fake_
const generateId = (instance: Faker) => `fake_${instance.string.uuid()}`;

export const generatePerson = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  firstName: fakerInstance.person.firstName(),
  lastName: fakerInstance.person.lastName(),
  fullName: fakerInstance.person.fullName(),
  gender: fakerInstance.person.gender(),
  jobTitle: fakerInstance.person.jobTitle(),
  bio: fakerInstance.person.bio(),
});

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

export const generatePhone = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  number: fakerInstance.phone.number(),
  imei: fakerInstance.phone.imei(),
});

export const generateCompany = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.company.name(),
  catchPhrase: fakerInstance.company.catchPhrase(),
  buzzPhrase: fakerInstance.company.buzzPhrase(),
  domain: fakerInstance.internet.domainName(),
});

export const generateProduct = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.commerce.productName(),
  description: fakerInstance.commerce.productDescription(),
  price: fakerInstance.commerce.price(),
  department: fakerInstance.commerce.department(),
  material: fakerInstance.commerce.productMaterial(),
});

export const generateUser = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  username: fakerInstance.internet.username(),
  email: fakerInstance.internet.email(),
  password: fakerInstance.internet.password(),
  avatar: fakerInstance.image.avatar(),
  registeredAt: fakerInstance.date.past().toISOString(),
});

export const generatePost = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  title: fakerInstance.lorem.sentence(),
  content: fakerInstance.lorem.paragraphs(3),
  slug: fakerInstance.lorem.slug(),
  publishedAt: fakerInstance.date.recent().toISOString(),
  views: fakerInstance.number.int({ min: 0, max: 10000 }),
});

export const generateOrder = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  orderNumber: fakerInstance.finance.accountNumber(),
  totalAmount: fakerInstance.commerce.price(),
  status: fakerInstance.helpers.arrayElement(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  orderedAt: fakerInstance.date.recent().toISOString(),
});

export const generateFinance = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  accountName: fakerInstance.finance.accountName(),
  accountNumber: fakerInstance.finance.accountNumber(),
  amount: fakerInstance.finance.amount(),
  currency: fakerInstance.finance.currencyCode(),
  creditCardNumber: fakerInstance.finance.creditCardNumber(),
});

export const generateDate = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  past: fakerInstance.date.past().toISOString(),
  future: fakerInstance.date.future().toISOString(),
  recent: fakerInstance.date.recent().toISOString(),
  soon: fakerInstance.date.soon().toISOString(),
  month: fakerInstance.date.month(),
  weekday: fakerInstance.date.weekday(),
});

export const generateInternet = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  ip: fakerInstance.internet.ipv4(),
  ipv6: fakerInstance.internet.ipv6(),
  mac: fakerInstance.internet.mac(),
  url: fakerInstance.internet.url(),
  userAgent: fakerInstance.internet.userAgent(),
});

export const generateLorem = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  word: fakerInstance.lorem.word(),
  words: fakerInstance.lorem.words(5),
  sentence: fakerInstance.lorem.sentence(),
  paragraph: fakerInstance.lorem.paragraph(),
  text: fakerInstance.lorem.text(),
});

export const generateAnimal = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  type: fakerInstance.animal.type(),
  name: fakerInstance.animal.petName(),
  species: fakerInstance.animal.cat(), // generic representation
});

export const generateHacker = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  abbreviation: fakerInstance.hacker.abbreviation(),
  adjective: fakerInstance.hacker.adjective(),
  noun: fakerInstance.hacker.noun(),
  verb: fakerInstance.hacker.verb(),
  phrase: fakerInstance.hacker.phrase(),
});

export const generators = {
  person: generatePerson,
  address: generateAddress,
  phone: generatePhone,
  company: generateCompany,
  product: generateProduct,
  user: generateUser,
  post: generatePost,
  order: generateOrder,
  finance: generateFinance,
  date: generateDate,
  internet: generateInternet,
  lorem: generateLorem,
  animal: generateAnimal,
  hacker: generateHacker,
};

export type ResourceType = keyof typeof generators;
