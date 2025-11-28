const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getOne);
router.post('/', ordersController.create);
router.patch('/:id', ordersController.update);
router.delete('/:id', ordersController.remove);

module.exports = router;