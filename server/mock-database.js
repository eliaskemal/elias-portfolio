const fs = require('fs');
const path = require('path');

// Mock database storage
const DB_FILE = path.join(__dirname, 'mock-database.json');

// Initialize mock database if it doesn't exist
function initMockDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      contacts: [],
      projects: [
        {
          _id: '1',
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.',
          image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=E-Commerce',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          liveUrl: '#',
          githubUrl: '#',
          featured: true,
          category: 'web',
          difficulty: 'advanced',
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'AI Chatbot Assistant',
          description: 'An intelligent chatbot powered by natural language processing, providing customer support and information retrieval.',
          image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=AI+Chatbot',
          technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'React'],
          liveUrl: '#',
          githubUrl: '#',
          featured: true,
          category: 'ai',
          difficulty: 'advanced',
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates and team features.',
          image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Task+Manager',
          technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
          liveUrl: '#',
          githubUrl: '#',
          featured: false,
          category: 'web',
          difficulty: 'intermediate',
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '4',
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard with location-based forecasts and interactive maps.',
          image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Weather+App',
          technologies: ['React', 'API Integration', 'Chart.js', 'Tailwind'],
          liveUrl: '#',
          githubUrl: '#',
          featured: false,
          category: 'web',
          difficulty: 'intermediate',
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '5',
          title: 'Network Security Scanner',
          description: 'A comprehensive network security scanning tool that identifies vulnerabilities and provides detailed reports.',
          image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Security+Scanner',
          technologies: ['Python', 'Nmap', 'Metasploit', 'React', 'Docker'],
          liveUrl: '#',
          githubUrl: '#',
          featured: true,
          category: 'cybersecurity',
          difficulty: 'advanced',
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      skills: [
        // Frontend Skills
        { _id: '1', name: 'React', category: 'Frontend', level: 'advanced', yearsExperience: 3, featured: true },
        { _id: '2', name: 'Vue.js', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
        { _id: '3', name: 'JavaScript', category: 'Frontend', level: 'advanced', yearsExperience: 4, featured: true },
        { _id: '4', name: 'TypeScript', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
        { _id: '5', name: 'HTML5', category: 'Frontend', level: 'advanced', yearsExperience: 4 },
        { _id: '6', name: 'CSS3', category: 'Frontend', level: 'advanced', yearsExperience: 4 },
        { _id: '7', name: 'Tailwind CSS', category: 'Frontend', level: 'advanced', yearsExperience: 2, featured: true },
        { _id: '8', name: 'Redux', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
        
        // Backend Skills
        { _id: '9', name: 'Node.js', category: 'Backend', level: 'advanced', yearsExperience: 3, featured: true },
        { _id: '10', name: 'Express', category: 'Backend', level: 'advanced', yearsExperience: 3 },
        { _id: '11', name: 'Python', category: 'Backend', level: 'advanced', yearsExperience: 3, featured: true },
        { _id: '12', name: 'Django', category: 'Backend', level: 'intermediate', yearsExperience: 1 },
        { _id: '13', name: 'REST APIs', category: 'Backend', level: 'advanced', yearsExperience: 3 },
        { _id: '14', name: 'GraphQL', category: 'Backend', level: 'intermediate', yearsExperience: 1 },
        { _id: '15', name: 'PostgreSQL', category: 'Backend', level: 'intermediate', yearsExperience: 2 },
        { _id: '16', name: 'MongoDB', category: 'Backend', level: 'intermediate', yearsExperience: 2 },
        
        // Cybersecurity Skills
        { _id: '17', name: 'Network Security', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2, featured: true },
        { _id: '18', name: 'Penetration Testing', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
        { _id: '19', name: 'Cryptography', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
        { _id: '20', name: 'Firewall Configuration', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2 },
        { _id: '21', name: 'SIEM Tools', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
        { _id: '22', name: 'Incident Response', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2, featured: true },
        { _id: '23', name: 'Security Auditing', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
        { _id: '24', name: 'Ethical Hacking', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2 },
        
        // Tools & Others
        { _id: '25', name: 'Git', category: 'Tools & Others', level: 'advanced', yearsExperience: 4, featured: true },
        { _id: '26', name: 'Docker', category: 'Tools & Others', level: 'intermediate', yearsExperience: 2 },
        { _id: '27', name: 'AWS', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
        { _id: '28', name: 'Firebase', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
        { _id: '29', name: 'Figma', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
        { _id: '30', name: 'Webpack', category: 'Tools & Others', level: 'intermediate', yearsExperience: 2 },
        { _id: '31', name: 'Jest', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
        { _id: '32', name: 'CI/CD', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 }
      ]
    };
    
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Mock database initialized with sample data');
    return initialData;
  }
  
  // Read existing database
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Mock database operations
const mockDB = {
  contacts: {
    find: async (query = {}) => {
      const data = initMockDatabase();
      let results = data.contacts;
      
      // Apply filters
      if (query.status) {
        results = results.filter(contact => contact.status === query.status);
      }
      
      // Return object with pagination methods
      return {
        data: results,
        slice: (start, end) => results.slice(start, end),
        sort: (compareFn) => results.sort(compareFn),
        length: results.length
      };
    },
    
    create: async (contactData) => {
      const data = initMockDatabase();
      const newContact = {
        _id: Date.now().toString(),
        ...contactData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      data.contacts.push(newContact);
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      console.log('✅ Contact created:', newContact.name);
      return newContact;
    },
    
    countDocuments: async () => {
      const data = initMockDatabase();
      return data.contacts.length;
    }
  },
  
  projects: {
    find: async (query = {}) => {
      const data = initMockDatabase();
      let results = data.projects;
      
      // Apply filters
      if (query.category) {
        results = results.filter(project => project.category === query.category);
      }
      if (query.featured === 'true') {
        results = results.filter(project => project.featured);
      }
      if (query.search) {
        const search = query.search.toLowerCase();
        results = results.filter(project => 
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.technologies.some(tech => tech.toLowerCase().includes(search))
        );
      }
      
      // Pagination
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;
      
      return {
        skip: () => results.slice(skip),
        limit: () => results.slice(skip, skip + limit),
        sort: () => results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.createdAt) - new Date(a.createdAt))
      };
    },
    
    findById: async (id) => {
      const data = initMockDatabase();
      const project = data.projects.find(p => p._id === id);
      
      if (project) {
        // Increment view count
        project.viewCount = (project.viewCount || 0) + 1;
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      }
      
      return project;
    },
    
    countDocuments: async () => {
      const data = initMockDatabase();
      return data.projects.length;
    }
  },
  
  skills: {
    find: async (query = {}) => {
      const data = initMockDatabase();
      let results = data.skills;
      
      // Apply filters
      if (query.category) {
        results = results.filter(skill => skill.category === query.category);
      }
      if (query.level) {
        results = results.filter(skill => skill.level === query.level);
      }
      if (query.featured === 'true') {
        results = results.filter(skill => skill.featured);
      }
      
      return {
        sort: () => results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name))
      };
    },
    
    findById: async (id) => {
      const data = initMockDatabase();
      return data.skills.find(s => s._id === id);
    }
  }
};

module.exports = { mockDB, initMockDatabase };
