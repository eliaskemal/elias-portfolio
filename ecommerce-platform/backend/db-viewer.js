const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('✅ Connected to MongoDB - E-Commerce Database');
    console.log('📊 Available Collections:');
    console.log('   - users');
    console.log('   - products');
    console.log('   - orders');
    console.log('\n🔍 Sample Queries:');
    console.log('   View all users: db.users.find().pretty()');
    console.log('   View all products: db.products.find().pretty()');
    console.log('   View all orders: db.orders.find().pretty()');
    console.log('\n💡 Starting MongoDB Shell...');
    console.log('   You can now run queries in the terminal below.\n');
    
    // Start interactive shell
    const { spawn } = require('child_process');
    const shell = spawn('mongosh', ['ecommerce'], { 
      stdio: 'inherit',
      shell: true 
    });
    
    shell.on('error', (error) => {
      console.error('❌ Could not start MongoDB Shell:', error.message);
      console.log('\n📖 Manual Instructions:');
      console.log('1. Open new terminal');
      console.log('2. Run: mongosh ecommerce');
      console.log('3. Try queries like:');
      console.log('   db.users.find().pretty()');
      console.log('   db.products.find({category: "Electronics"}).pretty()');
      console.log('   db.orders.find({status: "Pending"}).pretty()');
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running: mongod');
    console.log('2. Check connection string in .env file');
    console.log('3. Verify MongoDB is installed correctly');
  });
