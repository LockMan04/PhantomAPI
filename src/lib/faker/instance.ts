import { Faker, en, vi } from '@faker-js/faker';
import { Locale } from './types';

// A simple but effective string hash (cyrb53)
export const cyrb53 = (str: string, seed = 0) => {
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
export const generateId = (instance: Faker) => `fake_${instance.string.uuid()}`;
