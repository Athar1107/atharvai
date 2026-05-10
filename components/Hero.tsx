'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { MagneticButton } from '@/components/ui';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub, SiMedium } from 'react-icons/si';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
    >
      {/* ── Background ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Full-bleed portrait (right half, absolute) ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 h-full w-[55%] lg:w-[48%] pointer-events-none select-none"
      >
        {/* Photo — CSS mask-image for true alpha fade, no milky overlay */}
        <div
          className="relative w-full h-full"
          style={{
            WebkitMaskImage: [
              'linear-gradient(to right,  transparent 0%, black 28%, black 100%)',
              'linear-gradient(to top,    transparent 0%, black 18%, black 100%)',
              'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
              'linear-gradient(to left,   transparent 0%, black 15%, black 100%)',
            ].join(', '),
            WebkitMaskComposite: 'source-in, source-in, source-in',
            maskImage: [
              'linear-gradient(to right,  transparent 0%, black 28%, black 100%)',
              'linear-gradient(to top,    transparent 0%, black 18%, black 100%)',
              'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
              'linear-gradient(to left,   transparent 0%, black 15%, black 100%)',
            ].join(', '),
            maskComposite: 'intersect',
          }}
        >
          <Image
            src="/profile.png"
            alt="Atharv Ambekar"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* ── Floating badge — Latest ── */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto absolute top-28 right-8 lg:right-16
            glass neon-border px-4 py-3 rounded-2xl
            shadow-[0_0_30px_rgba(59,130,246,0.25)]"
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Latest</p>
          <p className="text-sm font-bold text-white">10+ Articles</p>
        </motion.div>

        {/* ── Floating badge — Currently Exploring ── */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto absolute bottom-24 right-8 lg:right-20
            glass neon-border px-4 py-3 rounded-2xl
            shadow-[0_0_30px_rgba(59,130,246,0.25)]"
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Currently Exploring</p>
          <p className="text-sm font-bold text-white">Computer Vision</p>
        </motion.div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20"
      >
        {/* Left col — text occupies ~55% so it never overlaps the face */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-xl lg:max-w-2xl"
        >
          {/* Tagline pill */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
              text-xs font-semibold tracking-wider uppercase
              bg-blue-500/10 border border-blue-500/25 text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              AI DEVELOPER&nbsp;•&nbsp;TECHNICAL BLOGGER
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="font-heading font-bold leading-none mb-6">
            <span className="block text-5xl sm:text-6xl xl:text-7xl text-white">
              Hi, I&apos;m{' '}
              <span className="gradient-text text-glow">Atharv Ambekar</span>
            </span>
            <span className="block text-4xl sm:text-5xl xl:text-6xl text-slate-300 mt-2">
              I build, learn &amp; share.
            </span>
          </motion.h1>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Building intelligent systems through AI, Computer Vision, and impactful technical leadership while simplifying complex concepts through technical content creation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <MagneticButton
              href="#projects"
              className="px-7 py-3.5 rounded-full font-semibold text-white text-sm
                bg-blue-600 hover:bg-blue-500 transition-colors
                shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]"
            >
              → View My Work
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              className="px-7 py-3.5 rounded-full font-semibold text-slate-300 text-sm
                border border-slate-600 hover:border-blue-500/50 hover:text-white
                bg-white/5 hover:bg-white/8 transition-all duration-300"
            >
              ↓ Download CV
            </MagneticButton>
            <div className="flex items-center gap-3 ml-2">
              <MagneticButton
                href="https://github.com/Athar1107"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-600 hover:border-blue-500/50 text-slate-400 hover:text-white bg-white/5 hover:bg-white/8 transition-all duration-300"
              >
                <SiGithub className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton
                href="https://www.linkedin.com/in/atharv-ambekar-187160297/"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-600 hover:border-blue-500/50 text-slate-400 hover:text-[#0A66C2] bg-white/5 hover:bg-white/8 transition-all duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton
                href="https://medium.com/@atharvambekar1105"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-600 hover:border-blue-500/50 text-slate-400 hover:text-white bg-white/5 hover:bg-white/8 transition-all duration-300"
              >
                <SiMedium className="w-5 h-5" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[['8+', 'Projects'], ['2+', 'Blog Posts']].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="font-heading font-bold text-2xl gradient-text">{val}</span>
                <span className="text-slate-500 text-xs mt-0.5">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-blue-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
