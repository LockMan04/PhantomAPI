import { Faker, en, vi } from '@faker-js/faker';

export type Locale = 'en' | 'vi';

// A simple but effective string hash (cyrb53)
const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const getFaker = (locale: Locale, seed?: string): Faker => {
  const instance = new Faker({ locale: locale === 'vi' ? [vi] : [en] });
  if (seed) {
    instance.seed(cyrb53(seed));
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
  discountPercentage: fakerInstance.number.int({ min: 0, max: 50 }),
  rating: fakerInstance.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  stock: fakerInstance.number.int({ min: 0, max: 100 }),
  reviews: Array.from({ length: fakerInstance.number.int({ min: 0, max: 5 }) }, () => ({
    id: generateId(fakerInstance),
    user: fakerInstance.internet.username(),
    rating: fakerInstance.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    comment: fakerInstance.lorem.sentence(),
  })),
});

export const generateUser = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  username: fakerInstance.internet.username(),
  email: fakerInstance.internet.email(),
  passwordHash: `$2b$10$${fakerInstance.string.alphanumeric({ length: 53 })}`, // dummy hash
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
  customer: {
    id: generateId(fakerInstance),
    name: fakerInstance.person.fullName(),
    email: fakerInstance.internet.email(),
  },
  items: Array.from({ length: fakerInstance.number.int({ min: 1, max: 5 }) }, () => ({
    productId: generateId(fakerInstance),
    name: fakerInstance.commerce.productName(),
    quantity: fakerInstance.number.int({ min: 1, max: 5 }),
    price: fakerInstance.commerce.price(),
  })),
  shippingAddress: generateAddress(fakerInstance),
});

export const generateCart = (fakerInstance: Faker) => {
  const items = Array.from({ length: fakerInstance.number.int({ min: 1, max: 10 }) }, () => {
    const priceStr = fakerInstance.commerce.price();
    const price = parseFloat(priceStr);
    const quantity = fakerInstance.number.int({ min: 1, max: 5 });
    return {
      productId: generateId(fakerInstance),
      productName: fakerInstance.commerce.productName(),
      quantity,
      unitPrice: price,
      totalPrice: parseFloat((price * quantity).toFixed(2)),
    };
  });

  const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    id: generateId(fakerInstance),
    userId: generateId(fakerInstance),
    items,
    totalAmount: parseFloat(cartTotal.toFixed(2)),
    status: fakerInstance.helpers.arrayElement(['ACTIVE', 'ABANDONED', 'CHECKED_OUT']),
    updatedAt: fakerInstance.date.recent().toISOString(),
  };
};

export const generateStore = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  name: fakerInstance.company.name(),
  description: fakerInstance.company.catchPhrase(),
  categories: Array.from({ length: fakerInstance.number.int({ min: 2, max: 8 }) }, () => fakerInstance.commerce.department()),
  rating: fakerInstance.number.float({ min: 3, max: 5, fractionDigits: 1 }),
  contact: {
    email: fakerInstance.internet.email(),
    phone: fakerInstance.phone.number(),
    address: generateAddress(fakerInstance),
  },
  createdAt: fakerInstance.date.past().toISOString(),
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
  cart: generateCart,
  store: generateStore,
};

export type ResourceType = keyof typeof generators;
