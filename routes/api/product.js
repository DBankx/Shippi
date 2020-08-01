const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const Product = require('../../models/product');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const Notification = require('../../models/notification');
const fs = require('fs');
var _ = require('lodash');

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
    return cb(
      res
        .status(400)
        .json({ errors: [{ msg: '*only jpg and jpeg are allowed' }] })
    );
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

//  create a new product
// @@@ - protected
router.post(
  '/',
  [
    auth,
    upload.array('productImages', 5),
    [
      (check('title', 'Product title is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('condition', 'Condition is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price must be a decimal').isDecimal(),
      check('quantity', 'quantity is required').isNumeric(),
      check('shippingPrice', 'Shipping price is required').isDecimal(),
      check('brandName', 'Brand name is required').not().isEmpty(),
      check('color', 'Colour of item is required').not().isEmpty(),
      check('format', 'Price format is required').not().isEmpty())
    ]
  ],
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
      features,
      nameOfService,
      itemLocation,
      format
    } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const images = [];

      req.files.forEach((file) =>
        images.push({
          image: {
            data: fs.readFileSync(file.path),
            contentType: file.mimetype
          }
        })
      );

      // create a new object with the product data
      const newProduct = {};
      newProduct.user = req.user.id;
      newProduct.productImages = images;
      if (title) newProduct.title = title;
      if (category) newProduct.category = category;
      if (condition) newProduct.condition = condition;
      if (description) newProduct.description = description;
      if (price) newProduct.price = price;
      if (format) newProduct.format = format;
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
      if (itemLocation) newProduct.shippingDetails.itemLocation = itemLocation;
      if (nameOfService)
        newProduct.shippingDetails.nameOfService = nameOfService;
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

// edit a product
// @@@ - protected
router.patch(
  '/edit/:productId',
  [
    auth,
    upload.array('productImages', 3),
    [
      (check('title', 'Product title is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('condition', 'Condition is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price must be a decimal').isDecimal(),
      check('quantity', 'quantity is required').isNumeric(),
      check('shippingPrice', 'Shipping price is required').isDecimal())
    ]
  ],
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
      let product = await Product.findById(req.params.productId);

      const images = [];

      req.files.forEach((file) =>
        images.push({
          image: {
            data: fs.readFileSync(file.path),
            contentType: file.mimetype
          }
        })
      );

      if (!product) {
        return res.status(404).json({ errors: [{ msg: 'product not found' }] });
      }

      if (product.user.toString() !== req.user.id) {
        return res.status(404).json({ errors: [{ msg: 'Not Authorised' }] });
      }

      // create a new object with the product data
      const newProduct = {};
      newProduct.user = req.user.id;
      newProduct.productImages = images;
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

      // save the new data
      product = await Product.findOneAndUpdate(
        { user: req.user.id },
        { $set: newProduct },
        { new: true }
      );

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// watch a product
// @@@ - protected

router.put('/watch/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const user = await User.findById(req.user.id);

    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'product not found' }] });
    }

    // check if the product is by the user
    if (product.user.toString() === req.user.id) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'you cant watch your product' }] });
    }

    // check if user is already watching
    if (
      product.watchers.filter(
        (watcher) => watcher.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'You are already watching' }] });
    }

    const newWatcher = {
      user: req.user.id
    };

    product.watchers.unshift(newWatcher);

    const watching = {
      product: req.params.productId
    };

    user.watching.unshift(watching);

    await product.save();
    await user.save();

    res.json(product.watchers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// unwatch a product
// @@@ - protected
router.put('/unwatch/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const user = await User.findById(req.user.id);

    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'product not found' }] });
    }

    // check if post has been liked
    if (
      product.watchers.filter(
        (watcher) => watcher.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'You are not watching the item' });
    }

    // get remove index of watcher from product
    const removeIndex = _.findIndex(
      product.watchers,
      (watcher) => watcher.user == req.user.id
    );
    // get the index of the product from the user
    const indexOfProduct = _.findIndex(
      user.watching,
      (product) => product.product == req.params.productId
    );

    // splice from product watcher array
    product.watchers.splice(removeIndex, 1);
    // splice from user watching array
    user.watching.splice(indexOfProduct, 1);

    await product.save();
    await user.save();

    res.json(product.watchers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get a product by id
// @@@ - public
router.get('/find/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get products from search
// @@@ - public

router.get('/find', async (req, res) => {
  // get pagination values
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let order = req.query.order ? req.query.order : 'desc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let page = req.query.page ? parseInt(req.query.page) : 0;

  // omit the pagination values from the query params
  let queryParams = _.omit(req.query, [
    'page',
    'limit',
    'order',
    'sortBy',
    'page'
  ]);

  console.log(queryParams);

  try {
    let products = await Product.find(queryParams)
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(page * limit);

    if (!products) {
      return res.status(404).json({ errors: [{ msg: 'No item was found' }] });
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// leave feedback on a product
// @@@ - protected

router.put(
  '/feedback/:productId',
  [auth, [check('rating', 'Please leave a rating').isNumeric()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;

    try {
      let product = await Product.findById(req.params.productId);
      let user = await User.findById(req.user.id);

      if (!product) {
        return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
      }

      if (product.user.toString() === req.user.id) {
        return res.status(400).json({
          errors: [{ msg: 'You cannot leave a feedback on your product' }]
        });
      }

      const feedbackData = {
        user: req.user.id,
        rating,
        comment,
        avatar: user.avatar,
        username: user.username
      };

      // leave feedback

      await product.feedback.unshift(feedbackData);

      await product.save();

      // send notification to the owner of the product
      const notificationData = {
        sender: req.user.id,
        reciever: [{ user: product.user }],
        type: 'feedback',
        message: `${user.username} left a feedback on ${product.title}`
      };

      const newNotification = new Notification(notificationData);

      await newNotification.save();

      //   get the user you want to notify
      const userBeingNotified = await User.findById(product.user);

      userBeingNotified.notifications.unshift(newNotification);

      await userBeingNotified.save();

      res.json(product.feedback);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// delete feedback
// @@@ - protected

router.put('/feedback/:productId/:feedbackId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const feedback = product.feedback.find(
      (feedback) => feedback.id === req.params.feedbackId
    );

    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
    }

    if (!feedback) {
      return res.status(404).json({ errors: [{ msg: 'Feedback not found' }] });
    }

    if (feedback.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'You are not authorized' }] });
    }

    // get the remove index
    const removeIndex = _.findIndex(
      product.feedback,
      (feedback) => feedback.id === req.params.feedbackId
    );

    // splice from array
    product.feedback.splice(removeIndex, 1);

    await product.save();

    res.json(product.feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all products
// @@@ - public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete a product
//  @@@ - protected

router.delete('/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
    }

    if (product.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'You are not authorized' }] });
    }

    await product.remove();

    res.json({ msg: 'Product has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
