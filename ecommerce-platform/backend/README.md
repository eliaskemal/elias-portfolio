# E-Commerce Backend API

A comprehensive RESTful API for e-commerce applications built with Node.js, Express, and MongoDB.

## 🚀 Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (User/Admin)
- Password hashing with bcrypt

### Product Management
- CRUD operations for products
- Advanced filtering and search
- Category-based filtering
- Price range filtering
- Rating system
- Stock management

### Order Management
- Create and manage orders
- Order status tracking
- Payment processing integration
- Shipping management
- Order history

### User Management
- Profile management
- Address book
- Password updates
- User roles and permissions

### Admin Dashboard
- User management
- Order management
- Sales analytics
- Product statistics
- Monthly sales reports

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - JWT secret key
   - `PORT` - Server port (default: 5000)

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
```
**Headers:** `Authorization: Bearer <token>`

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=20&category=Electronics&minPrice=50&maxPrice=500&sort=price-low
```

#### Get Featured Products
```http
GET /products/featured
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin only)
```http
POST /products
```

#### Update Product (Admin only)
```http
PUT /products/:id
```

#### Delete Product (Admin only)
```http
DELETE /products/:id
```

### Order Endpoints

#### Create Order
```http
POST /orders
```
**Body:**
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Credit Card"
}
```

#### Get User Orders
```http
GET /orders
```

#### Get Single Order
```http
GET /orders/:id
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /admin/dashboard
```

#### Get All Users
```http
GET /admin/users
```

#### Get All Orders
```http
GET /admin/orders
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated and sanitized
- **Role-Based Access**: Admin-only routes protected
- **CORS Enabled**: Cross-origin requests configured
- **Helmet**: Security headers set

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  addresses: [Address],
  phone: String,
  avatar: String,
  emailVerified: Boolean,
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviews: [Review],
  specifications: Object,
  tags: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  createdBy: ObjectId
}
```

### Order Model
```javascript
{
  user: ObjectId,
  orderItems: [OrderItem],
  shippingAddress: Address,
  paymentMethod: String,
  totalPrice: Number,
  status: String (Pending/Processing/Shipped/Delivered),
  isPaid: Boolean,
  paidAt: Date,
  deliveredAt: Date
}
```

## 🚀 Deployment

### Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-super-secret-key
PORT=5000
```

### PM2 Setup
```bash
npm install -g pm2
pm2 start server.js --name "ecommerce-api"
```

## 🧪 Testing

```bash
# Run tests
npm test
```

## 📝 Development

### Adding New Routes
1. Create route file in `/routes` directory
2. Import in `server.js`
3. Add middleware as needed

### Database Models
1. Create schema in `/models` directory
2. Add validation and middleware
3. Use Mongoose for database operations

### Error Handling
All routes include comprehensive error handling with appropriate HTTP status codes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
