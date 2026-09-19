import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-white/[0.08] py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="space-y-16">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block">
            [03] Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#EDEDED] leading-tight">
            Interested in building together? Let's talk.
          </h2>
          <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
            Always open to discussions regarding novel architectures, research collaborations, or production ML engineering roles.
          </p>
        </div>

        {/* Plain text contact links only — Moritz-style, zero icon badges, underline-on-hover */}
        <div className="flex flex-wrap items-center gap-8 md:gap-14 text-base sm:text-lg font-normal">
          <a
            href="mailto:rohitghosh.ai@gmail.com"
            className="text-[#EDEDED] hover:text-white transition-colors link-underline-accent"
          >
            Email
          </a>

          <a
            href="https://linkedin.com/in/rohitghosh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDEDED] hover:text-white transition-colors link-underline-accent"
          >
            LinkedIn
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDEDED] hover:text-white transition-colors link-underline-accent"
          >
            Instagram
          </a>

          <a
            href="https://github.com/Rohitghosh14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDEDED] hover:text-blue-400 transition-colors link-underline-accent font-mono text-sm"
          >
            GitHub ↗
          </a>
        </div>

        {/* Bottom hairline metadata row */}
        <div className="pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#525252]">
          <div>
            Rohit · AI/ML Engineer · Kolkata, India
          </div>
          <div>
            Built with React, Tailwind & Framer Motion · © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};
