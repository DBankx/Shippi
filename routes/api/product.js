const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const Product = require('../../models/product');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');
const mongoose = require('mongoose');
const conn = mongoose.connection;
const MONGO_URI = process.env.MONGO_URI;

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';

    // create uploads
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // only accept jpeg files or jpg files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// give a destination multer should save the files, (accept only files smaller than 10mb)
let upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter
});

router.post(
  '/',
  [
    auth
    // [
    //   (check('title', 'Product title is required').not().isEmpty(),
    //   check('category', 'Category is required').not().isEmpty(),
    //   check('condition', 'Condition is required').not().isEmpty(),
    //   check('description', 'Description is required').not().isEmpty(),
    //   check('price', 'Price must be a decimal').isDecimal(),
    //   check('quantity', 'quantity is required').isNumeric(),
    //   check('shippingPrice', 'Shipping price is required').isDecimal())
    // ]
  ],
  upload.single('productImage'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      category,
      condition,
      description,
      price,
      quantity,
      shippingPrice,
      domesticShipping,
      internationalShipping,
      weight,
      height,
      depth,
      width,
      returns,
      color,
      size,
      countryOrigin,
      brandName,
      releaseDate,
      modelNumber,
      subtitle,
      features
    } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      // create a new object with the product data
      const newProduct = {};
      newProduct.user = req.user.id;
      newProduct.productImage = req.file.path;
      if (title) newProduct.title = title;
      if (category) newProduct.category = category;
      if (condition) newProduct.condition = condition;
      if (description) newProduct.description = description;
      if (price) newProduct.price = price;
      if (quantity) newProduct.quantity = quantity;
      if (subtitle) newProduct.subtitle = subtitle;
      newProduct.shippingDetails = {};
      if (shippingPrice)
        newProduct.shippingDetails.shippingPrice = shippingPrice;
      if (domesticShipping)
        newProduct.shippingDetails.domesticShipping = domesticShipping;
      if (internationalShipping)
        newProduct.shippingDetails.internationalShipping = internationalShipping;
      if (weight) newProduct.shippingDetails.weight = weight;
      if (height) newProduct.shippingDetails.height = height;
      if (width) newProduct.shippingDetails.width = width;
      if (depth) newProduct.shippingDetails.depth = depth;
      if (returns) newProduct.returns = returns;
      newProduct.details = {};
      if (color) newProduct.details.color = color;
      if (size) newProduct.details.size = size;
      if (countryOrigin) newProduct.details.countryOrigin = countryOrigin;
      if (brandName) newProduct.details.brandName = brandName;
      if (releaseDate) newProduct.details.releaseDate = releaseDate;
      if (modelNumber) newProduct.details.modelNumber = modelNumber;
      if (features)
        newProduct.details.features = features
          .split(',')
          .map((feature) => feature.trim());

      const product = new Product(newProduct);

      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
