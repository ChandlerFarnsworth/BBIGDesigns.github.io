const express = require('express');
const router = express.Router();

/**
 * Home page route
 * @route GET /
 */
router.get('/', (req, res) => {
  // In a real implementation, you'd fetch this data from a database
  const featuredProducts = [
    {
      id: 1,
      name: 'Custom Golf Buckle',
      description: 'Handcrafted golf club logo buckle with premium metals and detailing.',
      image: '/img/placeholder-product-1.jpg',
      price: null // null price indicates "Contact for pricing"
    },
    {
      id: 2,
      name: 'Tournament Package',
      description: 'Custom buckles for your golf tournament with your event logo.',
      image: '/img/placeholder-product-2.jpg',
      price: null
    },
    {
      id: 3,
      name: 'Premium Belt',
      description: 'High-quality leather belt to complement your handcrafted buckle.',
      image: '/img/placeholder-product-3.jpg',
      price: 49.99
    }
  ];

  res.render('home', {
    title: 'Handcrafted Belt Buckles | Made in Colorado',
    isHome: true,
    featuredProducts
  });
});

module.exports = router;