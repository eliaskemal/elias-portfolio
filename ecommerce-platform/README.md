# 🛍️ E-Commerce Platform

A full-stack e-commerce solution with React, Node.js, and MongoDB featuring user authentication, payment processing, and admin dashboard.

## 🌟 Features

### Frontend (React + TypeScript + Tailwind CSS)
- 🛍️ **Shopping Experience**: Product catalog, search, filtering, sorting
- 🛒 **Shopping Cart**: Add/remove items, quantity updates, real-time totals
- 👤 **User Authentication**: Login, registration, profile management
- 🎨 **Modern UI**: Fancy black and blue theme with animations
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- 🎯 **Interactive Elements**: Hover effects, transitions, glass morphism

### Backend (Node.js + Express + MongoDB)
- 🔐 **Secure Authentication**: JWT-based with bcrypt password hashing
- 📦 **Product Management**: Full CRUD operations with stock management
- 📋 **Order Processing**: Complete order lifecycle with status tracking
- 📊 **Admin Dashboard**: Analytics, user management, sales reports
- 🗄 **Database Schema**: Optimized MongoDB models with relationships
- 🔒 **Security**: Input validation, CORS,Helmet, role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd E-Commerce Platform
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Frontend (optional)
   cd ../frontend
   # Create .env if needed
   ```

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Run Applications**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Database**: mongodb://localhost:27017/ecommerce

## 📁 Project Structure

```
E-Commerce Platform/
├── frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React Context providers
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js Backend API
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Express middleware
│   ├── config/           # Configuration files
│   └── package.json
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start with auto-reload
npm start           # Start production server
npm test             # Run tests
```

### Database Management
```bash
cd backend
node db-viewer.js      # Easy database viewer
mongosh ecommerce     # Direct MongoDB shell
```

## 🔗 API Integration

### Frontend → Backend
The frontend communicates with the backend through RESTful API endpoints:

```javascript
// Example API call in frontend
const response = await fetch('http://localhost:5000/api/products');
const products = await response.json();
```

### Authentication Flow
1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. **Get Token**: JWT returned for authenticated requests
4. **Protected Routes**: Include `Authorization: Bearer <token>` header

## 🎨 Customization

### Colors & Theme
- **Primary Blue**: `#3b82f6` to `#1e40af`
- **Dark Background**: `#0f172a` to `#1e293b`
- **Accent Colors**: `#0ea5e9` series for highlights

### Adding New Products
```javascript
// Backend - Create new product
const product = new Product({
  name: "Product Name",
  price: 99.99,
  category: "Electronics",
  // ... other fields
});
await product.save();
```

### Custom Styling
```css
/* Frontend - Custom theme colors */
.hero-gradient {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}
```

## 📊 Database Schema

### User Model
- Authentication credentials
- Profile information
- Address book
- Role-based permissions

### Product Model
- Product information
- Inventory tracking
- Review system
- Category management

### Order Model
- Order items and quantities
- Shipping information
- Payment processing
- Status tracking

## 🔒 Security Features

### Authentication
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure with expiration
- **Input Validation**: express-validator for all inputs
- **Rate Limiting**: Prevent brute force attacks

### API Security
- **CORS Configuration**: Cross-origin requests
- **Helmet.js**: Security headers
- **Role-Based Access**: Admin-only endpoints
- **Error Handling**: Sanitized error messages

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting provider
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your server with PM2 or similar
```

### Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
PORT=5000
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test              # Run unit tests
npm run test:coverage  # Run with coverage
```

### Backend Tests
```bash
cd backend
npm test              # Run API tests
npm run test:watch    # Run in watch mode
```

## 📈 Performance

### Frontend Optimization
- **Code Splitting**: Automatic with React.lazy()
- **Image Optimization**: Webp format support
- **Bundle Analysis**: Built-in Vite analyzer
- **Caching**: Service worker for offline support

### Backend Optimization
- **Database Indexing**: Optimized queries
- **Caching Strategy**: Redis for frequent data
- **Compression**: Gzip for API responses
- **Connection Pooling**: Efficient MongoDB connections

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature-name`
3. **Make changes**: Follow existing patterns
4. **Add tests**: Ensure functionality works
5. **Commit changes**: `git commit -m "Add feature"`
6. **Push branch**: `git push origin feature-name`
7. **Create pull request**: Describe changes clearly

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Support

For questions, issues, or contributions:
- 📧 Email: support@ecommerce-platform.com
- 🐛 Issues: [GitHub Issues](link-to-issues)
- 📖 Documentation: [Full Docs](link-to-docs)

---

**🎉 Happy Coding! Build something amazing with this e-commerce platform!**
