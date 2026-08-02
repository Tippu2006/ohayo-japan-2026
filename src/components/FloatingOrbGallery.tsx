import React, { useEffect, useRef, useState } from "react";
import { Maximize2, Sparkles, Image as ImageIcon } from "lucide-react";

interface FloatingOrbGalleryProps {
  photos: string[];
  onSelect: (photo: string) => void;
}

export function FloatingOrbGallery({ photos, onSelect }: FloatingOrbGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // 3-axis rotation state (RX, RY, RZ) for smooth all-side 3D rotation
  const [rotation, setRotation] = useState({ rx: 0.2, ry: 0, rz: 0.1 });
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const targetRotation = useRef({ rx: 0.2, ry: 0, rz: 0.1 });
  const isHovered = useRef(false);

  // Auto Slow-Motion Slideshow loop for the Left Frame (cycles every 3.5s when not hovering a specific orb)
  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      if (!isHovered.current) {
        setCurrentSlideIndex((prev) => (prev + 1) % photos.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [photos.length]);

  // Continuous 3D Orb Multi-Axis Slow Rotation loop
  useEffect(() => {
    let animId: number;

    const animate = () => {
      if (!isHovered.current) {
        targetRotation.current.ry += 0.0035;
        targetRotation.current.rx += 0.0018;
        targetRotation.current.rz += 0.0012;
      }

      setRotation((prev) => ({
        rx: prev.rx + (targetRotation.current.rx - prev.rx) * 0.04,
        ry: prev.ry + (targetRotation.current.ry - prev.ry) * 0.04,
        rz: prev.rz + (targetRotation.current.rz - prev.rz) * 0.04,
      }));

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isHovered.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    targetRotation.current.rx = -dy * 0.7;
    targetRotation.current.ry += dx * 0.035;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setHoveredPhoto(null);
  };

  const sphereRadius = typeof window !== "undefined" && window.innerWidth < 640 ? 155 : 240;
  const numPhotos = photos.length;

  const nodes = photos.map((src, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / numPhotos);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    // Initial 3D position
    let x0 = sphereRadius * Math.sin(phi) * Math.cos(theta);
    let y0 = sphereRadius * Math.sin(phi) * Math.sin(theta);
    let z0 = sphereRadius * Math.cos(phi);

    // Apply 3D Rotation Matrix (RX -> RY -> RZ)
    const cosX = Math.cos(rotation.rx);
    const sinX = Math.sin(rotation.rx);
    const y1 = y0 * cosX - z0 * sinX;
    const z1 = y0 * sinX + z0 * cosX;

    const cosY = Math.cos(rotation.ry);
    const sinY = Math.sin(rotation.ry);
    const x2 = x0 * cosY + z1 * sinY;
    const z2 = -x0 * sinY + z1 * cosY;

    const cosZ = Math.cos(rotation.rz);
    const sinZ = Math.sin(rotation.rz);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;

    // Perspective projection
    const scale = (z2 + sphereRadius * 1.5) / (sphereRadius * 2.5);
    const clampedScale = Math.max(0.48, Math.min(1.2, scale));
    const opacity = Math.max(0.35, Math.min(1, scale));
    const zIndex = Math.round((z2 + sphereRadius) * 10);

    return {
      src,
      index: i,
      x: x3,
      y: y3,
      scale: clampedScale,
      opacity,
      zIndex,
    };
  });

  // Display either the hovered orb photo or the automated slow-motion slideshow photo
  const activeDisplayPhoto = hoveredPhoto || (photos.length > 0 ? photos[currentSlideIndex] : null);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl mx-auto">
        {/* Left Screen Framed Photo (Auto Slideshow + Live Hover Preview) */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="group relative w-full max-w-md sm:max-w-lg overflow-hidden rounded-3xl border-2 border-gold/50 bg-black/80 glass shadow-[0_0_38px_rgba(255,215,0,0.38)] transition-all duration-500">
            {/* Decorative Corner Ornaments */}
            <div className="absolute top-2.5 left-2.5 z-20 h-5 w-5 border-t-2 border-l-2 border-gold" />
            <div className="absolute top-2.5 right-2.5 z-20 h-5 w-5 border-t-2 border-r-2 border-gold" />
            <div className="absolute bottom-2.5 left-2.5 z-20 h-5 w-5 border-b-2 border-l-2 border-gold" />
            <div className="absolute bottom-2.5 right-2.5 z-20 h-5 w-5 border-b-2 border-r-2 border-gold" />

            {/* Header Badge Tag */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-black/85 px-4 py-1 border border-gold/40 backdrop-blur-md text-[10px] font-bold text-gold tracking-widest uppercase shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
              {hoveredPhoto ? "Hovered Orb Photo" : "Memories Slideshow"}
            </div>

            {/* High-Res Proportioned Framed Image */}
            <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-black">
              {activeDisplayPhoto ? (
                <img
                  key={activeDisplayPhoto}
                  src={activeDisplayPhoto}
                  alt="Festival memory preview"
                  className="h-full w-full object-cover transition-opacity duration-700 hover:scale-105 animate-fade-in"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-black/60 text-cream/40">
                  <ImageIcon className="h-10 w-10 animate-bounce" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            </div>

            {/* Action Button at bottom of frame */}
            <div className="p-4 text-center">
              <button
                onClick={() => activeDisplayPhoto && onSelect(activeDisplayPhoto)}
                className="w-full rounded-xl bg-gold/10 py-3 text-xs font-bold text-gold border border-gold/40 hover:bg-gold hover:text-ink transition-all duration-300 shadow-md flex items-center justify-center gap-2 tracking-widest uppercase"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                CLICK TO ENLARGE PHOTO
              </button>
            </div>
          </div>
        </div>

        {/* Right Screen 3D Floating Orb Interactive Stage */}
        <div className="lg:col-span-7 w-full">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto flex h-[520px] sm:h-[620px] w-full items-center justify-center overflow-hidden rounded-3xl glass border border-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing"
          >
            {/* Ambient Glowing Background Aura */}
            <div className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-crimson/30 via-gold/20 to-crimson/30 blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute h-[420px] w-[420px] rounded-full border border-gold/20 animate-spin-slow pointer-events-none" />

            {/* Center Decorative Japanese Crest Badge */}
            <div className="absolute z-0 flex flex-col items-center justify-center opacity-20 pointer-events-none">
              <span className="font-jp text-6xl text-gold">思い出</span>
              <span className="font-display text-xs tracking-[0.4em] text-cream mt-2 uppercase">
                OHAYO JAPAN
              </span>
            </div>

            {/* Floating Circular Photo Spheres */}
            {nodes.map((node) => {
              const isCurrentHover = hoveredPhoto === node.src;
              return (
                <div
                  key={node.index}
                  onClick={() => onSelect(node.src)}
                  onMouseEnter={() => setHoveredPhoto(node.src)}
                  style={{
                    transform: `translate3d(${node.x}px, ${node.y}px, 0px) scale(${
                      isCurrentHover ? node.scale * 1.3 : node.scale
                    })`,
                    opacity: isCurrentHover ? 1 : node.opacity,
                    zIndex: isCurrentHover ? 9999 : node.zIndex,
                    transition: "transform 0.15s ease-out, opacity 0.2s ease-out",
                  }}
                  className="absolute group cursor-pointer"
                >
                  <div
                    className={`relative h-28 w-28 sm:h-36 sm:w-36 rounded-full border-2 bg-black p-1 transition-all duration-300 ${
                      isCurrentHover
                        ? "border-gold shadow-[0_0_40px_rgba(255,215,0,0.9)] scale-110"
                        : "border-gold/60 shadow-[0_0_20px_rgba(255,215,0,0.4)] group-hover:scale-125 group-hover:border-gold group-hover:shadow-[0_0_35px_rgba(200,16,46,0.8)]"
                    }`}
                  >
                    <img
                      src={node.src}
                      alt={`Memory ${node.index + 1}`}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
