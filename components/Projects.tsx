'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '@/components/ui';
import { projects } from '@/data/projects';

const projectGradients = [
  'from-blue-600/20 to-cyan-500/20',
  'from-purple-600/20 to-pink-500/20',
  'from-emerald-600/20 to-teal-500/20',
  'from-orange-600/20 to-amber-500/20',
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Things I've Built"
          subtitle="A selection of projects that showcase my work in AI, Machine Learning, and Web Development."
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <GlassCard
              key={project.id}
              delay={i * 0.1}
              className="group overflow-hidden p-0"
            >
              {/* Thumbnail */}
              <div className={`relative h-52 bg-gradient-to-br ${projectGradients[i % projectGradients.length]}
                overflow-hidden`}>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 grid-bg opacity-40" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold
                    bg-black/40 backdrop-blur-sm border border-white/10 text-white">
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium
                        bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold
                      bg-blue-600 hover:bg-blue-500 text-white transition-colors
                      shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    View Project →
                  </motion.a>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="p-2.5 rounded-xl border border-slate-700 hover:border-blue-500/50
                        text-slate-400 hover:text-white transition-all duration-200"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <motion.a
            href="https://github.com/Athar1107"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold
              border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          >
            View All Projects →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
