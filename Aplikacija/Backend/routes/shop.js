const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart/:userId', shopController.getCart);

router.post('/postToCart', shopController.postCart);

router.delete('/cart-delete-item', shopController.cartDeleteProduct);

router.post('/create-order', shopController.postOrder);

// router.get('/sum/:userId', shopController.sum)

router.get('/orders', shopController.getOrders);

// router.get('/getOrdersItems/:userId', shopController.getOrdersItems);

router.get('/getUnresolvedOrders', shopController.getUnOrders);

router.get('/orderdByUserId/:userId', shopController.getOrdersByUserId);

router.put('/updateOrderState', shopController.updateOrderState);

module.exports = router;
