# BBIG Designs Website

A multi-page website for BBIG Designs, showcasing their handcrafted belt buckles made in Colorado. The website includes various features like product listings, image gallery, contact form, and checkout functionality.

## Features

- Responsive design using Bootstrap 5
- Multi-page website with reusable components
- Product catalog with category filtering
- Image gallery with category filtering
- Detailed product pages with image viewer
- Shopping cart functionality
- Contact form with validation
- Handlebars templating for consistent layouts
- AJAX functionality for dynamic content
- Docker support for local development

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5, Font Awesome
- **Backend**: Node.js, Express.js
- **Templating**: Handlebars
- **Form Processing**: Body Parser
- **File Uploads**: Multer
- **Containerization**: Docker
- **Payment Processing**: Stripe API (integration ready)

## Project Structure

```
bbig-designs-website/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── public/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── favicon.ico
├── views/
│   ├── layouts/
│   ├── partials/
│   └── [page templates]
├── routes/
├── models/
├── controllers/
├── app.js
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker and Docker Compose (optional, for containerized development)

### Option 1: Local Development

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd bbig-designs-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the website at http://localhost:3000

### Option 2: Docker Development

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd bbig-designs-website
   ```

2. Build and start the Docker container:
   ```bash
   docker-compose up
   ```

3. Access the website at http://localhost:3000

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
# Add Stripe API keys for payment processing
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Adding New Pages

1. Create a new Handlebars template in the `views/` directory
2. Create a new route file in the `routes/` directory
3. Add the route to `app.js`

## Integrating Stripe Payments

This project is set up to use Stripe for payment processing. To integrate Stripe:

1. Sign up for a Stripe account at https://stripe.com
2. Add your Stripe API keys to the `.env` file
3. Uncomment the Stripe integration code in the checkout routes

## Deployment

### Production Build

For production deployment, run:

```bash
npm run build
```

### Hosting Recommendations

- **Shared Hosting**: Upload the built files to your web hosting provider
- **VPS/Dedicated Server**: Use PM2 or similar for process management
- **Cloud Platforms**: Deploy to Heroku, AWS, or other cloud platforms

## License

[License information here]

## Contact

For any questions or support, please contact:
- Email: [your-email]
- Website: [your-website]