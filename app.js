const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// Initialize app
const app = express();

// Handlebars middleware
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'bbig-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Connect flash middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const shopRoutes = require('./routes/shop');
const galleryRoutes = require('./routes/gallery');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/shop', shopRoutes);
app.use('/gallery', galleryRoutes);
app.use('/contact', contactRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

// Set port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});