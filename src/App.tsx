import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Send,
  X,
  Mail,
  User,
  MessageSquare,
} from 'lucide-react';

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

interface Project {
  number: string;
  category: string;
  name: string;
  images: [string, string, string];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Desktop UI & Windows Widget",
    name: "Dynamic Island",
    images: [
      "https://raw.githubusercontent.com/dev-apox/dynamic-island/main/assets/pin1.png",
      "https://raw.githubusercontent.com/dev-apox/dynamic-island/main/assets/pin2.png",
      "https://raw.githubusercontent.com/dev-apox/dynamic-island/main/assets/Pin3.png",
    ],
    link: "https://github.com/dev-apox/dynamic-island",
  },
  {
    number: "02",
    category: "Windows Shell Enhancement",
    name: "Launchpad OS",
    images: [
      "https://raw.githubusercontent.com/dev-apox/WinLaunchpad/main/assets/pin1.png",
      "https://raw.githubusercontent.com/dev-apox/WinLaunchpad/main/assets/pin2.png",
      "https://raw.githubusercontent.com/dev-apox/WinLaunchpad/main/assets/pin3.png",
    ],
    link: "https://github.com/dev-apox/WinLaunchpad",
  },
];

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 20,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Magnet: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 3,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX / strength,
      y: distanceY / strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
      }}
    >
      {children}
    </div>
  );
};

const ContactButton: React.FC<{ onClick?: () => void; className?: string }> = ({
  onClick,
  className = "",
}) => {
  return (
    <Magnet>
      <button
        onClick={onClick}
        className={`group relative rounded-full px-7 py-3 sm:px-9 sm:py-3.5 text-xs sm:text-sm font-medium tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
        style={{
          background:
            "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
          boxShadow:
            "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
          outline: "2px solid white",
          outlineOffset: "-3px",
        }}
      >
        Contact Me
      </button>
    </Magnet>
  );
};

const LiveProjectButton: React.FC<{ href?: string; className?: string }> = ({
  href = "#",
  className = "",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-[#D7E2EA] px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wider text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95 ${className}`}
    >
      <span>Live Project</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  );
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em] text-[#D7E2EA] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const start = wordIndex / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={wordIndex} word={word} range={[start, end]} progress={scrollYProgress} />
        );
      })}
    </p>
  );
};

const Word: React.FC<{ word: string; range: [number, number]; progress: any }> = ({
  word,
  range,
  progress,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }} className="transition-opacity">
        {word}
      </motion.span>
    </span>
  );
};

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (marqueeRef.current) {
            const rect = marqueeRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
            setScrollOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1Images = [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)];
  const row2Images = [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)];

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] font-sans text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <FadeIn delay={0} y={-20}>
          <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6 w-full max-w-7xl mx-auto">
            <a
              href="#about"
              className="text-sm sm:text-base font-medium tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-sm sm:text-base font-medium tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Projects
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-sm sm:text-base font-medium tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </FadeIn>
      </header>

      <section className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-24 pb-8 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center justify-center my-auto py-12">
          <div className="w-full text-center">
            <FadeIn delay={0.15} y={30}>
              <h1
                className="hero-heading font-black tracking-tight leading-none text-center select-none"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7.5rem)" }}
              >
                Hi, i’m Denis
              </h1>
            </FadeIn>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full gap-6 sm:gap-0">
          <FadeIn delay={0.35} y={20}>
            <p className="font-light tracking-wide leading-relaxed text-[#D7E2EA] max-w-[280px] sm:max-w-[340px] text-center sm:text-left text-xs sm:text-sm md:text-base">
              a software developer driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => setIsContactOpen(true)} />
          </FadeIn>
        </div>
      </section>

      <section ref={marqueeRef} className="relative bg-[#0C0C0C] pt-16 sm:pt-24 pb-12 overflow-hidden">
        <div className="flex flex-col gap-3">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translate3d(${scrollOffset - 150}px, 0, 0)`,
            }}
          >
            {row1Images.map((src, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-[240px] sm:w-[320px] md:w-[380px] h-[150px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-white/5"
              >
                <img
                  src={src}
                  alt={`Preview ${idx}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translate3d(${-(scrollOffset - 150)}px, 0, 0)`,
            }}
          >
            {row2Images.map((src, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-[240px] sm:w-[320px] md:w-[380px] h-[150px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-white/5"
              >
                <img
                  src={src}
                  alt={`Preview ${idx}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-20 max-w-6xl mx-auto text-center">
        <FadeIn delay={0.1} x={-50} y={0} className="absolute top-[5%] left-[2%] pointer-events-none z-0 hidden lg:block">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D"
            className="w-[120px] xl:w-[150px] opacity-70"
          />
        </FadeIn>

        <FadeIn delay={0.25} x={-50} y={0} className="absolute bottom-[5%] left-[2%] pointer-events-none z-0 hidden lg:block">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Shape"
            className="w-[100px] xl:w-[130px] opacity-70"
          />
        </FadeIn>

        <FadeIn delay={0.15} x={50} y={0} className="absolute top-[5%] right-[2%] pointer-events-none z-0 hidden lg:block">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D"
            className="w-[120px] xl:w-[150px] opacity-70"
          />
        </FadeIn>

        <FadeIn delay={0.3} x={50} y={0} className="absolute bottom-[5%] right-[2%] pointer-events-none z-0 hidden lg:block">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[120px] xl:w-[150px] opacity-70"
          />
        </FadeIn>

        <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 w-full max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <h2
              className="hero-heading font-black tracking-tight leading-none text-center"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              About Me
            </h2>
          </FadeIn>

          <div className="w-full">
            <AnimatedText
              text="I am Denis Moraru, an Informatics student at the University of Udine (Pordenone branch). Driven by a passion for clean code, striking desktop customization, and modern web applications. When I'm not crafting pixel-perfect interfaces or building high-performance software utilities, you can usually find me carving down snowy slopes as a passionate ski enthusiast."
              className="text-base sm:text-xl md:text-2xl font-light tracking-wide leading-relaxed text-center"
            />
          </div>

          <div>
            <ContactButton onClick={() => setIsContactOpen(true)} />
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 bg-[#0C0C0C] rounded-t-[30px] sm:rounded-t-[50px] -mt-8 pt-16 pb-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <FadeIn delay={0}>
            <h2
              className="hero-heading font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Projects
            </h2>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {PROJECTS.map((project, index) => (
            <div
              key={project.number}
              className="sticky rounded-[25px] sm:rounded-[35px] border border-[#D7E2EA]/30 bg-[#0C0C0C] p-5 sm:p-8 shadow-2xl transition-all duration-300"
              style={{
                top: `calc(100px + ${index * 35}px)`,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black hero-heading">
                    {project.number}
                  </span>
                  <div>
                    <span className="text-xs tracking-wider text-[#D7E2EA]/60 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#D7E2EA]">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <LiveProjectButton href={project.link} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-[160px] sm:h-[180px]">
                    <img
                      src={project.images[0]}
                      alt={`${project.name} 1`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-[180px] sm:h-[220px]">
                    <img
                      src={project.images[1]}
                      alt={`${project.name} 2`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-7">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-full min-h-[250px] md:min-h-[416px]">
                    <img
                      src={project.images[2]}
                      alt={`${project.name} 3`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative bg-[#0C0C0C] border-t border-white/10 py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <h3 className="hero-heading text-2xl sm:text-3xl font-black tracking-tight">
              Denis Moraru
            </h3>
            <p className="text-xs font-light text-[#D7E2EA]/60 tracking-wider mt-1">
              Inspiration from 3D Jack Portfolio
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dev-apox"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#0C0C0C] p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="hero-heading text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Get in Touch
              </h3>
              <p className="text-xs text-[#D7E2EA]/70 mb-5 tracking-wider">
                Let&apos;s build something unforgettable together.
              </p>

              <form
                action="https://formspree.io/f/xzedaaqp"
                method="POST"
                onSubmit={() => {
                  setTimeout(() => {
                    setIsContactOpen(false);
                  }, 1000);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-[#D7E2EA]/60 mb-1.5">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7E2EA]/40" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#B600A8] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#D7E2EA]/60 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7E2EA]/40" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your.email@domain.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#B600A8] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#D7E2EA]/60 mb-1.5">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D7E2EA]/40" />
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#B600A8] focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl py-3.5 font-medium tracking-wider text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-2 cursor-pointer text-sm"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  }}
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}