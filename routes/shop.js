const express = require('express');
const router = express.Router();

/**
 * Shop main page
 * @route GET /shop
 */
router.get('/', (req, res) => {
  // In a real implementation, you'd fetch products from a database
  const products = []; // Would be populated from database
  
  res.render('shop', {
    title: 'Shop | Handcrafted Belt Buckles',
    isShop: true,
    isAllProducts: true,
    categoryTitle: 'All Products',
    categoryDescription: 'Browse our complete collection of handcrafted belt buckles and accessories.',
    products: products
  });
});

/**
 * Product category pages
 * @route GET /shop/:category
 */
router.get('/:category', (req, res) => {
  const category = req.params.category;
  let categoryTitle = '';
  let categoryDescription = '';
  let isCategory = '';
  
  // In a real implementation, you'd fetch products from a database based on category
  const products = []; // Would be populated from database filtered by category
  
  // Set category-specific variables
  switch(category) {
    case 'custom-golf-buckles':
      categoryTitle = 'Custom Golf Buckles';
      categoryDescription = 'Custom handcrafted belt buckles featuring golf club logos and tournament designs.';
      isCategory = 'isCustomGolfBuckles';
      break;
    case 'custom-buckle-packages':
      categoryTitle = 'Custom Buckle Packages';
      categoryDescription = 'Complete packages including custom buckles and accessories for organizations.';
      isCategory = 'isCustomBucklePackages';
      break;
    case 'tournament-packages':
      categoryTitle = 'Tournament Packages';
      categoryDescription = 'Special event and tournament packages with custom buckles and accessories.';
      isCategory = 'isTournamentPackages';
      break;
    case 'semi-custom-buckle-packages':
      categoryTitle = 'Semi-Custom Buckle Packages';
      categoryDescription = 'Pre-designed buckles that can be customized with your details or colors.';
      isCategory = 'isSemiCustomBucklePackages';
      break;
    case 'semi-custom-bag-tags':
      categoryTitle = 'Semi-Custom Bag Tags';
      categoryDescription = 'Customizable bag tags for golf clubs, tournaments, and events.';
      isCategory = 'isBagTags';
      break;
    case 'divot-repair-tools':
      categoryTitle = 'Divot Repair Tools';
      categoryDescription = 'Custom divot repair tools with magnetic ball markers.';
      isCategory = 'isDivotTools';
      break;
    case 'belts':
      categoryTitle = 'Belts';
      categoryDescription = 'Premium leather belts designed to complement our custom buckles.';
      isCategory = 'isBelts';
      break;
    default:
      // If category doesn't exist, redirect to main shop page
      return res.redirect('/shop');
  }
  
  // Create a dynamic object with the isCategory property set to true
  const categoryFlags = { [isCategory]: true };
  
  res.render('shop', {
    title: `${categoryTitle} | Shop`,
    isShop: true,
    categoryTitle,
    categoryDescription,
    products,
    ...categoryFlags
  });
});

/**
 * Product detail page
 * @route GET /shop/product/:id
 */
router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  
  // In a real implementation, you'd fetch the product from a database by ID
  // For now, we'll create a placeholder product
  const product = {
    id: productId,
    name: 'Custom Belt Buckle',
    price: productId % 2 === 0 ? 119.99 : null, // Even IDs have prices, odd IDs are "contact for pricing"
    description: 'Handcrafted custom belt buckle made with premium materials.',
    mainImage: '/img/placeholder-product-detail-1.jpg',
    images: [
      '/img/placeholder-product-detail-1.jpg',
      '/img/placeholder-product-detail-2.jpg',
      '/img/placeholder-product-detail-3.jpg',
      '/img/placeholder-product-detail-4.jpg'
    ],
    category: {
      name: 'Custom Buckles',
      slug: 'custom-buckle-packages'
    },
    inStock: true
  };
  
  // In a real implementation, you'd fetch related products from a database
  const relatedProducts = [];
  
  res.render('product', {
    title: `${product.name} | Shop`,
    isShop: true,
    product,
    relatedProducts
  });
});

/**
 * Shopping cart page
 * @route GET /shop/cart
 */
router.get('/cart', (req, res) => {
  // In a real implementation, you'd fetch the cart from the session or database
  // For now, we'll create a placeholder cart
  const cartItems = [
    {
      id: 1,
      name: 'Semi-Custom Buckle',
      description: 'Handcrafted semi-custom buckle with your personalization.',
      image: '/img/placeholder-product-3.jpg',
      price: 119.99,
      quantity: 1,
      options: 'Metal: Silver, Finish: Polished',
      total: 119.99
    },
    {
      id: 2,
      name: 'Premium Belt',
      description: 'High-quality leather belt.',
      image: '/img/placeholder-product-6.jpg',
      price: 49.99,
      quantity: 1,
      options: 'Color: Brown, Size: 36',
      total: 49.99
    }
  ];
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = subtotal >= 100 ? 0 : 9.95;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  res.render('cart', {
    title: 'Shopping Cart',
    isShop: true,
    cartItems,
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    freeShipping: shipping === 0,
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  });
});

/**
 * Checkout page
 * @route GET /shop/checkout
 */
router.get('/checkout', (req, res) => {
  // In a real implementation, you'd check if the cart has items
  // and redirect to the cart page if it's empty
  
  res.render('checkout', {
    title: 'Checkout',
    isShop: true
  });
});

module.exports = router;