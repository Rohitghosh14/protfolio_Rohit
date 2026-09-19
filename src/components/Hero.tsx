import React from 'react';
import { motion } from 'framer-motion';
import { PerceptronCanvas } from './PerceptronCanvas';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      {/* Signature Perceptron Canvas Visual: Placed in the background, low opacity so text stays crisp */}
      <PerceptronCanvas />

      {/* Foreground Content - Pure editorial typography, high contrast */}
      <div className="relative z-10 max-w-3xl pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Identity Tag */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
              Portfolio · 2026
            </span>
            <span className="h-px w-8 bg-white/10" />
            <span className="text-xs font-mono text-[#737373]">
              Kolkata, India
            </span>
          </div>

          {/* Large Type-Led Hero: Name & Title ARE the hero */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-[#EDEDED] leading-[0.95] select-none">
            Rohit
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#A1A1AA] tracking-tight max-w-2xl leading-snug">
            AI/ML Engineer building from{' '}
            <span className="text-[#EDEDED] underline decoration-blue-500/40 decoration-1 underline-offset-4">
              first principles
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-[#737373] font-normal leading-relaxed max-w-xl">
            Designing mathematical foundations, training neural representations, and deploying
            scalable machine learning pipelines. No black-boxes, no boilerplate without comprehension.
          </p>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-8 text-sm">
            <a
              href="https://github.com/Rohitghosh14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDEDED] font-medium link-underline-accent hover:text-blue-400 transition-colors"
            >
              View GitHub Profile →
            </a>

            <a
              href="#projects"
              className="text-[#737373] hover:text-[#EDEDED] link-underline transition-colors"
            >
              Explore Selected Systems ↓
            </a>
          </div>

          {/* Interaction hint */}
          <div className="pt-8 text-[11px] font-mono text-[#4A4A4A] tracking-wider hidden md:block">
            [INTERACTIVE: Hover near neural nodes above to trigger forward signal flow]
          </div>
        </motion.div>
      </div>
    </section>
  );
};
