import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-300">
      {/* Editorial Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section with Interactive Perceptron Motif */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Selected Systems & Engineering Projects */}
        <Projects />
      </main>

      {/* Moritz-style Editorial Plain Text Footer */}
      <Footer />
    </div>
  );
};

export default App;
