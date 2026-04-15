// Fallback database configuration for when PostgreSQL is not available
const { mockDB } = require('../mock-database');

const mockQuery = async (text, params = []) => {
  // Simple mock query implementation
  console.log('Mock Query:', text, params);
  
  // Handle basic SELECT queries
  if (text.toLowerCase().includes('select count(*)')) {
    const tableName = text.match(/from\s+(\w+)/i)?.[1];
    const count = mockDB[tableName]?.length || 0;
    return { rows: [{ count }] };
  }
  
  if (text.toLowerCase().includes('select')) {
    const tableName = text.match(/from\s+(\w+)/i)?.[1];
    const data = mockDB[tableName] || [];
    return { rows: data, rowCount: data.length };
  }
  
  // Handle INSERT queries
  if (text.toLowerCase().includes('insert')) {
    return { rows: [{ id: Math.floor(Math.random() * 1000) }] };
  }
  
  // Default response
  return { rows: [], rowCount: 0 };
};

const mockInitDatabase = async () => {
  console.log('Using mock database - no PostgreSQL connection required');
  return Promise.resolve();
};

module.exports = {
  query: mockQuery,
  initDatabase: mockInitDatabase,
  pool: null // No actual pool in mock mode
};
