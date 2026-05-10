'use client';

import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '@/components/ui';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { stats, exploringItems } from '@/data';
import { Rocket, PenTool, Trophy } from 'lucide-react';

const statIconMap: Record<string, React.ReactNode> = {
  'Projects Built': <Rocket size={32} className="text-blue-400" />,
  'Blog Posts': <PenTool size={32} className="text-cyan-400" />,
  'Achievements': <Trophy size={32} className="text-amber-400" />,
};

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
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {stats.map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.08} className="p-6 text-center flex-1 min-w-[150px] lg:flex-none lg:w-64">
              <div className="flex justify-center mb-3">{statIconMap[stat.label]}</div>
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
                I&apos;m Atharv Ambekar — an AI Developer and Secretary of my college&apos;s IEEE Student Branch. My passion lies in Computer Vision and Machine Learning, where I focus on building intelligent systems that solve complex, real-world problems.
              </p>
              <p>
                Beyond writing code, I am a dedicated technical blogger and creative problem solver. I believe in simplifying complex AI concepts through content creation, bridging the gap between advanced research and practical application.
              </p>
              <p>
                As a technical leader, I actively manage cross-functional teams and drive innovation within student communities. Whether I&apos;m training deep learning models or coordinating impactful events, I strive to combine technical excellence with effective communication.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'Technical Leadership', 'Technical Writing'].map((tag) => (
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
          <GlassCard className="p-8 h-fit self-center">
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


          </GlassCard>
        </div>
      </div>
    </section>
  );
}
