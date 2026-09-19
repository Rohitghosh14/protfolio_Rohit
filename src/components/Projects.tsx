import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: string;
  number: string;
  title: string;
  metrics?: string;
  description: string;
  tags: string[];
  githubUrl: string;
  type: 'dehazing' | 'exoplanet' | 'fifa' | 'ai-pet' | 'nlp' | 'recsys';
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'aod-net',
    number: '01',
    title: 'AOD-Net: From-Scratch Atmospheric Dehazing',
    metrics: '20.30 dB PSNR · 0.811 SSIM',
    description:
      'Engineered an end-to-end convolutional dehazing network in PyTorch without prepackaged weights. Diagnosed and resolved a subtle dying-ReLU failure mode through systematic per-channel activation tracking and customized residual connections.',
    tags: ['PyTorch', 'Computer Vision', 'Per-channel Diagnosis', 'Custom Loss'],
    githubUrl: 'https://github.com/Rohitghosh14',
    type: 'dehazing',
  },
  {
    id: 'exoplanet',
    number: '02',
    title: 'Exoplanet Habitability Predictor',
    metrics: 'NASA Archive API · Custom ESI Engine',
    description:
      'Engineered an automated classification pipeline ingesting confirmed Kepler/TESS exoplanet telemetry. Designed an algorithmic Earth Similarity Index (ESI) scoring system and deployed an ensemble SVM & Random Forest predictor with an interactive Streamlit UI.',
    tags: ['NASA API', 'Scikit-learn', 'SVM & Random Forest', 'Streamlit'],
    githubUrl: 'https://github.com/Rohitghosh14/exoplanet-habitability-predictor',
    type: 'exoplanet',
  },
  {
    id: 'fifa-2026',
    number: '03',
    title: 'FIFA World Cup 2026 Match Predictor',
    metrics: '55% Historical Accuracy · Monte Carlo',
    description:
      'Constructed a predictive modeling pipeline for the 48-team tournament structure. Engineered team strength ratings, travel fatigue, and historical Elo trajectories, validating on prior tournament out-of-sample brackets.',
    tags: ['Python', 'Monte Carlo Simulation', 'Feature Engineering', 'Predictive Modeling'],
    githubUrl: 'https://github.com/Rohitghosh14/fifa-worldcup-2026-predictor',
    type: 'fifa',
  },
  {
    id: 'ai-pet-rio',
    number: '04',
    title: 'Desktop AI Pet "Rio"',
    metrics: 'Mem0 Episodic Memory · Ambient State Engine',
    description:
      'Autonomous desktop companion with a low-latency LLM reasoning core, long-term memory retrieval via Mem0, and dynamic personality responses driven by local weather, diurnal day/night cycles, and voice pipeline.',
    tags: ['LLM Orchestration', 'Mem0 Memory', 'Voice Pipeline', 'FastAPI'],
    githubUrl: 'https://github.com/Rohitghosh14',
    type: 'ai-pet',
  },
  {
    id: 'dark-pattern',
    number: '05',
    title: 'Dark Pattern Language Detector',
    metrics: 'DistilBERT · Token Classification Pipeline',
    description:
      'Deep learning NLP service to detect deceptive UX copywriting (urgency manipulation, sneak-into-basket, hidden costs). Fine-tuned DistilBERT with custom classification heads and served through a low-latency FastAPI backend.',
    tags: ['DistilBERT', 'Hugging Face', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/Rohitghosh14',
    type: 'nlp',
  },
  {
    id: 'movie-recsys',
    number: '06',
    title: 'Movie Recommendation Engine',
    metrics: 'Vector Cosine Similarity · Latent Embeddings',
    description:
      'Content-based vector search engine computing high-dimensional cosine similarity across metadata embeddings and user preference matrices, delivered as an instantaneous search interface.',
    tags: ['Scikit-learn', 'Cosine Similarity', 'Vector Retrieval', 'Streamlit'],
    githubUrl: 'https://github.com/Rohitghosh14',
    type: 'recsys',
  },
];

// Bespoke clean visual preview components for each system
const ProjectVisual: React.FC<{ type: Project['type']; isInView: boolean }> = ({
  type,
  isInView,
}) => {
  // AOD-Net Interactive Dehazing Split-Screen Visualizer
  if (type === 'dehazing') {
    return <DehazingVisual isInView={isInView} />;
  }

  // Exoplanet Habitability Telemetry Graphic
  if (type === 'exoplanet') {
    return <ExoplanetVisual isInView={isInView} />;
  }

  // FIFA 2026 Predictor Simulation Matrix
  if (type === 'fifa') {
    return <FifaVisual isInView={isInView} />;
  }

  // Rio AI Companion Neural Memory Visualizer
  if (type === 'ai-pet') {
    return <AiPetVisual />;
  }

  // Dark Pattern Attention Attribution Heatmap
  if (type === 'nlp') {
    return <DarkPatternVisual />;
  }

  // Vector Recommendation Clustering
  return <RecSysVisual isInView={isInView} />;
};

// 1. Dehazing Interactive Visual
const DehazingVisual: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div
      className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] overflow-hidden select-none border border-white/[0.06]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
        setSliderPos(pos);
      }}
    >
      {/* Dynamic Status Indicator based on in-view */}
      <div className="sr-only">{isInView ? 'in-view' : 'out-of-view'}</div>
      {/* Background Graphic representing landscape with synthetic atmospheric haze */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Crisp Recovered Image (Left/Full) */}
        <div className="absolute inset-0 bg-[#0c121e] flex flex-col justify-end p-8">
          <svg className="w-full h-full opacity-65" viewBox="0 0 400 240" fill="none">
            {/* Distant mountain ridges */}
            <path
              d="M0 160L90 90L170 140L280 60L400 170V240H0V160Z"
              fill="#182338"
            />
            {/* Midground ridge */}
            <path
              d="M0 190L120 120L210 175L320 110L400 190V240H0V190Z"
              fill="#223554"
            />
            {/* Foreground tree silhouettes */}
            <path
              d="M0 215L60 170L140 210L240 165L340 210L400 185V240H0V215Z"
              fill="#344f7a"
            />
            {/* Grid overlay for computer vision telemetry */}
            <line x1="0" y1="120" x2="400" y2="120" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            <line x1="200" y1="0" x2="200" y2="240" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
          </svg>
          <div className="absolute top-4 left-4 font-mono text-[11px] text-blue-400 bg-black/60 px-2 py-1 rounded backdrop-blur">
            DEHAZED · 20.30 dB PSNR
          </div>
        </div>

        {/* Hazy Input Image (Clipped by slider) */}
        <div
          className="absolute inset-0 bg-[#1e242a] overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="absolute inset-0 bg-[#0c121e] flex flex-col justify-end p-8">
            <svg className="w-full h-full opacity-35" viewBox="0 0 400 240" fill="none">
              <path
                d="M0 160L90 90L170 140L280 60L400 170V240H0V160Z"
                fill="#374151"
              />
              <path
                d="M0 190L120 120L210 175L320 110L400 190V240H0V190Z"
                fill="#4b5563"
              />
            </svg>
            {/* Dense atmospheric haze filter */}
            <div className="absolute inset-0 bg-white/25 backdrop-blur-[2px]" />
            <div className="absolute top-4 right-4 font-mono text-[11px] text-neutral-400 bg-black/60 px-2 py-1 rounded backdrop-blur">
              HAZY INPUT · SSIM: 0.54
            </div>
          </div>
        </div>

        {/* Dividing Hairline & Handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0A0A0A] border border-white/80 flex items-center justify-center text-[8px] font-mono text-white">
            ↔
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-neutral-400 bg-black/70 px-3 py-1.5 backdrop-blur border border-white/5">
        <span>PyTorch Custom AOD Net</span>
        <span className="text-emerald-400">LeakyReLU Activation Bug Resolved</span>
      </div>
    </div>
  );
};

// 2. Exoplanet Telemetry
const ExoplanetVisual: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  return (
    <div className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] border border-white/[0.06] p-6 flex flex-col justify-between overflow-hidden">
      {/* Planetary Orbit Transit Simulation */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
        <span className="text-[#EDEDED]">KEPLER-452b · ESI: 0.84</span>
        <span className="text-emerald-400">CLASS: POTENTIALLY HABITABLE</span>
      </div>

      {/* Stellar Transit Lightcurve Chart */}
      <div className="relative my-auto h-36 flex items-center">
        <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
          {/* Baseline Flux Level */}
          <line x1="0" y1="30" x2="400" y2="30" stroke="#333333" strokeDasharray="3 3" />
          
          {/* Light Curve Dip (Planetary Transit) */}
          <motion.path
            d="M 0 30 Q 120 30 150 32 Q 170 34 185 85 L 200 88 L 215 85 Q 230 34 250 32 Q 280 30 400 30"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Scatter measurement points */}
          {[
            { x: 30, y: 29 }, { x: 70, y: 31 }, { x: 110, y: 28 },
            { x: 155, y: 40 }, { x: 175, y: 72 }, { x: 195, y: 86 },
            { x: 205, y: 87 }, { x: 225, y: 70 }, { x: 245, y: 42 },
            { x: 290, y: 31 }, { x: 330, y: 29 }, { x: 370, y: 32 }
          ].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="#60A5FA" opacity="0.6" />
          ))}
        </svg>

        <div className="absolute right-3 top-2 font-mono text-[10px] text-neutral-500">
          Transit Depth: ΔF/F = 0.012%
        </div>
      </div>

      {/* Telemetry Readout Grid */}
      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-3 border-t border-white/[0.06] text-neutral-400">
        <div>
          <span className="text-neutral-500 block text-[9px]">RADIUS</span>
          1.63 R⊕
        </div>
        <div>
          <span className="text-neutral-500 block text-[9px]">STELLAR FLUX</span>
          1.10 S⊕
        </div>
        <div>
          <span className="text-neutral-500 block text-[9px]">EQUILIBRIUM TEMP</span>
          265 K (-8°C)
        </div>
      </div>
    </div>
  );
};

// 3. FIFA Predictor Bracket Simulation
const FifaVisual: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  return (
    <div className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] border border-white/[0.06] p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
        <span className="text-[#EDEDED]">MONTE CARLO SIMULATION · N=10,000</span>
        <span className="text-blue-400">55% TEST ACCURACY</span>
      </div>

      {/* Head-to-Head Probabilistic Match Matrix */}
      <div className="space-y-4 my-auto">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white">FRA (France)</span>
            <span className="text-neutral-400">58.4% Win Prob</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: '58.4%' } : { width: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white">ARG (Argentina)</span>
            <span className="text-neutral-400">52.1% Win Prob</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: '52.1%' } : { width: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white">ESP (Spain)</span>
            <span className="text-neutral-400">49.8% Win Prob</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: '49.8%' } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 pt-3 border-t border-white/[0.06]">
        <span>Dynamic Travel Fatigue & Elo Integration</span>
        <span>48-Team Format</span>
      </div>
    </div>
  );
};

// 4. Desktop AI Pet "Rio"
const AiPetVisual: React.FC = () => {
  return (
    <div className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] border border-white/[0.06] p-6 flex flex-col justify-between font-mono">
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white">RIO RUNTIME · ACTIVE</span>
        </div>
        <span className="text-neutral-500 text-[11px]">Mem0 Episodic Recall</span>
      </div>

      {/* Terminal Dialogue & Ambient State Logs */}
      <div className="space-y-3 my-auto text-xs">
        <div className="text-neutral-500 text-[11px]">
          [AMBIENT] Weather: Kolkata 29°C Monsoon · Sun Angle: 284° (Night cycle)
        </div>
        <div className="text-blue-400 bg-blue-950/20 p-2.5 rounded border border-blue-900/30">
          <span className="text-neutral-400 block text-[10px] uppercase">User (Voice Input):</span>
          "Rio, remember where we left off on the transformer attention paper?"
        </div>
        <div className="text-neutral-200 bg-neutral-900/80 p-2.5 rounded border border-white/5">
          <span className="text-neutral-400 block text-[10px] uppercase">Rio (LLM + Mem0 Episodic):</span>
          "Yes! You derived the scaled dot-product factor 1/√d_k yesterday at 11:30 PM to prevent softmax saturation."
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-3 border-t border-white/[0.06]">
        <span>Latency: 380ms TTFT</span>
        <span>Local Context: 8,192 tokens</span>
      </div>
    </div>
  );
};

// 5. Dark Pattern NLP Attribution
const DarkPatternVisual: React.FC = () => {
  return (
    <div className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] border border-white/[0.06] p-6 flex flex-col justify-between font-mono">
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
        <span className="text-white">DISTILBERT ATTENTION INFERENCE</span>
        <span className="text-red-400">URGENCY MANIPULATION DETECTED (97.4%)</span>
      </div>

      {/* Sentence with token attention saliency */}
      <div className="my-auto space-y-4">
        <div className="text-xs text-neutral-400 leading-loose">
          <span className="px-1 py-0.5 rounded bg-transparent">Hurry! </span>
          <span className="px-1.5 py-1 rounded bg-red-900/40 text-red-200 border border-red-500/30 font-medium">
            Only 1 room left
          </span>{' '}
          <span className="px-1.5 py-1 rounded bg-red-900/50 text-red-100 border border-red-500/40 font-medium">
            at this price!
          </span>{' '}
          <span className="px-1 py-0.5 rounded bg-transparent">
            42 people are viewing right now.
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[10px] pt-3 text-neutral-400">
          <div className="bg-neutral-900/90 p-2 border border-white/5 rounded">
            <span className="text-neutral-500 block">CONFIDENCE</span>
            97.42%
          </div>
          <div className="bg-neutral-900/90 p-2 border border-white/5 rounded">
            <span className="text-neutral-500 block">CATEGORY</span>
            False Scarcity
          </div>
          <div className="bg-neutral-900/90 p-2 border border-white/5 rounded">
            <span className="text-neutral-500 block">BACKEND</span>
            FastAPI · 18ms
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-3 border-t border-white/[0.06]">
        <span>Token Gradient Saliency Analysis</span>
        <span>Transformer Attention Head 4</span>
      </div>
    </div>
  );
};

// 6. Recommendation Cosine Sim
const RecSysVisual: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  return (
    <div className="w-full h-72 sm:h-80 md:h-96 relative bg-[#111111] border border-white/[0.06] p-6 flex flex-col justify-between font-mono">
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
        <span className="text-white">LATENT VECTOR SPACE EMBEDDINGS</span>
        <span className="text-blue-400">COSINE SIMILARITY: 0.93</span>
      </div>

      {/* Visual Vector projection */}
      <div className="relative my-auto h-36 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 320 120">
          <circle cx="160" cy="60" r="45" fill="none" stroke="#222" strokeDasharray="3 3" />
          {/* Query Vector */}
          <motion.line
            x1="160"
            y1="60"
            x2="220"
            y2="30"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1 }}
          />
          <circle cx="220" cy="30" r="4" fill="#3B82F6" />
          <text x="228" y="28" fill="#EDEDED" fontSize="9" fontFamily="monospace">Query (Sci-Fi / Nolan)</text>

          {/* Nearest Neighbor 1 */}
          <motion.line
            x1="160"
            y1="60"
            x2="210"
            y2="24"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
          />
          <circle cx="210" cy="24" r="3.5" fill="#10B981" />
          <text x="140" y="16" fill="#10B981" fontSize="8" fontFamily="monospace">Interstellar (sim: 0.94)</text>

          {/* Nearest Neighbor 2 */}
          <circle cx="205" cy="42" r="3" fill="#60A5FA" opacity="0.8" />
          <text x="215" y="46" fill="#9CA3AF" fontSize="8" fontFamily="monospace">Inception (sim: 0.91)</text>

          {/* Distant Cluster */}
          <circle cx="90" cy="90" r="2.5" fill="#555" />
          <circle cx="80" cy="100" r="2.5" fill="#555" />
          <circle cx="100" cy="95" r="2.5" fill="#555" />
          <text x="65" y="115" fill="#555" fontSize="8" fontFamily="monospace">Rom-Com Cluster</text>
        </svg>
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-3 border-t border-white/[0.06]">
        <span>Streamlit + Scikit-Learn TF-IDF</span>
        <span>Instantaneous Top-K Retrieval</span>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-36 border-t border-white/[0.08] px-6 md:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-20 md:mb-28">
        <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-4">
          [02] Selected Systems
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#EDEDED]">
          Built from raw tensors and first principles.
        </h2>
      </div>

      {/* Projects Stack: Alternating Full-Width Blocks, separated by thin hairlines */}
      <div className="space-y-28 md:space-y-40">
        {PROJECTS_DATA.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <ProjectBlock
              key={project.id}
              project={project}
              isEven={isEven}
            />
          );
        })}
      </div>
    </section>
  );
};

// Individual Project Block with Scroll-Triggered View
const ProjectBlock: React.FC<{ project: Project; isEven: boolean }> = ({
  project,
  isEven,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Visual / Simulation Column (Alternates on desktop) */}
      <div
        className={`w-full lg:col-span-7 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <ProjectVisual type={project.type} isInView={isInView} />
      </div>

      {/* Information Column */}
      <div
        className={`w-full lg:col-span-5 space-y-6 ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Project Index & Metric Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#525252]">
            [{project.number}]
          </span>
          {project.metrics && (
            <>
              <span className="h-px w-4 bg-white/10" />
              <span className="text-xs font-mono text-blue-400">
                {project.metrics}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#EDEDED] leading-snug">
          {project.title}
        </h3>

        {/* 2-line concise technical description */}
        <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Tech tags as simple plain text pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 bg-white/[0.04] text-[#A1A1AA] border border-white/[0.06] rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View on GitHub */}
        <div className="pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-[#EDEDED] link-underline-accent hover:text-blue-400 transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </motion.div>
  );
};
