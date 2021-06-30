const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const multer  = require('multer')
const path = require("path");
const shortid = require("shortid");
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  }
})
 
const upload = multer({  storage })


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct );
// router.get('/categoery/getcategory',getCategories);


module.exports = router;