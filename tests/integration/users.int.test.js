const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/prismaClient');

beforeAll(async () => {
  // Önce ilişkili tabloları sil
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  // En son kullanıcıları sil
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Users API', () => {
  test('POST /api/users yeni kullanıcı oluşturur', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Asya', email: 'asya@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test('GET /api/users kullanıcıları listeler', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/users/:id mevcut kullanıcıyı döndürür', async () => {
    const created = await prisma.user.create({
      data: { name: 'Deneme', email: 'deneme@example.com' }
    });

    const res = await request(app).get(`/api/users/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('deneme@example.com');
  });

  test('GET /api/users/:id olmayan kullanıcı için 404 döndürür', async () => {
    const res = await request(app).get('/api/users/999999');
    expect(res.statusCode).toBe(404);
  });
});