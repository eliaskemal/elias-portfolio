const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
require('dotenv').config();

// Sample data for seeding
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.',
    image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=E-Commerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'web',
    difficulty: 'advanced'
  },
  {
    title: 'AI Chatbot Assistant',
    description: 'An intelligent chatbot powered by natural language processing, providing customer support and information retrieval.',
    image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=AI+Chatbot',
    technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'React'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'ai',
    difficulty: 'advanced'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Task+Manager',
    technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'web',
    difficulty: 'intermediate'
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts and interactive maps.',
    image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Weather+App',
    technologies: ['React', 'API Integration', 'Chart.js', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'web',
    difficulty: 'intermediate'
  },
  {
    title: 'Network Security Scanner',
    description: 'A comprehensive network security scanning tool that identifies vulnerabilities and provides detailed reports.',
    image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Security+Scanner',
    technologies: ['Python', 'Nmap', 'Metasploit', 'React', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'cybersecurity',
    difficulty: 'advanced'
  }
];

const sampleSkills = [
  // Frontend Skills
  { name: 'React', category: 'Frontend', level: 'advanced', yearsExperience: 3, featured: true },
  { name: 'Vue.js', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
  { name: 'JavaScript', category: 'Frontend', level: 'advanced', yearsExperience: 4, featured: true },
  { name: 'TypeScript', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
  { name: 'HTML5', category: 'Frontend', level: 'advanced', yearsExperience: 4 },
  { name: 'CSS3', category: 'Frontend', level: 'advanced', yearsExperience: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'advanced', yearsExperience: 2, featured: true },
  { name: 'Redux', category: 'Frontend', level: 'intermediate', yearsExperience: 2 },
  
  // Backend Skills
  { name: 'Node.js', category: 'Backend', level: 'advanced', yearsExperience: 3, featured: true },
  { name: 'Express', category: 'Backend', level: 'advanced', yearsExperience: 3 },
  { name: 'Python', category: 'Backend', level: 'advanced', yearsExperience: 3, featured: true },
  { name: 'Django', category: 'Backend', level: 'intermediate', yearsExperience: 1 },
  { name: 'REST APIs', category: 'Backend', level: 'advanced', yearsExperience: 3 },
  { name: 'GraphQL', category: 'Backend', level: 'intermediate', yearsExperience: 1 },
  { name: 'PostgreSQL', category: 'Backend', level: 'intermediate', yearsExperience: 2 },
  { name: 'MongoDB', category: 'Backend', level: 'intermediate', yearsExperience: 2 },
  
  // Cybersecurity Skills
  { name: 'Network Security', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2, featured: true },
  { name: 'Penetration Testing', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
  { name: 'Cryptography', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
  { name: 'Firewall Configuration', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2 },
  { name: 'SIEM Tools', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
  { name: 'Incident Response', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2, featured: true },
  { name: 'Security Auditing', category: 'Cybersecurity', level: 'intermediate', yearsExperience: 1 },
  { name: 'Ethical Hacking', category: 'Cybersecurity', level: 'advanced', yearsExperience: 2 },
  
  // Tools & Others
  { name: 'Git', category: 'Tools & Others', level: 'advanced', yearsExperience: 4, featured: true },
  { name: 'Docker', category: 'Tools & Others', level: 'intermediate', yearsExperience: 2 },
  { name: 'AWS', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
  { name: 'Firebase', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
  { name: 'Figma', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
  { name: 'Webpack', category: 'Tools & Others', level: 'intermediate', yearsExperience: 2 },
  { name: 'Jest', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 },
  { name: 'CI/CD', category: 'Tools & Others', level: 'intermediate', yearsExperience: 1 }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${projects.length} projects`);
    
    // Insert sample skills
    const skills = await Skill.insertMany(sampleSkills);
    console.log(`✅ Inserted ${skills.length} skills`);
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Connect to database and seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elias-portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('🔗 Connected to MongoDB');
  seedDatabase();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
