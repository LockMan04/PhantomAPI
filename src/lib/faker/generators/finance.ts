import { Faker } from '@faker-js/faker';
import { generateId } from '../instance';

export const generateFinance = (fakerInstance: Faker) => ({
  id: generateId(fakerInstance),
  accountName: fakerInstance.finance.accountName(),
  accountNumber: fakerInstance.finance.accountNumber(),
  amount: fakerInstance.finance.amount(),
  currency: fakerInstance.finance.currencyCode(),
  creditCardNumber: fakerInstance.finance.creditCardNumber(),
});
