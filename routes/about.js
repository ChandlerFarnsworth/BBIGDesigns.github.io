const express = require('express');
const router = express.Router();

/**
 * About page route
 * @route GET /about
 */
router.get('/', (req, res) => {
  res.render('about', {
    title: 'About Us | Our Story',
    isAbout: true
  });
});

module.exports = router;