const prisma = require('../prismaClient');

const ordersController = {
  async getAll(req, res, next) {
    try {
      const orders = await prisma.order.findMany({
        include: { user: true, items: { include: { product: true } } }
      });
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const id = Number(req.params.id);
      const order = await prisma.order.findUnique({
        where: { id },
        include: { user: true, items: { include: { product: true } } }
      });
      if (!order) {
        return res.status(404).json({ error: 'Sipariş bulunamadı' });
      }
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'userId zorunlu' });
      }
      const order = await prisma.order.create({
        data: {
          userId: Number(userId)
        }
      });
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { userId } = req.body;
      const order = await prisma.order.update({
        where: { id },
        data: {
          userId: userId != null ? Number(userId) : undefined
        }
      });
      res.status(200).json(order);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Sipariş bulunamadı' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.order.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Sipariş bulunamadı' });
      }
      next(err);
    }
  }
};

module.exports = ordersController;