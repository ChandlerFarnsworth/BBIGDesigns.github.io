/**
 * Product Model
 * In a real implementation, this would be a Mongoose schema or 
 * another database ORM model. For now, it's just a reference for structure.
 */

const ProductSchema = {
    id: String, // Unique identifier
    name: String, // Product name
    slug: String, // URL-friendly version of name
    description: String, // Short description
    detailedDescription: String, // Longer description with HTML allowed
    price: Number, // null means "Contact for pricing"
    compareAtPrice: Number, // Original price for sale items
    category: {
      id: String,
      name: String,
      slug: String
    },
    subCategory: {
      id: String,
      name: String, 
      slug: String
    },
    options: [
      {
        id: String,
        name: String,
        values: [String] // Array of options like ["Silver", "Brass", "Nickel"]
      }
    ],
    variants: [
      {
        id: String,
        sku: String,
        optionValues: [String], // e.g. ["Silver", "Polished"]
        price: Number,
        compareAtPrice: Number,
        inventory: Number, // Quantity in stock
        weight: Number,
        dimensions: {
          length: Number,
          width: Number,
          height: Number
        }
      }
    ],
    images: [
      {
        id: String,
        src: String, // URL
        alt: String,
        sortOrder: Number
      }
    ],
    mainImage: String, // URL of primary image
    thumbnailImage: String, // URL of thumbnail
    featured: Boolean, // Whether to show in featured products
    new: Boolean, // Whether to show as new
    bestSeller: Boolean, // Whether to show as best seller
    taxable: Boolean, // Whether product is taxable
    tags: [String], // Array of tags
    specifications: [
      {
        name: String,
        value: String
      }
    ],
    features: [String], // Bullet points of features
    careInstructions: String, // Care instructions with HTML allowed
    inventory: Number, // Total quantity in stock
    backorderable: Boolean, // Whether can be backordered
    weight: Number, // In ounces or grams
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingDimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    relatedProducts: [String], // Array of related product IDs
    reviews: [
      {
        id: String,
        author: String,
        email: String,
        rating: Number,
        title: String,
        content: String,
        date: Date,
        verified: Boolean,
        response: String // Admin response to review
      }
    ],
    averageRating: Number, // Average of all review ratings
    averageRatingRounded: Number, // Rounded to nearest half (e.g., 4.5)
    reviewCount: Number, // Number of reviews
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date
  };
  
  /**
   * For demonstration purposes, a function to create a basic product object
   */
  function createProduct(id, name, price, description, category, imageUrl) {
    return {
      id,
      name, 
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      price,
      category: {
        id: category.id || category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: category,
        slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      },
      mainImage: imageUrl,
      images: [imageUrl],
      featured: false,
      new: false,
      bestSeller: false,
      inventory: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date()
    };
  }
  
  module.exports = {
    createProduct
  };