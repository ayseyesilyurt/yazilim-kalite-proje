const prisma = require('../prismaClient');

const usersController = {
  async getAll(req, res, next) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const id = Number(req.params.id);
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'name ve email zorunlu' });
      }
      const user = await prisma.user.create({
        data: { name, email }
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name, email } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { name, email }
      });

      res.status(200).json(user);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.user.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
      next(err);
    }
  }
};

module.exports = usersController;