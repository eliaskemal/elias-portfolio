import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleNavigation = (section) => {
    // If we're in admin mode, go back to portfolio first
    if (showAdmin) {
      setShowAdmin(false);
      // Wait for the component to re-render, then scroll
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Normal navigation - just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Particles />
      <Header onNavigate={handleNavigation} />
      <main>
        {!showAdmin ? (
          <>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <div className="text-center py-8">
              <button
                onClick={() => setShowAdmin(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Admin Dashboard
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center py-8">
              <button
                onClick={() => setShowAdmin(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Back to Portfolio
              </button>
            </div>
            <AdminDashboard />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
