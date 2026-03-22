import React, { useState, useEffect } from "react";
import { apiService, handleApiError } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to false immediately to show fallback data
    setLoading(false);
    setError(null);
    // fetchProjects(); // Comment out API call for now
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Set a timeout to show fallback data if API takes too long
      const timeout = setTimeout(() => {
        setLoading(false);
        setError(null);
      }, 3000); // 3 seconds timeout

      const response = await apiService.getProjects();
      clearTimeout(timeout);

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(handleApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Featured Projects
          </h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Featured Projects
          </h2>
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading projects: {error}</p>
            <button
              onClick={fetchProjects}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // If no projects from API, show fallback projects
  const displayProjects =
    projects.length > 0
      ? projects
      : [
          {
            _id: "1",
            title: "E-Commerce Platform",
            description:
              "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
            image:
              "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            githubUrl: "https://github.com/eliaskemal/ecommerce-platform",
            liveUrl: "https://graceful-sopapillas-4ac0c9.netlify.app",
            featured: true,
            category: "full-stack",
            difficulty: "advanced",
            viewCount: 1250,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "2",
            title: "Task Management App",
            description:
              "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image:
              "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
            technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
            githubUrl: "https://github.com/eliaskemal/task-management-app",
            liveUrl: "https://example-tasks.com",
            featured: true,
            category: "full-stack",
            difficulty: "intermediate",
            viewCount: 890,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "3",
            title: "Weather Dashboard",
            description:
              "A responsive weather dashboard with location-based forecasts, interactive maps, and beautiful data visualizations.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Weather+Dashboard",
            technologies: [
              "React",
              "Chart.js",
              "OpenWeather API",
              "Tailwind CSS",
            ],
            githubUrl: "https://github.com/eliaskemal",
            liveUrl: "https://example-weather.com",
            featured: true,
            category: "frontend",
            difficulty: "beginner",
            viewCount: 650,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "4",
            title: "AI Chatbot Assistant",
            description:
              "An intelligent chatbot powered by machine learning, capable of natural language processing and contextual conversations.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=AI+Chatbot",
            technologies: ["Python", "TensorFlow", "Flask", "React"],
            githubUrl: "https://github.com/eliaskemal",
            liveUrl: "https://example-chatbot.com",
            featured: true,
            category: "ai-ml",
            difficulty: "advanced",
            viewCount: 2100,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayProjects.map((project, index) => (
            <div
              key={project._id || index}
              className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 text-xs rounded-full border border-blue-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex-1 text-center px-4 py-2 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
