import { generatePerson } from './person';
import { generateAddress } from './address';
import { generatePhone } from './phone';
import { generateCompany } from './company';
import { generateProduct } from './product';
import { generateUser } from './user';
import { generatePost } from './post';
import { generateOrder } from './order';
import { generateCart } from './cart';
import { generateStore } from './store';
import { generateFinance } from './finance';
import { generateDate } from './date';
import { generateInternet } from './internet';
import { generateLorem } from './lorem';
import { generateAnimal } from './animal';
import { generateHacker } from './hacker';

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
