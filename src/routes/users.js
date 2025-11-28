const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları getir
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/', usersController.getAll);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: ID ile kullanıcı getir
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Başarılı
 *       404:
 *         description: Bulunamadı
 */
router.get('/:id', usersController.getOne);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Oluşturuldu
 *       400:
 *         description: Hatalı istek
 */
router.post('/', usersController.create);

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     summary: Kullanıcıyı güncelle
 *     tags:
 *       - Users
 */
router.patch('/:id', usersController.update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Kullanıcı sil
 *     tags:
 *       - Users
 */
router.delete('/:id', usersController.remove);

module.exports = router;