const { query } = require('./config/database');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await query('DELETE FROM analytics');
    await query('DELETE FROM contacts');
    await query('DELETE FROM skills');
    await query('DELETE FROM projects');
    console.log('🗑️ Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment processing and inventory management',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        github_url: 'https://github.com/elias/ecommerce',
        live_url: 'https://ecommerce.elias.dev',
        image_url: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=E-Commerce',
        featured: true
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates',
        technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
        github_url: 'https://github.com/elias/taskmanager',
        live_url: 'https://tasks.elias.dev',
        image_url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Task+Manager',
        featured: true
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather tracking with detailed forecasts and interactive maps',
        technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
        github_url: 'https://github.com/elias/weather',
        live_url: 'https://weather.elias.dev',
        image_url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Weather',
        featured: false
      }
    ];

    for (const project of projects) {
      await query(
        'INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured, view_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [project.title, project.description, project.technologies, project.github_url, project.live_url, project.image_url, project.featured, Math.floor(Math.random() * 1000)]
      );
    }
    console.log('📦 Projects seeded');

    // Seed Skills
    const skills = [
      { name: 'JavaScript', category: 'Frontend', proficiency: 5 },
      { name: 'React', category: 'Frontend', proficiency: 5 },
      { name: 'Vue.js', category: 'Frontend', proficiency: 4 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 4 },
      { name: 'HTML/CSS', category: 'Frontend', proficiency: 5 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 5 },
      { name: 'Node.js', category: 'Backend', proficiency: 5 },
      { name: 'Express', category: 'Backend', proficiency: 5 },
      { name: 'PostgreSQL', category: 'Backend', proficiency: 4 },
      { name: 'MongoDB', category: 'Backend', proficiency: 4 },
      { name: 'Python', category: 'Backend', proficiency: 3 },
      { name: 'Docker', category: 'Backend', proficiency: 3 },
      { name: 'Penetration Testing', category: 'Cybersecurity', proficiency: 4 },
      { name: 'Network Security', category: 'Cybersecurity', proficiency: 4 },
      { name: 'Cryptography', category: 'Cybersecurity', proficiency: 3 },
      { name: 'Git', category: 'Tools & Others', proficiency: 5 },
      { name: 'AWS', category: 'Tools & Others', proficiency: 3 },
      { name: 'Linux', category: 'Tools & Others', proficiency: 4 }
    ];

    for (const skill of skills) {
      await query(
        'INSERT INTO skills (name, category, proficiency) VALUES ($1, $2, $3)',
        [skill.name, skill.category, skill.proficiency]
      );
    }
    console.log('💪 Skills seeded');

    // Seed Contacts
    const contacts = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Collaboration',
        message: 'I would like to discuss a potential collaboration on a web development project.'
      },
      {
        name: 'Jane Smith',
        email: 'jane@company.com',
        subject: 'Job Opportunity',
        message: 'We have an opening for a full-stack developer and would like to connect.'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@startup.io',
        subject: 'Freelance Work',
        message: 'Looking for a React developer for a 3-month project. Interested?'
      }
    ];

    for (const contact of contacts) {
      await query(
        'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
        [contact.name, contact.email, contact.subject, contact.message]
      );
    }
    console.log('📧 Contacts seeded');

    // Seed Analytics
    const analytics = [
      { event_type: 'page_view', page_url: '/projects', user_agent: 'Mozilla/5.0...' },
      { event_type: 'page_view', page_url: '/contact', user_agent: 'Mozilla/5.0...' },
      { event_type: 'project_view', page_url: '/projects/1', user_agent: 'Mozilla/5.0...' },
      { event_type: 'contact_form_submit', page_url: '/contact', user_agent: 'Mozilla/5.0...' },
      { event_type: 'page_view', page_url: '/', user_agent: 'Mozilla/5.0...' },
      { event_type: 'skill_view', page_url: '/skills', user_agent: 'Mozilla/5.0...' }
    ];

    for (const analytic of analytics) {
      await query(
        'INSERT INTO analytics (event_type, page_url, user_agent) VALUES ($1, $2, $3)',
        [analytic.event_type, analytic.page_url, analytic.user_agent]
      );
    }
    console.log('📊 Analytics seeded');

    console.log('✅ Database seeding completed successfully!');
    
    // Display summary
    const projectCount = await query('SELECT COUNT(*) FROM projects');
    const skillCount = await query('SELECT COUNT(*) FROM skills');
    const contactCount = await query('SELECT COUNT(*) FROM contacts');
    const analyticsCount = await query('SELECT COUNT(*) FROM analytics');
    
    console.log('\n📈 Database Summary:');
    console.log(`   Projects: ${projectCount.rows[0].count}`);
    console.log(`   Skills: ${skillCount.rows[0].count}`);
    console.log(`   Contacts: ${contactCount.rows[0].count}`);
    console.log(`   Analytics: ${analyticsCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
