const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');

router.get('/', orderItemsController.getAll);
router.get('/:id', orderItemsController.getOne);
router.post('/', orderItemsController.create);
router.patch('/:id', orderItemsController.update);
router.delete('/:id', orderItemsController.remove);

module.exports = router;