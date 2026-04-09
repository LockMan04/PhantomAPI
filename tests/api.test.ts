import { describe, it, expect } from 'vitest';
import { GET as getRandomUser } from '../src/app/api/v1/random/[resource]/route';
import { GET as getPlaceholderImage } from '../src/app/api/v1/placeholder/image/route';
import { NextRequest } from 'next/server';

describe('API Route tests', () => {
  it('should reject invalid locale', async () => {
    const req = new NextRequest('http://localhost:3000/api/v1/random/user?locale=fr');
    const response = await getRandomUser(req, { params: Promise.resolve({ resource: 'user' }) });
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('INVALID_PARAMS');
  });

  it('should reject limit out of bounds', async () => {
    // Limit < 1
    const req1 = new NextRequest('http://localhost:3000/api/v1/random/user?limit=0');
    const response1 = await getRandomUser(req1, { params: Promise.resolve({ resource: 'user' }) });
    expect(response1.status).toBe(400);

    // Limit > 50
    const req2 = new NextRequest('http://localhost:3000/api/v1/random/user?limit=51');
    const response2 = await getRandomUser(req2, { params: Promise.resolve({ resource: 'user' }) });
    expect(response2.status).toBe(400);
  });

  it('should return valid JSON with passwordHash for /api/v1/random/user', async () => {
    // Mock request
    const req = new NextRequest('http://localhost:3000/api/v1/random/user');

    // Call the handler
    const response = await getRandomUser(req, { params: Promise.resolve({ resource: 'user' }) });
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.passwordHash).toBeDefined();
    expect(json.data.password).toBeUndefined();
  });

  it('should escape HTML properly in /api/v1/placeholder/image SVG output', async () => {
    // Attack payload
    const attackText = '<script>alert(1)</script>';
    const req = new NextRequest(`http://localhost:3000/api/v1/placeholder/image?text=${encodeURIComponent(attackText)}`);

    const response = await getPlaceholderImage(req);
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/svg+xml');

    // Ensure the attack string is escaped
    expect(text).not.toContain('<script>');
    expect(text).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});
