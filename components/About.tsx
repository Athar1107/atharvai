'use client';

import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '@/components/ui';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { stats, exploringItems, inspirators } from '@/data';

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="About Me"
          title="Builder. Learner. Storyteller."
          subtitle="I'm an AI enthusiast who loves turning complex ideas into impactful systems — and sharing the journey through writing and community."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.08} className="p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-heading font-bold text-4xl gradient-text mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* About text + Currently Exploring */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Bio */}
          <GlassCard className="p-8">
            <h3 className="font-heading font-bold text-xl text-white mb-4">Who I Am</h3>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m Atharv — a Computer Science student, AI enthusiast, and Secretary of my
                college&apos;s IEEE Student Branch. I&apos;m passionate about Machine Learning, Deep
                Learning, and building AI-powered applications that solve real problems.
              </p>
              <p>
                Beyond the code, I write technical blogs to break down complex AI concepts for
                beginners, organize community events, and believe that sharing knowledge is as
                important as building it.
              </p>
              <p>
                When I&apos;m not training models or writing, you&apos;ll find me exploring the latest
                research papers, contributing to open-source, or planning the next community event.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'Community Building', 'Technical Writing'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Currently Exploring */}
          <GlassCard className="p-8">
            <h3 className="font-heading font-bold text-xl text-white mb-6">
              🔭 Currently Exploring
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exploringItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${item.color}
                    border border-white/8 cursor-default`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Inspirators */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Inspired By
              </h4>
              <div className="flex flex-wrap gap-2">
                {inspirators.map((insp, i) => (
                  <motion.a
                    key={insp.handle}
                    href={insp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium
                      bg-slate-800/80 border border-slate-700 text-slate-300
                      hover:border-blue-500/50 hover:text-blue-300 hover:bg-blue-500/10
                      transition-all duration-200 cursor-pointer"
                  >
                    {insp.handle}
                  </motion.a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
