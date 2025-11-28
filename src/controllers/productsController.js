const prisma = require('../prismaClient');

const productsController = {
  async getAll(req, res, next) {
    try {
      const products = await prisma.product.findMany({
        include: { category: true }
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const id = Number(req.params.id);
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
      });
      if (!product) {
        return res.status(404).json({ error: 'Ürün bulunamadı' });
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { name, price, categoryId } = req.body;
      if (!name || price == null || !categoryId) {
        return res.status(400).json({ error: 'name, price, categoryId zorunlu' });
      }
      const product = await prisma.product.create({
        data: {
          name,
          price: Number(price),
          categoryId: Number(categoryId)
        }
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name, price, categoryId } = req.body;
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          price: price != null ? Number(price) : undefined,
          categoryId: categoryId != null ? Number(categoryId) : undefined
        }
      });
      res.status(200).json(product);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Ürün bulunamadı' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.product.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Ürün bulunamadı' });
      }
      next(err);
    }
  }
};

module.exports = productsController;