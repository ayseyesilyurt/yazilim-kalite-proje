const prisma = require('../prismaClient');

const categoriesController = {
  async getAll(req, res, next) {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const id = Number(req.params.id);
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        return res.status(404).json({ error: 'Kategori bulunamadı' });
      }
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'name zorunlu' });
      }
      const category = await prisma.category.create({ data: { name } });
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const category = await prisma.category.update({
        where: { id },
        data: { name }
      });
      res.status(200).json(category);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Kategori bulunamadı' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.category.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Kategori bulunamadı' });
      }
      next(err);
    }
  }
};

module.exports = categoriesController;