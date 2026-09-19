import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
  baseRadius: number;
  currentRadius: number;
  brightness: number; // 0 to 1
  label?: string;
}

interface Synapse {
  from: Node;
  to: Node;
  weight: number; // visual strength
  pulseProgress: number; // -1 if inactive, 0 to 1 if traveling
  pulseSpeed: number;
  active: boolean;
}

export const PerceptronCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isMobile = window.innerWidth < 768;

    // Define 4 neural layers: Input (4), Hidden 1 (6), Hidden 2 (5), Output (3)
    const layerStructure = isMobile ? [3, 4, 3] : [4, 6, 5, 3];
    let nodes: Node[] = [];
    let synapses: Synapse[] = [];

    // Mouse tracking state
    let mouse = {
      x: -1000,
      y: -1000,
      isActive: false,
      lastMoveTime: 0,
    };

    const setupNetwork = (width: number, height: number) => {
      nodes = [];
      synapses = [];

      // Layout columns
      const numLayers = layerStructure.length;
      
      // Keep canvas nicely offset so it sits alongside/behind the hero text
      const xPadding = isMobile ? width * 0.1 : width * 0.08;
      const availableWidth = width - xPadding * 2;
      const colStep = availableWidth / (numLayers - 1);

      layerStructure.forEach((nodeCount, layerIdx) => {
        const x = xPadding + layerIdx * colStep;
        const yPadding = height * 0.15;
        const availableHeight = height - yPadding * 2;
        const rowStep = availableHeight / (nodeCount + 1);

        for (let i = 0; i < nodeCount; i++) {
          const y = yPadding + (i + 1) * rowStep;
          nodes.push({
            x,
            y,
            layer: layerIdx,
            index: i,
            baseRadius: isMobile ? 3 : 4,
            currentRadius: isMobile ? 3 : 4,
            brightness: 0,
          });
        }
      });

      // Connect each node in layer L to all nodes in layer L+1
      for (let l = 0; l < numLayers - 1; l++) {
        const fromNodes = nodes.filter((n) => n.layer === l);
        const toNodes = nodes.filter((n) => n.layer === l + 1);

        fromNodes.forEach((from) => {
          toNodes.forEach((to) => {
            synapses.push({
              from,
              to,
              weight: 0.12 + Math.random() * 0.1,
              pulseProgress: -1,
              pulseSpeed: 0.02 + Math.random() * 0.015,
              active: false,
            });
          });
        });
      }
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      isMobile = window.innerWidth < 768;
      setupNetwork(rect.width, rect.height);

      if (isMobile) {
        // Draw static frame for mobile and exit
        drawStaticFrame(rect.width, rect.height);
      }
    };

    const drawStaticFrame = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // Draw faint connections
      synapses.forEach((syn) => {
        ctx.beginPath();
        ctx.moveTo(syn.from.x, syn.from.y);
        ctx.lineTo(syn.to.x, syn.to.y);
        ctx.strokeStyle = 'rgba(237, 237, 237, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(237, 237, 237, 0.25)';
        ctx.fill();
      });
    };

    // Trigger forward signal pulses when mouse moves near a node
    const triggerSignal = (sourceNode: Node) => {
      // Find all outgoing synapses from this node
      const outgoing = synapses.filter((s) => s.from === sourceNode && s.pulseProgress < 0);
      outgoing.forEach((s) => {
        s.pulseProgress = 0;
        s.active = true;
      });
    };

    // Render loop for desktop cursor interaction
    const render = () => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const now = performance.now();
      const isIdle = now - mouse.lastMoveTime > 2500;

      // 1. Update node brightness & check cursor proximity
      nodes.forEach((node) => {
        if (mouse.isActive && !isIdle) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximityRadius = 85;

          if (dist < proximityRadius) {
            const factor = 1 - dist / proximityRadius;
            node.brightness = Math.min(1, node.brightness + factor * 0.3);

            // If freshly illuminated, trigger a forward pulse
            if (node.brightness > 0.6 && Math.random() < 0.15) {
              triggerSignal(node);
            }
          } else {
            node.brightness = Math.max(0, node.brightness - 0.03);
          }
        } else {
          node.brightness = Math.max(0, node.brightness - 0.02);
        }

        node.currentRadius = node.baseRadius + node.brightness * 1.5;
      });

      // 2. Draw Synaptic Lines & Pulses
      synapses.forEach((syn) => {
        const from = syn.from;
        const to = syn.to;

        // Base line alpha boosted slightly if source node is bright
        const baseAlpha = 0.06 + from.brightness * 0.15;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(237, 237, 237, ${baseAlpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animate traveling signal pulse (Feedforward propagation)
        if (syn.pulseProgress >= 0) {
          syn.pulseProgress += syn.pulseSpeed;

          const px = from.x + (to.x - from.x) * syn.pulseProgress;
          const py = from.y + (to.y - from.y) * syn.pulseProgress;

          // Glowing electric-blue signal head
          const pulseAlpha = Math.sin(syn.pulseProgress * Math.PI) * 0.85;
          
          // Draw subtle glow
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${pulseAlpha.toFixed(3)})`;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha.toFixed(3)})`;
          ctx.fill();

          // When pulse arrives at destination, softly illuminate target node
          if (syn.pulseProgress >= 1) {
            syn.pulseProgress = -1;
            syn.active = false;
            to.brightness = Math.min(0.8, to.brightness + 0.35);
          }
        }
      });

      // 3. Draw Nodes
      nodes.forEach((node) => {
        // Node outer glow if illuminated
        if (node.brightness > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${(node.brightness * 0.25).toFixed(3)})`;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2);
        
        // Color transition: faint grey-white to illuminated electric blue / white
        if (node.brightness > 0.05) {
          ctx.fillStyle = `rgba(${Math.round(237 + (255 - 237) * node.brightness)}, ${Math.round(
            237 + (255 - 237) * node.brightness
          )}, 255, ${(0.25 + node.brightness * 0.75).toFixed(2)})`;
        } else {
          ctx.fillStyle = 'rgba(237, 237, 237, 0.22)';
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
      mouse.lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 transition-opacity duration-700"
      />
      {/* Soft gradient edge vignette to blend seamlessly into #0A0A0A */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/70" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
    </div>
  );
};
