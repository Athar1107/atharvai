'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { experiences } from '@/data/experience';

const typeColors: Record<string, string> = {
  ieee: 'from-blue-500 to-cyan-500',
  community: 'from-emerald-500 to-teal-500',
  event: 'from-orange-500 to-amber-500',
  blog: 'from-purple-500 to-pink-500',
  leadership: 'from-rose-500 to-pink-500',
  internship: 'from-indigo-500 to-violet-500',
};

const typeBg: Record<string, string> = {
  ieee: 'bg-blue-500/10 border-blue-500/20',
  community: 'bg-emerald-500/10 border-emerald-500/20',
  event: 'bg-orange-500/10 border-orange-500/20',
  blog: 'bg-purple-500/10 border-purple-500/20',
  leadership: 'bg-rose-500/10 border-rose-500/20',
  internship: 'bg-indigo-500/10 border-indigo-500/20',
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Experience"
          title="My Journey So Far"
          subtitle="From organizing IEEE events to building communities — here's how I've grown."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px timeline-line hidden lg:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8
                    ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Card — occupies half */}
                  <div className="w-full lg:w-[calc(50%-2rem)]">
                    <div className={`glass glass-hover p-6 rounded-2xl border ${typeBg[exp.type]}`}>
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                          bg-gradient-to-br ${typeColors[exp.type]} bg-opacity-20 flex-shrink-0`}>
                          {exp.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading font-bold text-white text-lg leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-blue-400 font-medium text-sm mt-0.5">{exp.org}</p>
                          <span className="inline-block mt-1 text-xs text-slate-500 bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-700">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{exp.description}</p>

                      <ul className="space-y-2">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${typeColors[exp.type]} flex-shrink-0`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10
                    w-5 h-5 rounded-full border-2 border-blue-500 bg-[#020817]
                    shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                  {/* Spacer */}
                  <div className="hidden lg:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
