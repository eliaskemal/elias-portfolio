# E-Commerce Frontend

A modern, responsive e-commerce frontend built with React, TypeScript, and Tailwind CSS. This application provides a complete shopping experience with user authentication, product browsing, shopping cart functionality, and more.

## Features

### 🛍️ Shopping Experience

- **Product Catalog**: Browse and search products with filtering and sorting
- **Product Details**: View detailed product information with images and reviews
- **Shopping Cart**: Add/remove items, update quantities, and see real-time totals
- **Wishlist**: Save products for later (planned feature)

### 👤 User Authentication

- **Login/Registration**: Secure user authentication system
- **User Profiles**: Manage account information and view order history
- **Role-based Access**: Different experiences for regular users and admins

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Smooth animations and transitions
- **Accessibility**: Built with accessibility best practices
- **Dark Mode Support**: Easy on the eyes in low-light environments

### 🛠️ Technical Features

- **TypeScript**: Type-safe development experience
- **React Router**: Client-side routing for SPA navigation
- **Context API**: State management for cart and authentication
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Beautiful, consistent icon system

## Tech Stack

- **Frontend**: React 19.2.4 with TypeScript
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 3.3.0
- **Routing**: React Router DOM 6.8.0
- **Icons**: Lucide React 0.263.1
- **State Management**: React Context API
- **Development**: ESLint, TypeScript Compiler

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Input, etc.)
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   └── products/      # Product-specific components
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── pages/             # Page components
│   │   ├── Home.tsx          # Homepage
│   │   ├── Products.tsx      # Product listing
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Login.tsx         # User login
│   │   └── Register.tsx      # User registration
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd e-commerce-platform/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Usage

### Browsing Products

1. Navigate to the homepage to see featured products
2. Click "Products" to view the full catalog
3. Use search and filters to find specific items
4. Click on any product to view details

### Shopping Cart

1. Add products to cart from product listings or detail pages
2. Click the cart icon to view your items
3. Adjust quantities or remove items
4. Proceed to checkout when ready

### User Account

1. Click "Register" to create a new account
2. Fill in your details and submit
3. Login with your credentials
4. Access your profile and order history

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=ShopHub
```

### Tailwind CSS Customization

Edit `tailwind.config.js` to customize:

- Color palette
- Font families
- Breakpoints
- Custom utilities

## Development

### Code Style

- Uses TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)
- Component-based architecture

### Adding New Components

1. Create component in appropriate directory
2. Use TypeScript interfaces for props
3. Follow existing naming conventions
4. Export as default export

### State Management

- Use React Context for global state
- Local state with useState/useReducer
- Keep state close to where it's used

## Future Enhancements

### Planned Features

- [ ] Product detail pages with reviews
- [ ] Admin dashboard for product management
- [ ] Order tracking system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Wishlist functionality
- [ ] Product search with autocomplete
- [ ] Advanced filtering options
- [ ] User profile management
- [ ] Order history
- [ ] Review and rating system

### Technical Improvements

- [ ] Unit testing with Jest/React Testing Library
- [ ] E2E testing with Playwright
- [ ] PWA capabilities
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] Loading states and skeletons
- [ ] Internationalization (i18n)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Note**: This is the frontend portion of a full-stack e-commerce application. The backend API integration is planned for future development.
