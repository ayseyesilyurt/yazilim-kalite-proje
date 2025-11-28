const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/prismaClient');

beforeAll(async () => {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('E2E senaryo: kullanıcı -> kategori -> ürün -> sipariş', () => {
  test('tam akış', async () => {
    // 1) Kullanıcı oluştur
    const userRes = await request(app)
      .post('/api/users')
      .send({ name: 'Müşteri', email: 'musteri@example.com' });
    expect(userRes.statusCode).toBe(201);
    const userId = userRes.body.id;

    // 2) Kategori oluştur
    const catRes = await request(app)
      .post('/api/categories')
      .send({ name: 'Elektronik' });
    expect(catRes.statusCode).toBe(201);
    const categoryId = catRes.body.id;

    // 3) Ürün oluştur
    const prodRes = await request(app)
      .post('/api/products')
      .send({ name: 'Kulaklık', price: 100, categoryId });
    expect(prodRes.statusCode).toBe(201);
    const productId = prodRes.body.id;

    // 4) Sipariş oluştur
    const orderRes = await request(app)
      .post('/api/orders')
      .send({ userId });
    expect(orderRes.statusCode).toBe(201);
    const orderId = orderRes.body.id;

    // 5) OrderItem oluştur
    const itemRes = await request(app)
      .post('/api/order-items')
      .send({ orderId, productId, quantity: 2 });
    expect(itemRes.statusCode).toBe(201);

    // 6) Siparişi detaylı çek
    const orderDetailRes = await request(app).get(`/api/orders/${orderId}`);
    expect(orderDetailRes.statusCode).toBe(200);
    expect(orderDetailRes.body.items.length).toBe(1);
    expect(orderDetailRes.body.items[0].quantity).toBe(2);
  });
});