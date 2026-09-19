import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Format live time in Kolkata, India (IST, UTC+5:30)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full border-b border-white/[0.06] bg-[#0A0A0A]/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between text-sm">
        {/* Left: Name & Location */}
        <div className="flex items-baseline gap-4 md:gap-6">
          <a
            href="#"
            className="text-base font-medium tracking-tight text-[#EDEDED] hover:text-white transition-colors"
          >
            Rohit
          </a>
          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[#737373] tracking-wide font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Kolkata, IN {time ? `· ${time} IST` : ''}
          </span>
        </div>

        {/* Right: Plain text links with underline draw */}
        <nav className="flex items-center gap-6 md:gap-9 text-xs md:text-sm font-normal text-[#8E8E93]">
          <a
            href="#projects"
            className="text-[#A1A1AA] hover:text-[#EDEDED] transition-colors link-underline"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-[#A1A1AA] hover:text-[#EDEDED] transition-colors link-underline"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-[#A1A1AA] hover:text-[#EDEDED] transition-colors link-underline"
          >
            Contact
          </a>
          <a
            href="https://github.com/Rohitghosh14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDEDED] hover:text-blue-400 transition-colors link-underline-accent font-mono text-xs"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
};
