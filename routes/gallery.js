const express = require('express');
const router = express.Router();

/**
 * Gallery page route
 * @route GET /gallery
 */
router.get('/', (req, res) => {
  // In a real implementation, you'd fetch gallery items from a database
  const galleryItems = []; // Would be populated from database
  
  res.render('gallery', {
    title: 'Gallery | Handcrafted Buckle Designs',
    isGallery: true,
    galleryItems
  });
});

module.exports = router;