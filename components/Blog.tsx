'use client';

import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '@/components/ui';
import { blogPosts } from '@/data/blog';

const blogGradients = [
  'from-blue-600/30 to-indigo-600/30',
  'from-cyan-600/30 to-teal-600/30',
  'from-purple-600/30 to-pink-600/30',
];

const blogEmojis = ['🤖', '🔥', '⚙️'];

export default function Blog() {
  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      {/* glow */}
      <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Blog"
          title="Thoughts & Tutorials"
          subtitle="I write to learn and share. Here are some articles on AI, ML, and the builder mindset."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <GlassCard key={post.id} delay={i * 0.1} className="group overflow-hidden p-0">
              {/* Cover */}
              <div className={`relative h-44 bg-gradient-to-br ${blogGradients[i % blogGradients.length]} overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="text-6xl select-none"
                  >
                    {blogEmojis[i % blogEmojis.length]}
                  </motion.span>
                </div>
                {/* Date badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium
                    bg-black/40 backdrop-blur-sm border border-white/10 text-white">
                    {post.date}
                  </span>
                </div>
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium
                      bg-slate-800 border border-slate-700 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading font-bold text-white text-lg leading-snug mb-3
                  group-hover:text-blue-300 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                  <motion.a
                    href={post.url}
                    whileHover={{ x: 4 }}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    Read →
                  </motion.a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* View all blogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold
              border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          >
            Read All Articles →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
