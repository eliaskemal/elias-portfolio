# Elias Portfolio Backend

A complete REST API backend for Elias's portfolio website with MongoDB database.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **Contact Form** with email notifications
- **Project Management** with categories and analytics
- **Skills Management** with categories and proficiency levels
- **Analytics Dashboard** with statistics
- **Security** with Helmet, CORS, and rate limiting
- **Data Validation** and error handling
- **File Upload** support
- **Environment Configuration**

## 📁 Project Structure

```
server/
├── models/          # Database models
│   ├── Contact.js
│   ├── Project.js
│   └── Skill.js
├── routes/           # API routes
│   ├── analytics.js
│   ├── contact.js
│   ├── projects.js
│   └── skills.js
├── server.js         # Main server file
├── seed.js          # Database seeder
├── package.json
└── .env.example      # Environment variables template
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   # Or update MONGODB_URI in .env for MongoDB Atlas
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   node seed.js
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📡 API Endpoints

### Contact Form
- `GET /api/contact` - Get all contact messages (paginated)
- `POST /api/contact` - Create new contact message
- `PATCH /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact message

### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/featured/list` - Get featured projects

### Skills
- `GET /api/skills` - Get all skills (grouped by category)
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/skills/category/:categoryName` - Get skills by category

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/projects/:id/views` - Get project view analytics
- `GET /api/analytics/contacts/stats` - Get contact form statistics

### Health Check
- `GET /api/health` - Server health status

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/elias-portfolio
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-super-secret-jwt-key-here
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## 📊 Database Schema

### Contact Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, validated),
  subject: String (required, max 100 chars),
  message: String (required, max 1000 chars),
  status: Enum ['pending', 'read', 'responded'],
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  image: String (required),
  technologies: [String],
  liveUrl: String,
  githubUrl: String,
  featured: Boolean (default: false),
  category: Enum ['web', 'mobile', 'ai', 'cybersecurity', 'other'],
  difficulty: Enum ['beginner', 'intermediate', 'advanced'],
  viewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  name: String (required, max 50 chars),
  category: Enum ['Frontend', 'Backend', 'Cybersecurity', 'Tools & Others'],
  level: Enum ['beginner', 'intermediate', 'advanced', 'expert'],
  yearsExperience: Number,
  icon: String,
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Rate Limiting** (100 requests per 15 minutes)
- **Input Validation** and sanitization
- **Error Handling** without exposing sensitive data
- **Environment Variables** for sensitive configuration

## 📈 Analytics Features

- Contact message statistics
- Project view tracking
- Dashboard with key metrics
- Data aggregation for insights
- Recent activity tracking

## 🚀 Deployment

1. **Set NODE_ENV=production**
2. **Configure MongoDB Atlas or production database**
3. **Set up environment variables**
4. **Install PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "portfolio-api"
   ```

## 📝 API Usage Examples

### Get Projects with Filters
```javascript
// Get all projects
GET /api/projects

// Get featured projects
GET /api/projects?featured=true

// Get projects by category
GET /api/projects?category=ai

// Search projects
GET /api/projects?search=chatbot

// Pagination
GET /api/projects?page=1&limit=5
```

### Create Contact Message
```javascript
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your work..."
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this code for your projects!
