import { describe, it, expect } from 'vitest';
import { getFaker } from '../src/lib/faker/instance';

describe('getFaker utility', () => {
  it('should instantiate a new Faker instance each time (no shared state)', () => {
    const faker1 = getFaker('en');
    const faker2 = getFaker('en');

    // Setting a seed on one should not affect the other if they are distinct instances
    faker1.seed(12345);
    const value1 = faker1.string.uuid();

    faker2.seed(67890);
    const value2 = faker2.string.uuid();

    // Although it's slightly probabilistic, different seeds should yield different UUIDs
    expect(value1).not.toBe(value2);
    expect(faker1).not.toBe(faker2);
  });

  it('should be reproducible given the same seed', () => {
    const faker1 = getFaker('en', 'my-seed');
    const value1 = faker1.string.uuid();

    const faker2 = getFaker('en', 'my-seed');
    const value2 = faker2.string.uuid();

    expect(value1).toBe(value2);
  });

  it('should not collide seeds trivially like string.split.reduce', () => {
    // "abc" and "cba" sum up to the same number but should produce different hashes with cyrb53
    const faker1 = getFaker('en', 'abc');
    const value1 = faker1.string.uuid();

    const faker2 = getFaker('en', 'cba');
    const value2 = faker2.string.uuid();

    expect(value1).not.toBe(value2);
  });
});
