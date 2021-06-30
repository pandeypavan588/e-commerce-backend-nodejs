const express = require('express');
const router = express.Router();
// const slugify = require('slugify');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');




router.post('/user/cart/addtocart',requireSignin,userMiddleware, addItemToCart);
// router.get('/categoery/getcategory',getCategories);


module.exports = router;