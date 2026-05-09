'use client';

import type { ReactElement } from 'react';

import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '@/components/ui';
import { socialLinks } from '@/data';

const iconMap: Record<string, ReactElement> = {
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  mail: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
};

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build Something Great"
          subtitle="Whether it's a collaboration, opportunity, or just a hello — my inbox is always open."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Social Links */}
          <GlassCard className="p-8">
            <h3 className="font-heading font-bold text-white text-xl mb-2">Get in Touch</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Feel free to reach out on any of these platforms. I typically respond within 24 hours.
            </p>

            <div className="space-y-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-800
                    bg-slate-900/40 hover:border-blue-500/40 hover:bg-blue-500/5
                    transition-all duration-200 group"
                >
                  <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    {iconMap[social.icon]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{social.platform}</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {social.platform === 'Gmail'
                        ? 'placeholder@gmail.com'
                        : social.platform === 'GitHub'
                        ? 'github.com/placeholder'
                        : `@placeholder`}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto text-slate-600 group-hover:text-blue-400 transition-colors"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </GlassCard>

          {/* Message Form */}
          <GlassCard className="p-8">
            <h3 className="font-heading font-bold text-white text-xl mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700
                    text-white placeholder:text-slate-600 text-sm
                    focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
                    transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700
                    text-white placeholder:text-slate-600 text-sm
                    focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
                    transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700
                    text-white placeholder:text-slate-600 text-sm resize-none
                    focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
                    transition-colors duration-200"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold
                  text-sm transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              >
                Send Message →
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
