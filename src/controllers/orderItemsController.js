const prisma = require('../prismaClient');

const orderItemsController = {
  async getAll(req, res, next) {
    try {
      const items = await prisma.orderItem.findMany({
        include: { order: true, product: true }
      });
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const id = Number(req.params.id);
      const item = await prisma.orderItem.findUnique({
        where: { id },
        include: { order: true, product: true }
      });
      if (!item) {
        return res.status(404).json({ error: 'OrderItem bulunamadı' });
      }
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body;
      if (!orderId || !productId || quantity == null) {
        return res.status(400).json({ error: 'orderId, productId, quantity zorunlu' });
      }
      const item = await prisma.orderItem.create({
        data: {
          orderId: Number(orderId),
          productId: Number(productId),
          quantity: Number(quantity)
        }
      });
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { quantity } = req.body;
      const item = await prisma.orderItem.update({
        where: { id },
        data: {
          quantity: quantity != null ? Number(quantity) : undefined
        }
      });
      res.status(200).json(item);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'OrderItem bulunamadı' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.orderItem.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'OrderItem bulunamadı' });
      }
      next(err);
    }
  }
};

module.exports = orderItemsController;