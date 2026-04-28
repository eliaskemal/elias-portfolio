import React, { useState, useEffect } from "react";
import { apiService, handleApiError } from "../services/api";

const Skills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to false immediately to show fallback data
    setLoading(false);
    setError(null);
    // fetchSkills(); // Comment out API call for now
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      // Set a timeout to show fallback data if API takes too long
      const timeout = setTimeout(() => {
        setLoading(false);
        setError(null);
      }, 3000); // 3 seconds timeout

      const response = await apiService.getSkills();
      clearTimeout(timeout);

      if (response.data.success) {
        setSkills(response.data.data);
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
      <section id="skills" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Technical Skills
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
      <section id="skills" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Technical Skills
          </h2>
          <div className="text-center text-red-400">
            Error loading skills: {error}
          </div>
        </div>
      </section>
    );
  }

  // If no skills from API, show fallback skills
  const displaySkills =
    Object.keys(skills).length > 0
      ? skills
      : {
          Frontend: [
            {
              _id: "1",
              name: "React",
              category: "Frontend",
              level: "advanced",
              yearsExperience: 3,
              featured: true,
            },
            {
              _id: "3",
              name: "JavaScript",
              category: "Frontend",
              level: "advanced",
              yearsExperience: 4,
              featured: true,
            },
            {
              _id: "4",
              name: "TypeScript",
              category: "Frontend",
              level: "intermediate",
              yearsExperience: 2,
            },
            {
              _id: "5",
              name: "HTML5",
              category: "Frontend",
              level: "advanced",
              yearsExperience: 4,
            },
            {
              _id: "7",
              name: "Tailwind CSS",
              category: "Frontend",
              level: "advanced",
              yearsExperience: 2,
              featured: true,
            },
          ],
          Backend: [
            {
              _id: "9",
              name: "Node.js",
              category: "Backend",
              level: "advanced",
              yearsExperience: 3,
              featured: true,
            },
            {
              _id: "10",
              name: "Express",
              category: "Backend",
              level: "advanced",
              yearsExperience: 3,
            },
            {
              _id: "11",
              name: "Python",
              category: "Backend",
              level: "advanced",
              yearsExperience: 3,
              featured: true,
            },
            {
              _id: "12",
              name: "Django",
              category: "Backend",
              level: "intermediate",
              yearsExperience: 1,
            },
            {
              _id: "15",
              name: "PostgreSQL",
              category: "Backend",
              level: "intermediate",
              yearsExperience: 2,
            },
            {
              _id: "16",
              name: "MongoDB",
              category: "Backend",
              level: "intermediate",
              yearsExperience: 2,
            },
          ],
          "Tools & Others": [
            {
              _id: "25",
              name: "Git",
              category: "Tools & Others",
              level: "advanced",
              yearsExperience: 4,
              featured: true,
            },
            {
              _id: "29",
              name: "Figma",
              category: "Tools & Others",
              level: "intermediate",
              yearsExperience: 1,
            },
          ],
        };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-black to-gray-900"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Skills & Technologies
        </h2>
        {Object.entries(displaySkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {categorySkills.map((skill, index) => (
                <div
                  key={skill._id || index}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h4>
                      {skill.featured && (
                        <span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 text-xs rounded-full border border-blue-500">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-gray-400">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
