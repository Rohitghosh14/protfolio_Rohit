import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-36 border-t border-white/[0.08] px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start"
      >
        {/* Section Label */}
        <div className="md:col-span-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#737373]">
            [01] About
          </span>
        </div>

        {/* Bio & Philosophy */}
        <div className="md:col-span-9 space-y-10">
          <p className="text-2xl sm:text-3xl md:text-4xl text-[#EDEDED] font-normal leading-relaxed tracking-tight">
            I build machine learning and deep learning systems from scratch rather than copying tutorials.
            Every architecture is grounded in mathematical intuition, benchmarked empirically, and root-cause debugged down to individual tensor gradients.
          </p>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-2xl font-normal">
            Based in Kolkata, India. Driven by reproducible science, meticulous documentation, and understanding why models fail before celebrating when they converge.
          </p>

          {/* Plain Text Tech Stack Row (Moritz-style: No logos/icons, pure typography) */}
          <div className="pt-6 border-t border-white/[0.06]">
            <span className="block text-xs font-mono uppercase tracking-widest text-[#525252] mb-3">
              Core Technologies
            </span>
            <p className="text-sm md:text-base font-mono text-[#A1A1AA] tracking-wide leading-relaxed">
              Python · PyTorch · scikit-learn · FastAPI · Streamlit · NumPy · Docker · Hugging Face
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
