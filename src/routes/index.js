const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const orderItemsRouter = require('./orderItems');

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/order-items', orderItemsRouter);

module.exports = router;