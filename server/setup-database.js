const mongoose = require('mongoose');
require('dotenv').config();

// Database setup options
const setupOptions = {
  // Option 1: Use MongoDB Atlas (Cloud - Recommended)
  atlas: {
    uri: 'mongodb+srv://username:password@cluster.mongodb.net/elias-portfolio?retryWrites=true&w=majority',
    description: 'MongoDB Atlas Cloud Database'
  },
  
  // Option 2: Use Local MongoDB
  local: {
    uri: 'mongodb://localhost:27017/elias-portfolio',
    description: 'Local MongoDB Database'
  },
  
  // Option 3: Use in-memory database (for testing)
  memory: {
    uri: 'mongodb://localhost:27017/elias-portfolio-test',
    description: 'In-memory Database for Testing'
  }
};

async function setupDatabase() {
  console.log('🔗 Setting up database...\n');
  
  // Check which database to use
  const dbChoice = process.env.DB_CHOICE || 'local';
  const dbConfig = setupOptions[dbChoice];
  
  if (!dbConfig) {
    console.error('❌ Invalid database choice. Available options:');
    Object.keys(setupOptions).forEach(key => {
      console.log(`   ${key}: ${setupOptions[key].description}`);
    });
    process.exit(1);
  }
  
  console.log(`📊 Using: ${dbConfig.description}`);
  console.log(`🔗 URI: ${dbConfig.uri}\n`);
  
  try {
    await mongoose.connect(dbConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Database connected successfully!');
    console.log('🎉 Ready to start the server!\n');
    
    // Test database connection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📁 Available collections: ${collections.map(c => c.name).join(', ')}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    
    // Provide specific solutions
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions:');
      console.log('   1. Install MongoDB locally:');
      console.log('      - Download: https://www.mongodb.com/try/download/community');
      console.log('      - Install and start MongoDB service');
      console.log('   2. Use MongoDB Atlas (recommended):');
      console.log('      - Get free cluster: https://www.mongodb.com/atlas');
      console.log('      - Update .env with Atlas URI');
      console.log('   3. Check if MongoDB is running:');
      console.log('      - Windows: Check Services');
      console.log('      - Mac/Linux: sudo systemctl status mongod');
    }
    
    return false;
  }
}

// If this file is run directly
if (require.main === module) {
  setupDatabase()
    .then(success => {
      if (success) {
        console.log('🚀 You can now start the server with: npm run dev');
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupDatabase, setupOptions };
