'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { MagneticButton } from '@/components/ui';

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
      className="relative min-h-[100dvh] flex items-center grid-bg overflow-hidden"
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
        className="absolute inset-0 md:inset-auto md:right-0 md:top-0 md:h-full md:w-[55%] lg:w-[48%]
          pointer-events-none select-none z-0"
      >
        {/* Mobile: darken + gradient so headline stays readable over full-bleed photo */}
        <div
          className="md:hidden absolute inset-0 z-[2] bg-gradient-to-b from-[#020817] via-[#020817]/85 to-[#020817]/40 pointer-events-none"
          aria-hidden
        />
        {/* Photo — CSS mask-image for true alpha fade, no milky overlay */}
        <div
          className="relative z-[1] w-full h-full max-md:opacity-[0.45]"
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

        {/* ── Floating badges (tablet/desktop only — avoids overlap & clipping on narrow viewports) ── */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block pointer-events-auto absolute top-28 right-4 sm:right-8 lg:right-16 max-w-[calc(100vw-2rem)]
            glass neon-border px-4 py-3 rounded-2xl
            shadow-[0_0_30px_rgba(59,130,246,0.25)] z-[3]"
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Latest</p>
          <p className="text-sm font-bold text-white">10+ Articles</p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block pointer-events-auto absolute bottom-28 sm:bottom-24 right-4 sm:right-8 lg:right-20 max-w-[calc(100vw-2rem)]
            glass neon-border px-4 py-3 rounded-2xl
            shadow-[0_0_30px_rgba(59,130,246,0.25)] z-[3]"
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Currently Exploring</p>
          <p className="text-sm font-bold text-white">Computer Vision</p>
        </motion.div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-32 md:pb-24"
      >
        {/* Left col — on md+ portrait stays right; on mobile content is full-width over gradient */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-xl lg:max-w-2xl max-md:mx-auto max-md:max-w-lg"
        >
          {/* Tagline pill */}
          <motion.div variants={itemVariants} className="max-md:w-full max-md:flex max-md:justify-center">
            <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
              text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-center
              bg-blue-500/10 border border-blue-500/25 text-blue-300 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
              AI DEVELOPER&nbsp;•&nbsp;TECHNICAL BLOGGER
            </span>
          </motion.div>

          {/* Mobile: same info as floating badges, inline — no overlap with photo or scroll cue */}
          <motion.div
            variants={itemVariants}
            className="md:hidden flex flex-wrap gap-2 mb-6 w-full justify-center sm:justify-start"
          >
            <div className="glass neon-border px-3 py-2 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Latest</p>
              <p className="text-xs font-bold text-white">10+ Articles</p>
            </div>
            <div className="glass neon-border px-3 py-2 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Exploring</p>
              <p className="text-xs font-bold text-white">Computer Vision</p>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-bold leading-[1.05] mb-6 max-md:text-center w-full"
          >
            <span className="block text-4xl sm:text-6xl xl:text-7xl text-white">
              Hi, I&apos;m{' '}
              <span className="gradient-text text-glow">Atharv Ambekar</span>
            </span>
            <span className="block text-3xl sm:text-5xl xl:text-6xl text-slate-300 mt-2">
              I build, learn &amp; share.
            </span>
          </motion.h1>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg max-md:mx-auto max-md:text-center"
          >
            Building intelligent systems through AI, Computer Vision, and impactful technical leadership while simplifying complex concepts through technical content creation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 max-md:justify-center max-md:w-full"
          >
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
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-14 flex flex-wrap gap-8 max-md:justify-center"
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
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
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
