# Yazılım Kalite Güvencesi ve Testi Dönem Sonu Projesi

Bu projede Node.js ve Express kullanılarak 5 farklı kaynaktan oluşan basit bir e-ticaret REST API'si geliştirdim.

## Kullanılan Teknolojiler

- Node.js, Express
- Prisma ORM + SQLite
- Jest, Supertest
- Swagger (OpenAPI 3.0)

## Kaynaklar (Resources)

- Users
- Categories
- Products
- Orders
- OrderItems

## Projeyi Çalıştırma

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev