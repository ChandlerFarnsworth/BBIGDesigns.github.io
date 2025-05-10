const express = require('express');
const router = express.Router();

/**
 * Contact page route
 * @route GET /contact
 */
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | BBIG Designs',
    isContact: true
  });
});

/**
 * Contact form submission
 * @route POST /contact/submit
 */
router.post('/submit', (req, res) => {
  // Get form data
  const { name, email, phone, subject, message, newsletter } = req.body;
  
  // In a real implementation, you'd:
  // 1. Validate the input
  // 2. Send an email
  // 3. Save to a database
  // 4. Add to newsletter list if checked
  
  // For now, just redirect with success message
  req.flash('success_msg', 'Your message has been sent. We will get back to you shortly!');
  res.redirect('/contact');
});

module.exports = router;