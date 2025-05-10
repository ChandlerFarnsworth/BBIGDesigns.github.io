const fs = require('fs');
const path = require('path');
const { engine } = require('express-handlebars');
const express = require('express');
const app = express();

// Configure Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: path.join(__dirname, '../views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Ensure build directory exists
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Create sample data for the pages
const sampleData = {
  home: {
    title: 'Handcrafted Belt Buckles | Made in Colorado',
    isHome: true,
    featuredProducts: [
      {
        id: 1,
        name: 'Custom Golf Buckle',
        description: 'Handcrafted golf club logo buckle with premium metals and detailing.',
        image: '/img/placeholder-product-1.jpg',
        price: null
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
    ]
  },
  about: {
    title: 'About Us | Our Story',
    isAbout: true
  },
  shop: {
    title: 'Shop | Handcrafted Belt Buckles',
    isShop: true,
    isAllProducts: true,
    categoryTitle: 'All Products',
    categoryDescription: 'Browse our complete collection of handcrafted belt buckles and accessories.',
    products: []
  },
  product: {
    title: 'Custom Belt Buckle | Shop',
    isShop: true,
    product: {
      id: 1,
      name: 'Custom Belt Buckle',
      price: 119.99,
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
    },
    relatedProducts: []
  },
  gallery: {
    title: 'Gallery | Handcrafted Buckle Designs',
    isGallery: true,
    galleryItems: []
  },
  contact: {
    title: 'Contact Us | BBIG Designs',
    isContact: true
  },
  cart: {
    title: 'Shopping Cart',
    isShop: true,
    cartItems: [
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
    ],
    subtotal: '169.98',
    shipping: '0.00',
    freeShipping: true,
    tax: '13.60',
    total: '183.58'
  },
  '404': {
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist.'
  }
};

// Pages to generate
const pages = [
  { name: 'index', template: 'home', data: sampleData.home },
  { name: 'about', template: 'about', data: sampleData.about },
  { name: 'shop/index', template: 'shop', data: sampleData.shop },
  { name: 'shop/product/1', template: 'product', data: sampleData.product },
  { name: 'gallery', template: 'gallery', data: sampleData.gallery },
  { name: 'contact', template: 'contact', data: sampleData.contact },
  { name: 'shop/cart', template: 'cart', data: sampleData.cart },
  { name: '404', template: '404', data: sampleData['404'] }
];

// Generate HTML files
async function generateHTML() {
  console.log('Generating static HTML files...');
  
  for (const page of pages) {
    const dirPath = path.join(buildDir, path.dirname(page.name));
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const fileName = path.basename(page.name) === 'index' ? 'index.html' : `${path.basename(page.name)}.html`;
    const filePath = path.join(dirPath, fileName);
    
    // Render the template
    app.render(page.template, page.data, (err, html) => {
      if (err) {
        console.error(`Error rendering ${page.template}:`, err);
        return;
      }
      
      fs.writeFileSync(filePath, html);
      console.log(`Generated ${filePath}`);
    });
  }
}

generateHTML().catch(console.error);