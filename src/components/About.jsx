import React from "react";
import profileImage from "/public/images/DSC_0104.JPG";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Building Digital Experiences
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with expertise in modern
                web technologies and a growing interest in cybersecurity. With a
                strong foundation in both frontend and backend development, I
                create robust, scalable applications that solve real-world
                problems.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    Frontend Development
                  </h4>
                  <p className="text-gray-400">
                    Building responsive, interactive user interfaces with React,
                    Vue.js, and modern CSS frameworks. Focused on creating
                    seamless user experiences with attention to detail and
                    performance optimization.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    Backend Development
                  </h4>
                  <p className="text-gray-400">
                    Developing robust server-side applications with Node.js,
                    Python, and database management. Experienced in RESTful
                    APIs, authentication systems, and cloud deployment
                    strategies.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src={profileImage}
                  alt="Elias"
                  className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-lg object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
